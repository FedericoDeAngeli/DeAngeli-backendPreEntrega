const form = document.querySelector('#ProdForm')


  form?.addEventListener('submit', async event => {
    event.preventDefault()

    const listTitle = document.querySelector("#nombre").value
const listDescription = document.querySelector("#descripcion").value
     const listPrecio = document.querySelector("#precio").value
    const listThumbnail = document.querySelector("#thumbnail").value
     const listCode = document.querySelector("#code").value
     const listCategory = document.querySelector("#category").value

              const NuevoProducto = {
             title: listTitle,
             description: listDescription,
             price: listPrecio,
             thumbnail: listThumbnail,
             code: listCode,
             category: listCategory
         }

    try {
      const res = await fetch(
        `/api/productos`,
        {
          method: 'POST',
          body: NuevoProducto
        },
      )
      const resData = await res.json()

      if (res.status === 201) {
        window.location.reload()
      } else {
        console.log(resData)
      }
    } catch (err) {
      console.log(err.message)
    }
  })





// const socket = io()
// import { productManager } from "../../src/productmanagermongoose.js"



//  document.querySelector("button").addEventListener("click", async () => {
//     const listTitle = document.querySelector("#nombre").value
//     const listDescription = document.querySelector("#descripcion").value
//     const listPrecio = document.querySelector("#precio").value
//     const listThumbnail = document.querySelector("#thumbnail").value
//     const listCode = document.querySelector("#code").value
//     const listCategory = document.querySelector("#category").value

//     if (listTitle || listDescription || listPrecio || listThumbnail || listCode || listCategory) {
//         const NuevoProducto = {
//             title: listTitle,
//             description: listDescription,
//             price: listPrecio,
//             thumbnail: listThumbnail,
//             code: listCode,
//             category: listCategory
//         }
//        await productManager.addProduct(NuevoProducto)
//         // socket.emit("productoAgregado", NuevoProducto)
//     } else {
//         throw new Error("Debes llenar todos los campos")
//     }

//     document.querySelector("#nombre").value = ""
//     document.querySelector("#descripcion").value = ""
//     document.querySelector("#precio").value = ""
//     document.querySelector("#thumbnail").value = ""
//     document.querySelector("#code").value = ""
//     document.querySelector("#category").value = ""
// })

// const listadodeprodutos = productManager.find()
// console.log(listadodeprodutos)

// const tabla = document.querySelector("#tbody")

//     tabla.innerHTML = ""

//     for (const producto of listadodeprodutos) {

//         const fila = document.createElement("tr")

//         fila.innerHTML = `

//         <td>${producto.title}</td>
//         <td>${producto.description}</td>
//          <td>${producto.price}</td>
//         <td>${producto.thumbnail}</td>
//         <td>${producto.code}</td>
//         <td>${producto.category}</td>

// `

//         tabla.appendChild(fila)}




// socket.on("agregarProducto", RealTimeProducts => {

//     console.log({ RealTimeProducts })

//     const tabla = document.querySelector("#tbody")

//     tabla.innerHTML = ""

//     for (const producto of RealTimeProducts) {

//         const fila = document.createElement("tr")

//         fila.innerHTML = `

//         <td>${producto.title}</td>
//         <td>${producto.description}</td>
//          <td>${producto.price}</td>
//         <td>${producto.thumbnail}</td>
//         <td>${producto.code}</td>
//         <td>${producto.category}</td>

// `

//         tabla.appendChild(fila)

//     }
// }
// )
