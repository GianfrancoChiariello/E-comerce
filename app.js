fetch("./js/data.json")
.then(response => response.json())
.then(productos => {

    let search = document.getElementById("search1")
    search.addEventListener("input",loadProductos)
    let select = document.querySelectorAll(".select")
    let container = document.getElementById("container")
    let containerCheck = document.getElementById("containerCheck")
    let containerTotal = document.getElementById("containerTotal")
    let carrito = []


    loadProductos()

    orderProducts()

    totalPrice()

    function loadProductos() {
        container.innerHTML = ""

        productos.forEach(producto => {
            if (producto.producto.includes(search.value)) {
                createDom(producto)
            }
        });
    }

    function createDom(producto) {
        let div = document.createElement("div")
        div.innerHTML = `<div>
                            <img src=${producto.imgUrl}>
                            <h1>${producto.producto}</h1>
                            <p>${producto.precio}</p>
                            <button class="btn" id=${producto.id}>Agregar Producto</button>
                        </div>`
        container.append(div)

        let btn = document.querySelectorAll(".btn")
        btn.forEach(boton => {
            boton.addEventListener("click",addProducts)
        })
    }


    function addProducts(e) {
        let add = productos.find(producto => producto.id == e.target.id)
        carrito.push(add.precio)
        
        let div2 = document.createElement("div")
        div2.innerHTML = `<div class="flexx">
                            <h1>producto:${ add.producto} precio:${ add.precio}</h1>
                            <button class="btnX" id=${add.id}>X</button>
                        </div>`
        containerCheck.append(div2)

    
        let btnX = document.querySelectorAll(".btnX")
        btnX.forEach(botonX => {
            botonX.addEventListener("click",deleteProducts)
        })

        totalPrice()
    }
    

    function deleteProducts(e) {
        let deleteProduct = carrito.find(producto => producto.id == e.target.id)
        carrito.splice(deleteProduct,1)
        e.target.parentNode.remove()
        
        if (carrito.length > 0) {
            totalPrice()
        } else {
            containerTotal.innerHTML = `<h1>Total: $0</h1>`
        }
    }


    function totalPrice() {
        if (carrito.length > 0) {
            var total = carrito.reduce((a,b) => a + b)
        }

        if (carrito.length == 0) {
            containerTotal.innerHTML = `<h1>total: 0$</h1>`
        } else {
            containerTotal.innerHTML = `<h1>$${total}</h1>`
        }
    }

    function filterPrint(data) {
        container.innerHTML = ""

        data.forEach(producto => {
            createDom(producto)
        });
    }

    function orderProducts() {
        select.forEach(obj => {
            obj.addEventListener("change", function() {
                value = obj.options[obj.selectedIndex].value
                
                if (value == "Menor a Mayor") {
                    let data = productos.sort((a,b) => a.precio - b.precio)
                    filterPrint(data)
                } else if  (value == "Mayor a Menor") {
                    data = productos.sort((a,b) => b.precio - a.precio)
                    filterPrint(data) 
                } else if (value == "A - Z") {
                    data = productos.sort((a,b) => a.producto.localeCompare(b.producto))
                    filterPrint(data) 
                } else if(value == "Z - A") {
                    data = productos.sort((a,b) => b.producto.localeCompare(a.producto))
                    filterPrint(data) 
                }
            })
        })
    }
})