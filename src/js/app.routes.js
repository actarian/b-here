import AccessCodeComponent from './access/access-code.component';
import AccessComponent from './access/access.component';
import AgoraComponent from './agora/agora.component';
import EditorComponent from './editor/editor.component';
import LayoutComponent from './layout/layout.component';
import TryInARComponent from './try-in-ar/try-in-ar.component';

export const AppRoutes = [
	{ name: 'index', path: '/', forwardTo: 'it' },
	// it
	{ name: 'it', path: '/it', defaultParams: { lang: 'it', mode: 'access' }, factory: AccessComponent },
	{ name: 'it.access', path: '/accesso', defaultParams: { lang: 'it', mode: 'access' }, factory: AccessComponent },
	{ name: 'it.accessCode', path: '/codice-di-accesso?:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'it', mode: 'accessCode' }, factory: AccessCodeComponent },
	{ name: 'it.guidedTour', path: '/tour-guidato?:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'it', mode: 'guidedTour' }, factory: AgoraComponent },
	// { name: 'it.guidedTour', path: '/tour-guidato', defaultParams: { lang: 'it', mode: 'guidedTour' }, factory: AgoraComponent },
	{ name: 'it.selfServiceTour', path: '/tour-self-service?:viewId&:pathId', defaultParams: { lang: 'it', mode: 'selfServiceTour' }, factory: AgoraComponent },
	{ name: 'it.embed', path: '/embed', defaultParams: { lang: 'it', mode: 'embed' }, factory: AgoraComponent },
	{ name: 'it.tryInAr', path: '/prova-in-ar?:viewId', defaultParams: { lang: 'it', mode: 'tryInAr' }, factory: TryInARComponent },
	{ name: 'it.editor', path: '/editor?:viewId', defaultParams: { lang: 'it', mode: 'editor' }, factory: EditorComponent },
	{ name: 'it.layout', path: '/layout', defaultParams: { lang: 'it', mode: 'layout' }, factory: LayoutComponent },
	// en
	{ name: 'en', path: '/en', defaultParams: { lang: 'en', mode: 'access' }, factory: AccessComponent },
	{ name: 'en.access', path: '/access', defaultParams: { lang: 'en', mode: 'access' }, factory: AccessComponent },
	{ name: 'en.accessCode', path: '/accesso-code?:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'en', mode: 'accessCode' }, factory: AccessCodeComponent },
	{ name: 'en.guidedTour', path: '/guided-tour?:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'en', mode: 'guidedTour' }, factory: AgoraComponent },
	// { name: 'en.guidedTour', path: '/guided-tour', defaultParams: { lang: 'en', mode: 'guidedTour' }, factory: AgoraComponent },
	{ name: 'en.selfServiceTour', path: '/self-service-tour?:viewId&:pathId', defaultParams: { lang: 'en', mode: 'selfServiceTour' }, factory: AgoraComponent },
	{ name: 'en.embed', path: '/embed', defaultParams: { lang: 'en', mode: 'embed' }, factory: AgoraComponent },
	{ name: 'en.tryInAr', path: '/try-in-ar?:viewId', defaultParams: { lang: 'en', mode: 'tryInAr' }, factory: TryInARComponent },
	{ name: 'en.editor', path: '/editor?:viewId', defaultParams: { lang: 'en', mode: 'editor' }, factory: EditorComponent },
	{ name: 'en.layout', path: '/layout', defaultParams: { lang: 'en', mode: 'layout' }, factory: LayoutComponent },
];
