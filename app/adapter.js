'use strict';

import axios from 'axios';

const {CancelToken} = axios;

export default class UploadAdapter {
	constructor(loader) {
		this.loader = loader;
		this.source = CancelToken.source();
	}

	upload() {
		// console.log(this);
		return axios.post('/api/tju/service/image', {}, {
			cancelToken: this.source.token
		}).then(res => {
			return res.data.data;
		});
	}

	abort() {
		this.source.cancel();
	}
}