const htmlEntities = {
	'&nbsp;': ' ',
	'&lt;': '<',
	'&gt;': '>',
	'&amp;': '&',
	'&quot;': '"',
	'&#39;': "'",
	'&apos;': "'",
	'&copy;': '©',
	'&reg;': '®',
	'&mdash;': '—',
	'&ndash;': '–',
	'&hellip;': '…',
};

export const sanitizeContent = (content) => {
	return content
		.replace(
			/&(nbsp|lt|gt|amp|quot|apos|#39|copy|reg|mdash|ndash|hellip);/gi,
			(match) => htmlEntities[match],
		)
		.replaceAll('&nbsp;', ' ')
		.replace(/ +/, ' ')
		.replaceAll('<br>', '\n')
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '')
		.replaceAll('&lt;div&gt;', '\n')
		.replaceAll('&lt;/div&gt;', '')
		.replaceAll(/<[^>]*>/g, '');
};
