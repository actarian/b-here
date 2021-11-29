import { Pipe } from 'rxcomp';

export const URL_PATTERN = '(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))?';

// export const URL_PATTERN = '/((http:\/\/|https:\/\/|www\.)([a-z0-9])([a-z0-9]|\.)+(\?[a-z]([a-z0-9]|\=|\&)+)?)';

export default class MessagePipe extends Pipe {

	static transform(text) {
		let html = MessagePipe.urlify(text);
		html = MessagePipe.breakLines(html);
		// console.log('MessagePipe', text, html);
		return html;
	}

	static urlify(text) {
		// const regex = new RegExp(URL_PATTERN, 'gim');
		const regex = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/gmi;
		return text.replace(regex, (url) => {
			return /*html*/`<a href="${url}" target="_blank">${url}</a>`;
		});
		// or alternatively
		// return text.replace(urlRegex, '<a href="$1">$1</a>')
	}

	static breakLines(text) {
		const regex = /\n/gm;
		return text.replace(regex, (text) => {
			return /*html*/`<br>`;
		});
	}

}

MessagePipe.meta = {
	name: 'message',
};
