import { Pipe } from "rxcomp";
import { environment } from "../environment";

export const AssetType = {
	Image: 'image', // jpg, png, ...
	Video: 'video', // mp4, webm, ...
	Model: 'model', // gltf, glb, …
	PublisherStream: 'publisher-stream', // valore fisso di file a 'publisherStream' e folder string.empty
	NextAttendeeStream: 'next-attendee-stream', // valore fisso di file a 'nextAttendeeStream' // e folder string.empty
};
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
			asset = asset.type === type ? asset : null;
		}
		if (asset) {
			switch (asset.type) {
				case AssetType.Image:
				case AssetType.Video:
					asset = asset.folder + asset.file;
					asset = environment.getTexturePath(asset);
					break;
				case AssetType.Model:
					asset = asset.folder + asset.file;
					asset = environment.getModelPath(asset);
					break;
				case AssetType.PublisherStream:
				case AssetType.NextAttendeeStream:
					asset = environment.getModelPath(asset.file);
					break;
				default:
					if (isImage(asset.file) || isVideo(asset.file)) {
						asset = asset.folder + asset.file;
						asset = environment.getTexturePath(asset);
					} else if (isModel(asset.file)) {
						asset = asset.folder + asset.file;
						asset = environment.getModelPath(asset);
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
