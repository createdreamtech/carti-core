const JsonSchemaTranspiler = require("@json-schema-tools/transpiler").default;
const mySchema = require("../src/machine-config-schema.json")
const Dereferencer = require("@json-schema-tools/dereferencer").default;
const fs = require('fs-extra')

async function generate(){
const dereffer = new Dereferencer(mySchema);
const schema = await dereffer.resolve()
const transpiler = new JsonSchemaTranspiler(schema);
fs.writeFile("./src/generated/machine_config_schema.ts", transpiler.toTypescript());
}
try {
generate()
}catch(e){
    console.log(e)
}

/*console.log(transpiler.toRust());
console.log(transpiler.to("go")); // same thing, different form/interface
console.log(transpiler.to("python")); // works with shorthand of the language aswell (py or python)
*/