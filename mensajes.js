
const fs=require("fs")
//const p = require("./public/prod2.json")

class MensajesMgr {

    async agregar(arrayMensajes) {
        try {
            await fs.promises.writeFile('./public/mensajes.json', JSON.stringify(arrayMensajes))
            console.log('Guardado!')
        } catch (err) {
            //hubo un error
            console.log('Algo pasó!')
        }
    }

}

/* function grabarMensajes(arrayMensajes){

    async function agregar(arrayMensajes) {
        try {
            await fs.promises.writeFile('./public/mensajes.json', JSON.stringify(arrayMensajes))
            console.log('Guardado!')
        } catch (err) {
            //hubo un error
            console.log('Algo pasó!')
        }
    }
}
*/
module.export = {MensajesMgr}