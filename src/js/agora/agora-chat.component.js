import { Component, getContext } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormGroup } from 'rxcomp-form';
import { first, takeUntil } from 'rxjs/operators';
import MessageService from '../message/message.service';
import StateService from '../state/state.service';
import AgoraService from './agora.service';
import { MessageType } from './agora.types';

export class ChatMessage {

	constructor(message, clientId, name) {
		this.type = MessageType.ChatMessage;
		this.clientId_ = clientId;
		if (typeof message === 'string') {
			this.date = Date.now();
			this.clientId = clientId;
			this.name = name;
			this.message = message;
		} else if (typeof message === 'object') {
			this.date = message.date;
			this.clientId = message.clientId;
			this.name = message.name;
			this.message = message.message;
		}
		const names = this.name.split(' ');
		this.shortName = names[0].substr(0, 1).toUpperCase() + (names.length > 1 ? names[1] : names[0]).substr(0, 1).toUpperCase();
	}

	get me() {
		return this.clientId === this.clientId_;
	}

	getPayload() {
		return {
			date: this.date,
			clientId: this.clientId,
			name: this.name,
			message: this.message,
		};
	}

	getCopy() {
		return new ChatMessage({
			date: this.date,
			clientId: this.clientId,
			name: this.name,
			message: this.message,
		}, this.clientId_);
	}
}

export default class AgoraChatComponent extends Component {

	onInit() {
		const form = this.form = new FormGroup({
			message: null,
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((changes) => {
			// console.log('AgoraChatComponent.changes$', form.value);
			this.checkTypings(changes);
			this.pushChanges();
		});
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			// console.log('AgoraChatComponent.state', state);
		});
		MessageService.out$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			// console.log('AgoraChatComponent.MessageService', message);
			switch (message.type) {
				case MessageType.ChatMessage:
					this.pushMessage(new ChatMessage(message, StateService.state.uid, StateService.state.name));
					break;
				case MessageType.ChatTypingBegin:
					this.typingBegin(message);
					break;
				case MessageType.ChatTypingEnd:
					this.typingEnd(message);
					break;
			}
		});
		this.messages = [];
		this.groupedMessages = [];
		if (this.demo) {
			// !!! only for demo
			const messages = AgoraChatComponent.getFakeList().map(x => new ChatMessage(x, StateService.state.uid, StateService.state.name));
			this.updateMessages(messages);
			MessageService.in$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(message => {
				message.clientId = message.clientId || StateService.state.uid;
				// console.log('AgoraChatComponent.MessageService.in$', message);
				switch (message.type) {
					case MessageType.ChatMessage:
						break;
					case MessageType.ChatTypingBegin:
						MessageService.out(message);
						break;
					case MessageType.ChatTypingEnd:
						MessageService.out(message);
						break;
				}
			});
			// !!! only for demo
		} else {
			const agora = this.agora = AgoraService.getSingleton();
			if (agora) {
				agora.getChannelAttributes().pipe(
					first(),
				).subscribe(messages => {
					messages = messages.map(x => new ChatMessage(x, StateService.state.uid, StateService.state.name));
					// console.log('AgoraChatComponent.getChannelAttributes.messages', messages);
					this.updateMessages(messages);
				});
			}
		}
	}

	onView() {
		// this.scrollToBottom();
	}

	onChanges() {
		// this.scrollToBottom();
	}

	onSubmit() {
		const message = this.createMessage(this.form.value.message);
		this.sendMessage(message);
		this.form.get('message').value = null;
		if (this.demo) {
			this.randomMessage();
		}
	}

	createMessage(text) {
		const message = new ChatMessage(text, StateService.state.uid, StateService.state.name);
		return message;
	}

	sendMessage(message) {
		this.pushMessage(message);
		const agora = this.agora;
		if (agora) {
			agora.addOrUpdateChannelAttributes([message.getPayload()]).pipe(
				first(),
			).subscribe();
		}
		MessageService.send(message);
	}

	onClose(event) {
		this.close.next();
	}

	scrollToBottom() {
		const { node } = getContext(this);
		const scrollView = node.querySelector('.group--scrollview');
		scrollView.scrollTop = scrollView.scrollHeight;
	}

	pushMessage(message) {
		const messages = this.messages ? this.messages.slice() : [];
		this.removeTyping({ type: MessageType.ChatTypingBegin, clientId: message.clientId }, this.messages);
		messages.push(message);
		this.updateMessages(messages);
	}

	typingBegin(message) {
		// console.log('AgoraChatComponent.typingBegin', message);
		const messages = this.messages ? this.messages.slice() : [];
		messages.push(message);
		this.updateMessages(messages);
	}

	typingEnd(message) {
		// console.log('AgoraChatComponent.typingEnd', message);
		const messages = this.messages ? this.messages.slice() : [];
		this.removeTyping({ type: MessageType.ChatTypingBegin, clientId: message.clientId }, messages);
		this.updateMessages(messages);
	}

	removeTyping(message, messages, recursive = true) {
		const index = messages.reduce((p,c,i) => {
			return (c.type === message.type && c.clientId === message.clientId) ? i : p;
		}, -1);
		if (index !== -1) {
			messages.splice(index, 1);
			if (recursive === true) {
				this.removeTyping(message, messages, true);
			}
		}
		return index;
	}

	checkTypings(changes) {
		const typings = (changes.message && changes.message.length > 0);
		// console.log('AgoraChatComponent.checkTypings', typings);
		if (this.typings_ !== typings) {
			this.typings_ = typings;
			if (typings) {
				MessageService.send({ type: MessageType.ChatTypingBegin });
			} else {
				MessageService.send({ type: MessageType.ChatTypingEnd });
			}
		}
	}

	updateMessages(messages) {
		this.messages = messages;
		if (true) {
			this.groupedMessages = [];
			this.pushChanges();
		}
		const groupedMessages = [];
		messages.forEach(message => {
			if (message.type === MessageType.ChatMessage) {
				// ChatMessage
				const lastMessage = groupedMessages.length ? groupedMessages[groupedMessages.length - 1] : null;
				if (lastMessage && lastMessage.clientId === message.clientId) {
					lastMessage.message += `<br />${message.message}`;
				} else {
					groupedMessages.push(message.getCopy());
				}
			} else if (message.type === MessageType.ChatTypingBegin) {
				// ChatTypingBegin
				const lastMessage = groupedMessages.reduce((p, c, i) => {
					return (c.clientId === message.clientId) ? c : p;
				}, null);
				if (lastMessage) {
					lastMessage.typing = true;
				}
				// console.log('MessageType.ChatTypingBegin', lastMessage, message);
			}
		});
		setTimeout(() => {
			this.groupedMessages = groupedMessages;
			this.pushChanges();
			// console.log('AgoraChatComponent.updateMessages', messages, groupedMessages);
			setTimeout(() => {
				this.scrollToBottom();
			}, 1);
		}, 1);
	}

	isValid() {
		const isValid = this.form.valid;
		return isValid && this.form.value.message && this.form.value.message.length > 0;
	}

	// demo

	randomMessage() {
		setTimeout(() => {
			const message = this.createRandomMessage();
			this.sendMessage(message);
		}, (1 + Math.random() * 5) * 1000);
	}

	createRandomMessage(text) {
		const message = new ChatMessage({
			date: Date.now(),
			clientId: '9fe0e1b9-6a6b-418b-b916-4bbff3eeb123',
			name: 'Herman frederick',
			message: 'Lorem ipsum dolor',
		}, StateService.state.uid, StateService.state.name);
		return message;
	}
}

