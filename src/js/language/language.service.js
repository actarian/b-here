import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environment';
import LabelPipe from '../label/label.pipe';
import LocationService from '../location/location.service';
import { Utils } from '../utils/utils';

export class LanguageService {

	static languages = this.getDefaultLanguages();
	static defaultLanguage = this.getDefaultLanguage();
	static selectedLanguage = this.defaultLanguage;

	static get hasLanguages() {
		return this.languages.length > 1;
	}

	static get activeLanguage() {
		return this.languages.find(language => language.lang === this.selectedLanguage);
	}

	static getDefaultLanguages() {
		return environment.alternates || [];
	}

	static getDefaultLanguage() {
		return environment.defaultLanguage || (this.languages ? this.languages[0].lang : null);
	}

	static setLanguage(language) {
		this.selectedLanguage = language.lang;
	}

	static setLanguage$(language) {
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
				// console.log(window.labels);
				this.selectedLanguage = language.lang;
			}),
		);
	}

	static toggleLanguages() {
		this.showLanguages = !this.showLanguages;
		this.pushChanges();
	}

}
