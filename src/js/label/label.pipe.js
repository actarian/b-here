import { Pipe } from "rxcomp";

export const LABELS = Object.assign({
	browse: 'browse',
	cancel: 'cancel',
	drag_and_drop_images: 'Drag And Drop your images here',
	error_email: 'Invalid email',
	error_match: 'Fields do not match',
	error_required: 'Field is required',
	remove: 'remove',
	required: 'required',
	select: 'Select',
	select_file: 'Select a file...',
	upload: 'upload',
}, (window.labels || {}));

export default class LabelPipe extends Pipe {

	static transform(key) {
		const labels = LABELS;
		return labels[key] || `#${key}#`;
	}

}

LabelPipe.meta = {
	name: 'label',
};
