function add(){
	let args = [...arguments];
	let _add = function(){
		args.push(...arguments);
		return _add;
	}
	_add.toString = function(){
		return args.reduce((a,b)=>{
			return a + b;
		});
	}
	return _add;
}

console.log(add(1)(2)(3).toString());