AgoraChatComponent.meta = {
	selector: '[agora-chat]',
	outputs: ['close'],
	inputs: ['demo'],
};

AgoraChatComponent.getFakeList = () => {
	let messages = [
		{
			"date": 1614592230000,
			"name": "Jhon Appleseed",
			"message": "Function-based web-enabled benchmark",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592240000,
			"name": "Jhon Appleseed",
			"message": "Customizable exuding superstructure",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592250000,
			"name": "Gilles Pitkins",
			"message": "Synergistic interactive archive",
			"clientId": "cfe9ff5b-f7da-449d-bf5a-3184b5eba6ea"
		},
		{
			"date": 1614592260000,
			"name": "Jhon Appleseed",
			"message": "Digitized client-server initiative",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592270000,
			"name": "Jhon Appleseed",
			"message": "Quality-focused tertiary open system",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592280000,
			"name": "Jhon Appleseed",
			"message": "Exclusive uniform middleware",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592290000,
			"name": "John Pruckner",
			"message": "Decentralized disintermediate extranet",
			"clientId": "ae51e846-d043-41e9-bb5c-3189181e5b43"
		},
		{
			"date": 1614592300000,
			"name": "Lamont Georgievski",
			"message": "Enhanced static approach",
			"clientId": "1961cd9e-93aa-4bd0-b96a-89fcbd36b257"
		},
		{
			"date": 1614592310000,
			"name": "Jhon Appleseed",
			"message": "Ergonomic clear-thinking info-mediaries",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592320000,
			"name": "Jeri Pedroni",
			"message": "Grass-roots dynamic encryption",
			"clientId": "13d69bba-3656-449b-8fe3-d7a87062b044"
		},
		{
			"date": 1614592330000,
			"name": "Frederik Dechelle",
			"message": "Compatible disintermediate policy",
			"clientId": "9151ebe0-efa8-40b4-a341-b8fd489e9c88"
		},
		{
			"date": 1614592340000,
			"name": "Jhon Appleseed",
			"message": "Inverse user-facing adapter",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592350000,
			"name": "Jhon Appleseed",
			"message": "Future-proofed even-keeled application",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592360000,
			"name": "Cassie Jonathon",
			"message": "Profit-focused content-based budgetary management",
			"clientId": "5b3dc6f3-2a3d-493d-aac5-66ddfce2d709"
		},
		{
			"date": 1614592370000,
			"name": "Jhon Appleseed",
			"message": "Managed intermediate monitoring",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592380000,
			"name": "Jhon Appleseed",
			"message": "Exclusive client-server encoding",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592390000,
			"name": "Jhon Appleseed",
			"message": "Cross-group system-worthy matrices",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592400000,
			"name": "Jhon Appleseed",
			"message": "Upgradable encompassing benchmark",
			"clientId": "7341614597544882"
		},
		{
			"date": 1614592410000,
			"name": "Emelen Beevors",
			"message": "Function-based full-range knowledge base",
			"clientId": "c93aea47-ebd8-4e5e-88fd-52053dd35cd1"
		},
		{
			"date": 1614592420000,
			"name": "Jhon Appleseed",
			"message": "Synergistic system-worthy capability",
			"clientId": "7341614597544882"
		}
	];
	while (messages.length < 100) {
		messages = messages.concat(messages);
	}
	// return messages;
	return messages.slice(0, 5);
}
