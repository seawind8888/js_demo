const Ajv = require("ajv/dist/jtd")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  properties: {
    foo: {type: "int32"}
  },
  optionalProperties: {
    bar: {type: "string"}
  }
}

const serialize = ajv.compileSerializer(schema)
console.log(serialize(data))

const parse = ajv.compileParser(schema)

const data = {
  foo: 1,
  bar: "abc"
}

const json = '{"foo": 1, "bar": "abc"}'
const invalidJson = '{"unknown": "abc"}'

console.log(parseAndLog(json)) // logs {foo: 1, bar: "abc"}
console.log(parseAndLog(invalidJson)) // logs error and position

function parseAndLog(json) {
  const data = parse(json)
  if (data === undefined) {
    console.log(parse.message) // error message from the last parse call
    console.log(parse.position) // error position in string
  } else {
    console.log(data)
  }
}