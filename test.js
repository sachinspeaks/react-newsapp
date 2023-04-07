
// let pencil=new productive("Pencil",10)
// console.log(pencil)
// console.log(typeof(pencil))
// let product=class{
//     constructor(name,price)
//     {
//         this.name=name
//         this.price=price
//     }
//     get itemname()
//     {
//         return this.name+" is a product"
//     }
// }
// class furniture extends product{
//     constructor(name,price)
//     {
//         super(name,price)
//     }
//     get itemname()
//     {
//         return this.name+" is a furniture"
//     }
// }
// let chair=new furniture("chair",550)
// let wood=new product("wood",50)
// console.log(chair.itemname) 
// console.log(wood.itemname) 
// let arr=[2,4,5,6,7,8]
// let sum=0
// let p=Array.from(arr,(it)=>{
//     it=it+sum;
//     sum=it;
//     return sum;
// })
// console.log(p)
// arr.map((x)=>{console.log(x)})
// console.log(narr)
// console.log(typeof(narr))
// console.log(typeof(arr))
// db.createCollection("customer", { validator: { $jsonSchema: { bsonType: "object", required: ['name', 'email', 'address'], properties: { name: { bsonType: 'string', description: 'Name is a required field' }, email: { bsonType: 'string', description: 'Email is a required field' }, address: { bsonType: 'object', description: 'Address is a required  field', properties: { street: { bsonType: 'string' }, city: { bsonType: 'string' }, country: { bsonType: 'string' } } } } } } })
let time="2023-04-01T11:05:00Z"
let d=new Date(time)
console.log(d.toUTCString())