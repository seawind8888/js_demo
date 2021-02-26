const robot = require("robotjs");
const run = require('./global测试')

run()
console.log(global.a)
// robot.moveMouse(1626, 60)

// setTimeout(() => {
//     robot.mouseClick('left', true);
// },1000)
// robot.mouseClick();