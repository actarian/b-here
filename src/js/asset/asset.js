import { environment } from '../environment';

export const EXT_IMAGE = [
	'jpeg', 'jpg', 'png', 'hdr'
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
	PublisherStream: { id: 4, name: 'publisher-stream', file: 'publisherStream' }, // valore fisso di file a ‘publisherStream’ e folder string.empty
	AttendeeStream: { id: 5, name: 'next-attendee-stream', file: 'nextAttendeeStream' }, // valore fisso di file a ‘nextAttendeeStream’ e folder string.empty
	PublisherScreen: { id: 6, name: 'publisher-screen', file: 'publisherScreen' }, // valore fisso di file a ‘publisherScreen’ e folder string.empty
	AttendeeScreen: { id: 7, name: 'attendee-screen', file: 'attendeeScreen' }, // valore fisso di file a ‘attendeeScreen’ e folder string.empty
	SmartDeviceStream: { id: 8, name: 'smart-device-stream', file: 'smartDeviceStream' }, // valore fisso di file a smartDeviceStream e folder string.empty
};

export const AssetGroupType = {
	ImageOrVideo: { id: 1, name: 'Image or Video', ids: [1, 2] },
	// Model: { id: 2, name: 'Model 3D', ids: [3] },
	Publisher: { id: 3, name: 'Publisher', ids: [4] },
	Attendee: { id: 4, name: 'Attendee', ids: [5] },
	// PublisherScreen: { id: 5, name: 'PublisherScreen', ids: [6] },
	// AttendeeScreen: { id: 6, name: 'AttendeeScreen', ids: [7] },
};

export function AssetGroupTypeInit() {
	// console.log('environment.flags.editorAssetScreen', environment.flags.editorAssetScreen, environment);
	if (environment.flags.editorAssetScreen) {
		AssetGroupType.PublisherScreen = { id: 5, name: 'PublisherScreen', ids: [6] };
		AssetGroupType.AttendeeScreen = { id: 6, name: 'AttendeeScreen', ids: [7] };
	}
	AssetGroupType.SmartDevice = { id: 7, name: 'Smart Device', ids: [8] };
}

export const STREAM_TYPES = [
	AssetType.PublisherStream.name,
	AssetType.AttendeeStream.name,
	AssetType.PublisherScreen.name,
	AssetType.AttendeeScreen.name,
	AssetType.SmartDeviceStream.name,
];

export function assetIsStream(asset) {
	return asset && STREAM_TYPES.indexOf(asset.type.name) !== -1;
}

export function assetTypeById(id) {
	const type = Object.keys(AssetType).reduce((p, key) => {
		const type = AssetType[key];
		return type.id === id ? type : p;
	}, null);
	return type;
	// return Object.keys(AssetType).map(x => AssetType[x]).find(x => x.id === id);
}

export function assetGroupTypeById(id) {
	const type = Object.keys(AssetGroupType).reduce((p, key) => {
		const type = AssetGroupType[key];
		return type.id === id ? type : p;
	}, null);
	return type;
	// return Object.keys(AssetGroupType).map(x => AssetGroupType[x]).find(x => x.id === id);
}

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
	const groupType = assetGroupTypeById(groupTypeId);
	const type = assetTypeById(groupType.ids[0]);
	const file = type.file;
	const asset = {
		type: type,
		folder: '',
		file: file,
	}
	// console.log('assetPayloadFromGroupTypeId', asset);
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

	static allowedProps = ['id', 'type', 'folder', 'file', 'linkedPlayId', 'chromaKeyColor', 'autoplay', 'loop'];

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

	static get defaultMediaAsset() {
		const asset = {
			id: -1,
			type: { id: AssetType.Image, name: 'image' },
			folder: '/textures/grid/',
			file: 'grid.jpg',
		};
		return asset;
	}
}

export function mapAsset(asset) {
	switch (asset.type.name) {
		default:
			asset = new Asset(asset);
	}
	return asset;
}
