/* fetch("../js/data.json")
.then(response => response.json())
.then(productos => {


let input = document.getElementById("search1")
let container = document.getElementById("container")
let containerCheck = document.getElementById("containerCheck")
input.addEventListener("input",mostrarProductos)

mostrarProductos()

function mostrarProductos() {
    container.innerHTML = ""

    productos.forEach(  producto => {
        if (producto.producto.includes(input.value)) {
            let div = document.createElement("div")
            div.innerHTML = `<div>
                                <img src=${producto.imgUrl}>
                                <h1>${producto.producto}</h1>
                                <p>${producto.precio}</p>
                                <button class="btn" id=${producto.id}>Agregar</button>`
            container.append(div)
        }
        
    });

    let buttons = document.querySelectorAll(".btn")
    buttons.forEach(botones => {
        botones.addEventListener("click",agregarProducto)
    })

    function agregarProducto(e) {
        let adder = productos.find(producto => producto.id == e.target.id)

        let div2 = document.createElement("div")

        div2.innerHTML = `<div>Se agregó: ${adder.producto}, valor: ${adder.precio}</div>`

        containerCheck.append(div2)
    }

}


}) */


fetch("../js/data.json")
.then(response => response.json())
.then(productos => {


    let search = document.getElementById("search1")
    let container = document.getElementById("container")

    let containerCheck = document.getElementById("containerCheck")
    search.addEventListener("input",cargarProductos)


    cargarProductos()
    
    function cargarProductos() {
        container.innerHTML = ""
        
        productos.forEach(producto => {

            if (producto.producto.includes(search.value)) {
                pintar(producto)
            }
        });
    }

    let filter = document.getElementById("filter")
    filter.addEventListener("click",filterFunction)

    function filterFunction(e) {
        container.innerHTML = ""
        let productosOrdenados = productos.sort((a,b) => a.precio - b.precio)
        productosOrdenados.forEach(producto => {
            pintar(producto)
        });
    }



    // funciones 

    function agregarProductos(e) {
        let agregar = productos.find(producto => producto.id == e.target.id)
        
        let div2 = document.createElement("div")
        div2.classList = "div2"

        div2.innerHTML = `<div>
                            <h1>Producto Agregado: ${agregar.producto},Valor:${agregar.precio}</h1>
                            </div>`
        containerCheck.append(div2)
    }

    function pintar(producto) {
        let div = document.createElement("div")
        div.classList = "div"
        div.innerHTML = `<div>
                <img src=${producto.imgUrl}>
                <h1>${producto.producto}</h1>
                <p>${producto.precio}</p>
                <p>Categoria:${producto.categoria}</p>
                <button class="btns" id=${producto.id}>Agregar al Carrito</button>
                </div>`
        container.append(div)

        let btn = document.querySelectorAll(".btns")
        btn.forEach(botones => {
            botones.addEventListener("click",agregarProductos)
        })
    }


})

