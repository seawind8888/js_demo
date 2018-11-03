继承形式
function Person () {}
Person.prototype.Talk = (mes) => {'say:' + console.log(mes)}
Person.prototype.Eat = (food) => {'eat' + console.log(food)}
let man = new Person()
man.Talk('hahah')
man.Eat('apple')

// 字面量形式
let Person = {
    Talk: (mes) => {'say:' + console.log(mes)},
    Eat: (food) => {'eat' + console.log(food)}
}
let man = Person
man.Talk('hahah')
man.Eat('apple')