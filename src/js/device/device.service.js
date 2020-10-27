
export const DevicePlatform = {
	Unknown: 'unknown',
	IOS: 'ios',
	Android: 'android',
	WindowsPhone: 'windowsPhone',
};

export class DeviceService {

	static get platform() {
		if (!this.platform_) {
			this.platform_ = this.getDevicePlatform();
		}
		return this.platform_;
	}

	static getDevicePlatform() {
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
		// Windows Phone must come first because its UA also contains 'Android'
		if (/windows phone/i.test(userAgent)) {
			return DevicePlatform.WindowsPhone;
		}
		if (/android/i.test(userAgent)) {
			return DevicePlatform.Android;
		}
		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		// if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		if (this.isIOS()) {
			return DevicePlatform.IOS;
		}
		return DevicePlatform.Unknown;
	}

	static isIOS() {
		return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
			// iPad on iOS 13 detection
			|| (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
	}

}
