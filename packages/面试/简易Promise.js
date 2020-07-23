function tPromise(fn) {
  //需要成功以及成功时的回调
  var taskList = [];
  //一个实例的方法，用来注册异步事件
  this.then = function (done, fail) {
    taskList.push(done)
    return this;
  }

  function resolve(value) {
    setTimeout(function () {
      taskList.forEach(function (task) {
        task(value);
      });
    }, 0);
  }
  fn(resolve);
}

function starRequest() {
  return new tPromise(resolve => resolve(1))
    .then((res) => {
    console.log(res)
  })
}
starRequest()