'use strict';

const markdownIt = require('markdown-it');

module.exports = function getThumbnail(content) {
	const tokenList = markdownIt().parse(content);
	let index;

	const imageContainer = tokenList.find(token => {

		if (token.type === 'inline' && token.children !== null) {

			index = token.children.findIndex(element => {

				return element.type ==='image';
			});

			if (index !== -1) {
				return true;
			}

		} else {
			return false;
		}

		
	});
	
	if (imageContainer) {

		return imageContainer.children[index].attrs[0][1];
	}

};