import { Pipe } from 'rxcomp';
import { environment } from '../environment';
import { AssetType } from '../view/view';

export const MIME_IMAGE = [
	'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp',
];
export const MIME_AUDIO = [
	'aac', 'mid', 'midi', 'mp3', 'oga', 'opus', 'wav', 'weba',
];
export const MIME_VIDEO = [
	'mp4', 'avi', 'mpeg', 'ogv', 'ts', 'webm', '3gp', '3g2',
];
export const MIME_MODEL = [
	'gltf', 'glb', 'obj', 'usdz',
];
export const MIME_STREAM = [
	'publisherStream', 'nextAttendeeStream',
];
export function isImage(path) {
	return new RegExp(`/\.(${MIME_IMAGE.join('|')})$/`).test(path);
}
export function isVideo(path) {
	return new RegExp(`/\.(${MIME_VIDEO.join('|')})$/`).test(path);
}
export function isModel(path) {
	return new RegExp(`/\.(${MIME_MODEL.join('|')})$/`).test(path);
}
export function isStream(path) {
	return MIME_STREAM.indexOf(path) !== -1;
}
export default class AssetPipe extends Pipe {
	static transform(asset, type = null) {
		if (type != null) { // keep loose equality
			asset = asset.type.name === type ? asset : null;
		}
		if (asset) {
			// console.log(asset.type.name, AssetType.Image.name);
			switch (asset.type.name) {
				case AssetType.Image.name:
				case AssetType.Video.name:
					asset = asset.folder + asset.file;
					asset = environment.getPath(asset);
					break;
				case AssetType.Model.name:
					asset = asset.folder + asset.file;
					asset = environment.getPath(asset);
					break;
				case AssetType.PublisherStream.name:
				case AssetType.NextAttendeeStream.name:
					asset = environment.getPath(asset.file);
					break;
				default:
					if (isImage(asset.file) || isVideo(asset.file)) {
						asset = asset.folder + asset.file;
						asset = environment.getPath(asset);
					} else if (isModel(asset.file)) {
						asset = asset.folder + asset.file;
						asset = environment.getPath(asset);
					} else if (isStream(asset.file)) {
						asset = asset.file;
					}
			}
			asset = asset;
		} else {
			asset = null;
		}
		// console.log('AssetPipe.transform', asset);
		return asset;
	}
}
AssetPipe.meta = {
	name: 'asset',
};
