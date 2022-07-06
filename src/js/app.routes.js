import AccessCodeComponent from './access/access-code.component';
import AccessComponent from './access/access.component';
import AgoraComponent from './agora/agora.component';
import EditorComponent from './editor/editor.component';
import { environment } from './environment';
import { GenericComponent } from './generic/generic.component';
import LayoutComponent from './layout/layout.component';
import TryInARComponent from './try-in-ar/try-in-ar.component';

console.log('environment.defaultLanguage', environment.defaultLanguage);

export const AppRoutesInit = () => [
	{ name: 'index', path: '/', forwardTo: environment.defaultLanguage || 'it' },
	// it
	{ name: 'it', path: '/it', defaultParams: { lang: 'it', mode: 'access' }, factory: AccessComponent },
	{ name: 'it.access', path: '/accesso', defaultParams: { lang: 'it', mode: 'access' }, factory: AccessComponent },
	{ name: 'it.accessCode', path: '/codice-di-accesso?:p&:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'it', mode: 'accessCode' }, factory: AccessCodeComponent },
	{ name: 'it.guidedTour', path: '/tour-guidato?:p&:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'it', mode: 'guidedTour' }, factory: AgoraComponent },
	// { name: 'it.guidedTour', path: '/tour-guidato', defaultParams: { lang: 'it', mode: 'guidedTour' }, factory: AgoraComponent },
	{ name: 'it.selfServiceTour', path: '/tour-self-service?:p&:viewId&:pathId', defaultParams: { lang: 'it', mode: 'selfServiceTour' }, factory: AgoraComponent },
	{ name: 'it.embed', path: '/embed', defaultParams: { lang: 'it', mode: 'embed' }, factory: AgoraComponent },
	{ name: 'it.tryInAr', path: '/prova-in-ar?:p&:viewId', defaultParams: { lang: 'it', mode: 'tryInAr' }, factory: TryInARComponent },
	{ name: 'it.editor', path: '/editor?:p&:viewId', defaultParams: { lang: 'it', mode: 'editor' }, factory: EditorComponent },
	{ name: 'it.layout', path: '/layout', defaultParams: { lang: 'it', mode: 'layout' }, factory: LayoutComponent },
	{ name: 'it.privacy', path: '/informativa-sulla-privacy', defaultParams: { lang: 'it', mode: 'privacy_policy' }, factory: GenericComponent },
	{ name: 'it.terms', path: '/termini-di-utilizzo', defaultParams: { lang: 'it', mode: 'terms' }, factory: GenericComponent },
	// en
	{ name: 'en', path: '/en', defaultParams: { lang: 'en', mode: 'access' }, factory: AccessComponent },
	{ name: 'en.access', path: '/access', defaultParams: { lang: 'en', mode: 'access' }, factory: AccessComponent },
	{ name: 'en.accessCode', path: '/accesso-code?:p&:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'en', mode: 'accessCode' }, factory: AccessCodeComponent },
	{ name: 'en.guidedTour', path: '/guided-tour?:p&:link&:name&:role&:viewId&:pathId&:support', defaultParams: { lang: 'en', mode: 'guidedTour' }, factory: AgoraComponent },
	// { name: 'en.guidedTour', path: '/guided-tour', defaultParams: { lang: 'en', mode: 'guidedTour' }, factory: AgoraComponent },
	{ name: 'en.selfServiceTour', path: '/self-service-tour?:p&:viewId&:pathId', defaultParams: { lang: 'en', mode: 'selfServiceTour' }, factory: AgoraComponent },
	{ name: 'en.embed', path: '/embed', defaultParams: { lang: 'en', mode: 'embed' }, factory: AgoraComponent },
	{ name: 'en.tryInAr', path: '/try-in-ar?:p&:viewId', defaultParams: { lang: 'en', mode: 'tryInAr' }, factory: TryInARComponent },
	{ name: 'en.editor', path: '/editor?:p&:viewId', defaultParams: { lang: 'en', mode: 'editor' }, factory: EditorComponent },
	{ name: 'en.layout', path: '/layout', defaultParams: { lang: 'en', mode: 'layout' }, factory: LayoutComponent },
	{ name: 'en.privacy', path: '/privacy-policy', defaultParams: { lang: 'en', mode: 'privacy_policy' }, factory: GenericComponent },
	{ name: 'en.terms', path: '/terms-of-service', defaultParams: { lang: 'en', mode: 'terms' }, factory: GenericComponent },
];
