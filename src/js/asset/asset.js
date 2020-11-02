
export const EXT_IMAGE = [
	'jpeg', 'jpg', 'png',
];
export const EXT_VIDEO = [
	'mp4', 'webm',
];
export const EXT_MODEL = [
	'fbx', 'gltf', 'glb', 'usdz'
];

export const AssetType = {
	Image: { id: 1, name: 'image' }, // jpg, png, ...
	Video: { id: 2, name: 'video' }, // mp4, webm, ...
	Model: { id: 3, name: 'model' }, // fbx, gltf, glb, usdz ...
	PublisherStream: { id: 4, name: 'publisher-stream' }, // valore fisso di file a ‘publisherStream’ e folder string.empty
	NextAttendeeStream: { id: 5, name: 'next-attendee-stream' }, // valore fisso di file a ‘nextAttendeeStream’ e folder string.empty
};

export const AssetGroupType = {
	ImageOrVideo: { id: 1, name: 'Image or Video', ids: [1, 2] },
	// Model: { id: 2, name: 'Model 3D', ids: [3] },
	Publisher: { id: 3, name: 'Publisher', ids: [4] },
	Attendee: { id: 4, name: 'Attendee', ids: [5] },
};

export function assetGroupTypeFromItem(item) {
	let key;
	if (item && item.asset) {
		key = Object.keys(AssetGroupType).find(key => {
			// console.log(key, AssetGroupType[key].ids, item.asset.type.id);
			return AssetGroupType[key].ids.indexOf(item.asset.type.id) !== -1;
		});
	}
	return AssetGroupType[key || 'ImageOrVideo'];
}

export function assetPayloadFromGroupTypeId(groupTypeId) {
	const type = groupTypeId === AssetGroupType.Publisher.id ? AssetType.PublisherStream : AssetType.NextAttendeeStream;
	const file = groupTypeId === AssetGroupType.Publisher.id ? 'publisherStream' : 'nextAttendeeStream';
	const asset = {
		type: type,
		folder: '',
		file: file,
	}
	return new Asset(asset);
}

export function assetTypeFromPath(path) {
	const extension = path.split('.').pop().toLowerCase();
	if (EXT_IMAGE.indexOf(extension) !== -1) {
		return AssetType.Image;
	} else if (EXT_VIDEO.indexOf(extension) !== -1) {
		return AssetType.Video;
	} else if (EXT_MODEL.indexOf(extension) !== -1) {
		return AssetType.Model;
	}
}

export function isAssetType(path, type) {
	const assetType = assetTypeFromPath(path);
	return assetType === type;
}

export class Asset {
	static allowedProps = ['id', 'type', 'folder', 'file', 'linkedPlayId', 'chromaKeyColor'];
	constructor(options) {
		if (options) {
			Object.assign(this, options);
		}
	}
	get payload() {
		const payload = {};
		Object.keys(this).forEach(key => {
			if (Asset.allowedProps.indexOf(key) !== -1) {
				payload[key] = this[key];
			}
		});
		return payload;
	}
	static fromUrl(url) {
		const segments = url.split('/');
		const file = segments.pop();
		const folder = segments.join('/') + '/';
		const type = assetTypeFromPath(file);
		return new Asset({
			type: type,
			folder: folder,
			file: file,
		});
	}
}

export function mapAsset(asset) {
	switch (asset.type) {
		default:
			asset = new Asset(asset);
	}
	return asset;
}
