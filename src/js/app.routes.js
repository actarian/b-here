import AccessCodeComponent from './access/access-code.component';
import AccessComponent from './access/access.component';
import AgoraComponent from './agora/agora.component';
import EditorComponent from './editor/editor.component';
import TryInARComponent from './try-in-ar/try-in-ar.component';

export const AppRoutes = [
	{ name: 'index', path: '/', forwardTo: 'it' },
	// it
	{ name: 'it', path: '/it', defaultParams: { lang: 'it', mode: 'access' }, factory: AccessComponent },
	{ name: 'it.access', path: '/accesso', defaultParams: { lang: 'it', mode: 'access' }, factory: AccessComponent },
	{ name: 'it.accessCode', path: '/codice-di-accesso', defaultParams: { lang: 'it', mode: 'accessCode' }, factory: AccessCodeComponent },
	{ name: 'it.guidedTour', path: '/tour-guidato?:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'it', mode: 'guidedTour' }, factory: AgoraComponent },
	// { name: 'it.guidedTour', path: '/tour-guidato', defaultParams: { lang: 'it', mode: 'guidedTour' }, factory: AgoraComponent },
	{ name: 'it.selfServiceTour', path: '/tour-self-service', defaultParams: { lang: 'it', mode: 'selfServiceTour' }, factory: AgoraComponent },
	{ name: 'it.embed', path: '/embed', defaultParams: { lang: 'it', mode: 'embed' }, factory: AgoraComponent },
	{ name: 'it.tryInAr', path: '/prova-in-ar', defaultParams: { lang: 'it', mode: 'tryInAr' }, factory: TryInARComponent },
	{ name: 'it.editor', path: '/editor', defaultParams: { lang: 'it', mode: 'editor' }, factory: EditorComponent },
	// en
	{ name: 'en', path: '/en', defaultParams: { lang: 'en', mode: 'access' }, factory: AccessComponent },
	{ name: 'en.access', path: '/access', defaultParams: { lang: 'en', mode: 'access' }, factory: AccessComponent },
	{ name: 'en.accessCode', path: '/accesso-code', defaultParams: { lang: 'en', mode: 'accessCode' }, factory: AccessCodeComponent },
	{ name: 'en.guidedTour', path: '/guided-tour?:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'en', mode: 'guidedTour' }, factory: AgoraComponent },
	// { name: 'en.guidedTour', path: '/guided-tour', defaultParams: { lang: 'en', mode: 'guidedTour' }, factory: AgoraComponent },
	{ name: 'en.selfServiceTour', path: '/self-service-tour', defaultParams: { lang: 'en', mode: 'selfServiceTour' }, factory: AgoraComponent },
	{ name: 'en.embed', path: '/embed', defaultParams: { lang: 'en', mode: 'embed' }, factory: AgoraComponent },
	{ name: 'en.tryInAr', path: '/try-in-ar', defaultParams: { lang: 'en', mode: 'tryInAr' }, factory: TryInARComponent },
	{ name: 'en.editor', path: '/editor', defaultParams: { lang: 'en', mode: 'editor' }, factory: EditorComponent },
];
