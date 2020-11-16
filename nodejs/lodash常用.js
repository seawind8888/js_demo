const _ = require('lodash')

var foo = [
    { 
        value: '西安点告',
        label: '西安点告',
        code: 1
      },{
        value: '易点',
        label: '易点',
        code: 2
      },
      {
        value: '易点',
        label: '易点',
        code: 2
      },
      {
        value: '易点d',
        label: '易点d',
        code: 3
      }
]
var bar = _.find(foo, ['value', '易点'])
// var bar = _.reject(foo, ['label', '易点'])
console.log(bar)
// const array1 = [{adPlatform:"google",ratio:"12"}]
// const array2 = [{adPlatform:"google",ratio:"13"},{adPlatform:"tiktok",ratio:"10"}]
let a = [1,2,3]

// console.log(_.differenceWith(array1, array2, _.isEqual))