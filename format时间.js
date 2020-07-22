function convert(date, fmt) {
	const { year, month, day, hour, minute, second } = date;
	const currentDate = new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`);
	const o = {
		'm+|M+': month,
		'd+|D+': day,
		'h+': hour,
		'm+': minute,
		's+': second,
		'q+': Math.floor((currentDate.getMonth() + 3) / 3),
		'S': currentDate.getMilliseconds()
	};
  let _fmt = fmt;
	if (year && /(y+|Y+)/.test(_fmt)) {
		_fmt = _fmt.replace(RegExp.$1, (year.toString()).substr(4 - RegExp.$1.length));
	}
	Object.keys(o).forEach(k => {
		if (new RegExp(`(${k})`).test(_fmt)) {
			_fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((o[k].toString()).length)));
		}
	});
	return _fmt;
}

console.log(convert({year: '2020', month: '2'}, 'YYYY-MM'))