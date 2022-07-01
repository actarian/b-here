import { BehaviorSubject, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environment';
import { LabelPipe } from '../label/label.pipe';
import LocationService from '../location/location.service';
import { RouterService } from '../router/router.service';
import { Utils } from '../utils/utils';

export class LanguageService {

	static languages = this.getDefaultLanguages();
	static lang$ = new BehaviorSubject(this.getDefaultLanguage());
	static get lang() {
		return this.lang$.getValue();
	}
	static set lang(lang) {
		if (this.lang !== lang) {
			this.lang$.next(lang);
		}
	}

	static setAlternates(language, alternates) {
		this.languages = alternates;
		this.lang = language;
		// console.log('LanguageService.setAlternates', language, alternates);
	}

	static setRoute(route, routes) {
		const language = route.params.lang;
		// console.log('LanguageService.setRoute', route, route.path, language);
		const alternates = environment.languages.map(lang => {
			const title = lang === 'it' ? 'Italiano' : 'English';
			const alternateName = route.name.replace(new RegExp(`(^${language}$)|(^${language}\.)`), (match, g1, g2, offset) => {
				// console.log('LanguageService.match', match, g1, g2, offset);
				return g1 ? lang : `${lang}.`;
			});
			const alternate = routes.find(x => x.name === alternateName);
			// console.log('LanguageService.alternate', lang, alternateName, alternate);
			if (alternate) {
				return {
					name: alternate.name,
					params: route.params,
					href: alternate.path,
					lang: alternate.defaultParams.lang,
					title,
				};
			} else {
				return null;
			}
		}).filter(x => x !== null);
		this.setAlternates(language, alternates);
	}

	static get hasLanguages() {
		return this.languages.length > 1;
	}

	static get activeLanguage() {
		return this.languages.find(language => language.lang === this.lang);
	}

	static getDefaultLanguages() {
		return environment.alternates || [];
	}

	static getDefaultLanguage() {
		return environment.defaultLanguage || (this.languages ? this.languages[0].lang : null);
	}

	static setLanguage(language) {
		this.lang = language.lang;
	}

	static setLanguage$(language) {
		if (typeof language === 'string') {
			language = this.languages.find(x => x.lang === language);
		}
		if (!language) {
			return;
		}
		const url = (environment.flags.production ? `/api/${language.lang}/labels/` : `./api/${language.lang}/labels.json`);
		return from(fetch(url).then(response => {
			return response.json();
		})).pipe(
			tap(labels => {
				environment.labels = labels;
				RouterService.replaceHistoryState(language.name, language.params);
				const from = this.activeLanguage.href.split('?')[0];
				const to = language.href.split('?')[0];
				LocationService.replace(from, to);
				this.lang = language.lang;
			}),
		);
		/*
		return of(language).pipe(
			tap(language => {
				// LabelPipe.setLabels();
				LocationService.replace(this.activeLanguage.href, language.href);
				this.lang = language.lang;
			}),
		);
		*/
	}

	static setLanguage$_(language) {
		return from(fetch(language.href).then(response => {
			return response.text();
		})).pipe(
			tap(html => {
				// console.log('html', html);
				const labelsMatch = /(window\.labels\s*=\s*\n*\s*\{((\{.+?\})|.)+?\})/gms.exec(html);
				if (labelsMatch) {
					// console.log('labels', labelsMatch[0]);
					new Function(labelsMatch[0]).call(window);
					LabelPipe.setLabels();
				}
				const bhereMatch = /(window\.bhere\s*=\s*\n*\s*\{((\{.+?\})|.)+?\})/gms.exec(html);
				if (bhereMatch) {
					// console.log('bhere', bhereMatch[0]);
					const data = {};
					new Function(bhereMatch[0].replace('window', 'this')).call(data);
					if (data.bhere) {
						Utils.merge(environment, data.bhere);
					}
				}
				LocationService.replace(this.activeLanguage.href, language.href);
				// console.log(environment.labels);
				this.lang = language.lang;
			}),
		);
	}

	static toggleLanguages() {
		this.showLanguages = !this.showLanguages;
		this.pushChanges();
	}

}
