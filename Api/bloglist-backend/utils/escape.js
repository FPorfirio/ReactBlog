const escape =  (s) => {
	return s.replace(
			/[^0-9A-Za-z ]/g,
			c => "&#" + c.charCodeAt(0) + ";"
	);
}

module.exports = escape