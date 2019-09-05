var a = {
	b: 'foo',
    c: {}
}

a.d = a;
a.c.e = a.c;

var handleCircular = function() {  
    var cache = [];
    var keyCache = []
    return function(key, value) {
        if (typeof value === 'object' && value !== null) {
            var index = cache.indexOf(value);
            if (index !== -1) {
                return '[Circular ' + keyCache[index] + ']';
            }
            cache.push(value);
            keyCache.push(key || 'root');
        }
        return value;
    }
}

var tmp = JSON.stringify;  
JSON.stringify = function(value, replacer, space) {  
    replacer = replacer || handleCircular();
    return tmp(value, replacer, space);
}

//{"b":1,"c":{"e":"[Circular c]"},"d":"[Circular root]"}