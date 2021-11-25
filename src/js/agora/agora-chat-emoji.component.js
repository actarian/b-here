import { Component } from 'rxcomp';
import { first } from 'rxjs/operators';
import { EmojiService } from '../emoji/emoji.service';

export default class AgoraChatEmojiComponent extends Component {

	onInit() {
		this.items = [];
		EmojiService.emoji$().pipe(
			first(),
		).subscribe(items => {
			setTimeout(() => {
				this.items = items;
				this.pushChanges();
			}, 1);
		});
	}

	onSelect(item) {
		this.emoji.next(item);
	}

	onClose(_) {
		this.close.next();
	}

}

AgoraChatEmojiComponent.meta = {
	selector: '[agora-chat-emoji]',
	outputs: ['emoji', 'close'],
};
