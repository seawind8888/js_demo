function Promise(fn) {
  //需要成功以及成功时的回调
  var taskList = [];
  //一个实例的方法，用来注册异步事件
  this.then = function (done, fail) {
    taskList.push(done);
    return this;
  }

  function resolve() {
    setTimeout(function () {
      taskList.forEach(function (task) {
        task();
      });
    }, 0);
  }
  fn(resolve);
}

function starRequest() {
  return new Promise((resolve) => resolve()).then(() => {
    console.log(2)
  })
}
starRequest()