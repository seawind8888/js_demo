
  function deepCopy(obj) {
    let copy = {};

    // 如果是基本类型直接赋值，
    // 如果是数组则拷贝，
    // 其他对象则递归调用deepCopy方法
    Object.keys(obj).forEach(key => {

      if (obj[key] instanceof Array) {
        copy[key] = Array.from(obj[key]);
      } else if (typeof obj[key] === 'object') {
        copy[key] = deepCopy(obj[key]);
      } else {
        copy[key] = obj[key];
      }
    })

    return copy;
  }