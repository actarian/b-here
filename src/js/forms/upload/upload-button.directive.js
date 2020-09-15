import { Directive, getContext } from 'rxcomp';

export default class UploadButtonDirective extends Directive {

	set directoryOnly(directoriesOnly) {
		if (directoryOnly_ !== directoriesOnly) {
			this.directoryOnly_ = directoriesOnly;
			this.init_();
		}
	}

	set attributes(attributes) {
		if (this.attributes_ !== attributes) {
			this.attributes_ = attributes;
			this.init_();
		}
	}

	set uploadButton(uploader) {
		if (this.uploader !== uploader) {
			this.uploader = uploader;
			// console.log('UploadButtonDirective.uploader', this.uploader);
			this.init_();
		}
	}

	init_() {
		/*
		if (!this.uploader) {
			return;
		}
		const { node } = getContext(this);
		// console.log('UploadButtonDirective', this.uploader, node);
		this.uploader.flow.assignBrowse(node, this.directoryOnly_, this.uploader.flow.opts.singleFile, this.attributes_);
		*/
	}

	onInit() {
		if (this.uploader) {
			const { node } = getContext(this);
			this.uploader.flow.assignBrowse(node, this.directoryOnly_, this.uploader.flow.opts.singleFile, this.attributes_);
		}
	}

}

UploadButtonDirective.meta = {
	selector: '[[uploadButton]]',
	inputs: ['uploadButton', 'directoryOnly', 'attributes']
};
