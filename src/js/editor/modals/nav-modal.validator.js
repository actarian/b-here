import { FormValidator } from 'rxcomp-form';
import { NavModeType } from '../../world/model/model-nav.component';

export function NavModalValidator(formGroup, view) {
	return new FormValidator((changedValue) => {
		const item = formGroup.value;
		let mode = NavModeType.None;
		if (item.transparent) {
			mode = NavModeType.Transparent;
		} else if (item.viewId && item.viewId !== view.id) {
			mode = NavModeType.Move;
			if (isValidText(item.title)) {
				mode = NavModeType.Title;
			}
			if (isValidText(item.abstract) ||
				(item.asset && item.asset.id) ||
				(item.link && item.link.href)) {
				mode = NavModeType.Point;
			}
		} else if (isValidText(item.title) ||
			isValidText(item.abstract) ||
			(item.asset && item.asset.id) ||
			(item.link && item.link.href)) {
			mode = NavModeType.Info;
		}
		// console.log('FormValidator', item, view.id, mode);
		return mode === NavModeType.None ? { navModal: true } : null;
	});
}

function isValidText(text) {
	return text && text.length > 0;
}
