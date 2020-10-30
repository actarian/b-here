
export const environmentStatic = {
	appKey: '8b0cae93d47a44e48e97e7fd0404be4e',
	channelName: 'BHere',
	flags: {
		ar: true,
	},
	assets: './',
	worker: './js/workers/image.service.worker.js',
	githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-ws-new/docs/',
	url: {
		index: '/',
		access: '/',
		editor: '/editor',
		bHere: '/b-here',
		selfServiceTour: '/self-service-tour',
		guidedTour: '/guided-tour',
	},
	template: {
		tryInAr: '/try-in-ar.html?viewId=$viewId',
		modal: {
			controlRequest: '/control-request-modal.html',
			tryInAr: '/try-in-ar-modal.html',
			view: {
				'panorama': '/panorama-modal.html',
				'panorama-grid': '/panorama-grid-modal.html',
				'room-3d': '/room-3d-modal.html',
				'model': '/model-modal.html',
			},
			viewItem: {
				'nav': '/nav-modal.html',
				'plane': '/plane-modal.html',
				'curved-plane': '/curved-plane-modal.html',
				'texture': '/texture-modal.html',
				'gltf': '/gltf-modal.html',
			},
			remove: '/remove-modal.html',
		}
	}
};
