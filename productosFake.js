const faker = require('@faker-js/faker/locale/es_MX')

const prodsFake=[]

const prods = function(){
    return p={
        nombre: faker.faker.commerce.productName(),
        precio: faker.faker.commerce.price(50,250, 2,"$"),
        foto: faker.faker.image.image(100, 100, true)
    }
}

for (let i=0; i<5; i++){
    prodsFake.push(prods())
}

module.exports = prodsFake;