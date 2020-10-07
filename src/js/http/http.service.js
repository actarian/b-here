import { from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { STATIC } from '../environment';

export default class HttpService {

	static http$(method, url, data, format = 'json') {
		const methods = ['POST', 'PUT', 'PATCH'];
		let response_ = null;
		// url = this.getUrl(url, format);
		return from(fetch(url, {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: methods.indexOf(method) !== -1 ? JSON.stringify(data) : undefined
		}).then((response) => {
			response_ = response;
			// console.log(response);
			const contentType = response.headers.get("content-type");
			const responseType = (contentType && contentType.indexOf("application/json") !== -1) ? response.json() : response.text();
			if (response.ok) {
				return responseType;
			} else {
				return responseType.then(data => {
					return Promise.reject(data);
				});
			}
		})).pipe(
			catchError(error => {
				return throwError(this.getError(error, response_));
			})
		);
	}

	static get$(url, data, format) {
		const query = this.query(data);
		return this.http$('GET', `${url}${query}`, undefined, format);
	}

	static delete$(url) {
		return this.http$('DELETE', url);
	}

	static post$(url, data) {
		return this.http$('POST', url, data);
	}

	static put$(url, data) {
		return this.http$('PUT', url, data);
	}

	static patch$(url, data) {
		return this.http$('PATCH', url, data);
	}

	static query(data) {
		return ''; // todo
	}

	static getUrl(url, format = 'json') {
		// console.log(url);
		return STATIC && format === 'json' && url.indexOf('/') === 0 ? `.${url}.json` : url;
	}

	static getError(object, response) {
		let error = typeof object === 'object' ? object : {};
		if (!error.status) {
			error.status = response ? response.status : 0;
		}
		if (!error.statusCode) {
			error.statusCode = response ? response.status : 0;
		}
		if (!error.statusMessage) {
			error.statusMessage = response ? response.statusText : object;
		}
		console.log('HttpService.getError', error, object);
		return error;
	}

}
