import * as parser from "../parser/lua_writer"
describe("lua writer",()=>{

    it("should translate array", ()=>{
       const x = parser.writeRegisters(1,["abc","def","ghj","finish"]); 
       console.log(x)
       const xx = {
           a: 1,
           b: 2,
           c: {
               d: 10,
               e: 11
           }
       }
       console.log(parser.writeTable(1,xx))

    })
    
})