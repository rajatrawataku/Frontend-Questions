// BFE Questions 149

/**
 * @param {string} translation
 * @param {any} data
 * @returns {string}
 */
function t(translation, data = {}) {
	while (translation.includes('{{') && translation.includes('}}')) {
		const startIndex = translation.indexOf('{{');
		const endIndex = translation.indexOf('}}', startIndex);
		const word = translation.slice(startIndex + 2, endIndex);
		const replacedData = data[word] || '';
		translation = translation.replace(`{{${word}}}`, replacedData);
	}

	return translation;
}
