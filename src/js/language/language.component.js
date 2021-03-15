import { Component } from 'rxcomp';
import { first } from 'rxjs/operators';
import { LanguageService } from './language.service';

export default class LanguageComponent extends Component {

	onInit() {
		this.showLanguages = false;
		this.languageService = LanguageService;
	}

	setLanguage(language) {
		this.languageService.setLanguage$(language).pipe(
			first(),
		).subscribe(_ => {
			this.showLanguages = false;
			this.pushChanges();
			this.set.next();
		});
	}

	toggleLanguages() {
		this.showLanguages = !this.showLanguages;
		this.pushChanges();
	}
}

LanguageComponent.meta = {
	selector: '[language]',
	outputs: ['set'],
	template: /* html */ `
		<button type="button" class="btn--language" (click)="toggleLanguages()" *if="languageService.hasLanguages"><span [innerHTML]="languageService.activeLanguage.title"></span> <svg viewBox="0 0 8 5"><use xlink:href="#caret-down"></use></svg></button>
		<ul class="nav--language" *if="showLanguages">
			<li (click)="setLanguage(language)" *for="let language of languageService.languages"><span [innerHTML]="language.title"></span></li>
		</ul>
	`
};
