import { Component, getContext } from 'rxcomp';
// import { UserService } from './user/user.service';
import { FormGroup } from 'rxcomp-form';
import { first, takeUntil } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import StateService from '../state/state.service';
import AgoraService from './agora.service';
import { MessageType } from './agora.types';

const USE_RANDOM_MESSAGE = false;

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
		this.rows = 1;
		this.showEmoji = false;
		this.demo = window.location.pathname.indexOf('layout') !== -1;
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
			this.updateMessages(messages.slice(0, 5));
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
			if (USE_RANDOM_MESSAGE) {
				AgoraChatComponent.randomMessage(this, messages);
			}
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

	onDestroy() {
		if (AgoraChatComponent.to) {
			clearTimeout(AgoraChatComponent.to);
			AgoraChatComponent.to = null;
		}
	}

	onSubmit() {
		const secureMessage = this.secureText(this.form.value.message);
		// console.log('secureMessage', secureMessage);
		const message = this.createMessage(secureMessage);
		this.sendMessage(message);
		this.form.get('message').value = null;
		if (this.demo && USE_RANDOM_MESSAGE) {
			this.randomMessage();
		}
	}

	onKeyDown(event) {
		// console.log('onKeyDown', event);
		if (event.key === 'Enter') {
			if (event.shiftKey) {
				this.rows = Math.min(4, this.rows + 1);
				this.pushChanges();
			} else {
				event.preventDefault();
				this.onSubmit();
				this.rows = 1;
			}
			const { node } = getContext(this);
			const textareaNode = node.querySelector('textarea');
			textareaNode.setAttribute('rows', this.rows);
		}
	}

	onToggleEmoji() {
		this.showEmoji = !this.showEmoji;
		this.pushChanges();
	}

	onSelectEmoji(emoji) {
		this.showEmoji = false;
		this.form.get('message').value = (this.form.get('message').value || '') + emoji.char;
		// this.pushChanges();
	}

	secureText(unsecureText) {
		let newDocument = new DOMParser().parseFromString(unsecureText, 'text/html');
		return newDocument.body.textContent || '';
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
		const index = messages.reduce((p, c, i) => {
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
					lastMessage.message += `<p>${message.message}</p>`;
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
		// setTimeout(() => {
		this.groupedMessages = groupedMessages;
		this.pushChanges();
		// console.log('AgoraChatComponent.updateMessages', messages, groupedMessages);
		setTimeout(() => {
			this.scrollToBottom();
		}, 1);
		// }, 1);
	}

	isValid() {
		const isValid = this.form.valid;
		return isValid && this.form.value.message && this.form.value.message.length > 0;
	}

	// demo

	randomMessage() {
		if (AgoraChatComponent.to) {
			clearTimeout(AgoraChatComponent.to);
			AgoraChatComponent.to = null;
		}
		AgoraChatComponent.to = setTimeout(() => {
			const message = AgoraChatComponent.createRandomMessage();
			this.sendMessage(message);
		}, (2 + Math.random() * 6) * 1000);
	}

}
AgoraChatComponent.meta = {
	selector: '[agora-chat]',
	outputs: ['close'],
	template: /* html */`
		<div class="group--scrollview" [class]="'rows--' + rows">
			<div class="group--virtual" *virtual="let item of groupedMessages" [mode]="4" [width]="350" [gutter]="0" [reverse]="true">
				<!-- serve un nodo figlio -->
				<div class="listing__item message" [class]="{ me: item.me, typing: item.typing }">
					<div class="message__avatar" [title]="item.name"><span [innerHTML]="item.shortName"></span></div>
					<div class="message__content">
						<div [innerHTML]="item.message | message"></div>
						<div class="typing-indicator">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="group--message" [class]="'rows--' + rows">
			<form class="form" [formGroup]="form" (submit)="isValid() && onSubmit($event)" name="form" role="form" novalidate autocomplete="off">
				<div class="group--form group--form--addon" [class]="{ required: controls.message.validators.length, 'addon': controls.message.valid }">
					<!-- <input type="text" class="control--text" [formControl]="controls.message" [placeholder]="'bhere_write_a_message' | label" /> -->
					<button type="button" class="control--pre" (click)="onToggleEmoji()">
						<svg class="emoji" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#emoji"></use></svg>
					</button>
					<textarea class="control--text" [formControl]="controls.message" [placeholder]="'bhere_write_a_message' | label" rows="1" (keydown)="onKeyDown($event)"></textarea>
					<button type="submit" class="control--addon">
						<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#send"></use></svg>
					</button>
				</div>
			</form>
		</div>
		<div class="group--close">
			<button type="button" class="btn--close" [title]="'title_close' | label" (click)="onClose($event)">
				<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
			</button>
		</div>
		<div class="group--emoji" [class]="'rows--' + rows" agora-chat-emoji (emoji)="onSelectEmoji($event)" (close)="onToggleEmoji()" *if="showEmoji">
			<div class="group--virtual" *virtual="let item of items" [mode]="1" [width]="40" [gutter]="10" [reverse]="true">
				<!-- serve un nodo figlio -->
				<div class="listing__item emoji">
					<button type="button" class="btn--emoji" (click)="onSelect(item)"><span [innerHTML]="item.char"></span></button>
				</div>
			</div>
			<div class="group--close">
				<button type="button" class="btn--close" [title]="'title_close' | label" (click)="onClose($event)">
					<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#close"></use></svg>
				</button>
			</div>
		</div>
	`,
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
	return messages;
	// return messages.slice(0, 5);
}

AgoraChatComponent.createRandomMessage = (text) => {
	const message = new ChatMessage({
		date: Date.now(),
		clientId: '9fe0e1b9-6a6b-418b-b916-4bbff3eeb123',
		name: 'Herman frederick',
		message: 'Lorem ipsum dolor',
	}, StateService.state.uid, StateService.state.name);
	return message;
}

AgoraChatComponent.randomMessage = (instance, messages) => {
	const getRandomMessage = function() {
		const others = messages.filter(x => x.id !== '7341614597544882');
		let message = others[Math.floor(others.length * Math.random())];
		message = new ChatMessage({
			date: Date.now(),
			clientId: '9fe0e1b9-6a6b-418b-b916-4bbff3eeb123',
			name: message.name,
			message: message.message,
		}, StateService.state.uid, StateService.state.name);
		return message;
	}
	if (AgoraChatComponent.to) {
		clearTimeout(AgoraChatComponent.to);
		AgoraChatComponent.to = null;
	}
	AgoraChatComponent.to = setTimeout(() => {
		const message = getRandomMessage();
		instance.sendMessage(message);
		AgoraChatComponent.randomMessage(instance, messages);
	}, (2 + Math.random() * 6) * 1000);
}
