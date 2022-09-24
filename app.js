/* const getData = async () => {
    try {
        const response = await fetch('./js/data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Fallo la peticion a la api")
    }
}



getData().then(productos => {

    const search = document.getElementById("search1")
    search.addEventListener("input",loadProducts)
    const container = document.getElementById("container")
    const containerCheck = document.getElementById("containerCheck")
    const containerTotal = document.getElementById("containerTotal")
    const select = document.querySelectorAll(".select")
    let cart = []

    loadProducts()

    totalPrice()

    filterProducts()
    
    function loadProducts() {
        container.innerHTML = ""

        productos.forEach(producto => {
        if (producto.producto.includes(search.value)) {
            loadDom(producto)
        }
    });
    }

    function loadDom(producto) {
        let div = document.createElement("div")
        div.innerHTML = `<div>
                            <img src=${producto.imgUrl}>
                            <h1>${producto.producto}</h1>
                            <p>${producto.precio}</p>
                            <button class="btns" id=${producto.id}>Add</button>
                            </div>`
        container.append(div)

        let btns = document.querySelectorAll(".btns")
        btns.forEach(btn => {
            btn.addEventListener("click",addProduct)
        })
    }

    function addProduct(e) {
        let adder = productos.find(producto => producto.id == e.target.id)
        cart.push(adder)
        
        loadCart()
        totalPrice()
    }

    function loadCart() {
        containerCheck.innerHTML = ""
        
        cart.forEach(producto => {
            let div = document.createElement("div")
            div.innerHTML = `<div>
                                <h1>${producto.producto}</h1>
                                <p>${producto.precio}</p>
                                <button class="btnX" id=${producto.id}>X</button>
                                </div>`
            containerCheck.append(div)
        })

        let btnX = document.querySelectorAll(".btnX")
        btnX.forEach(btn => {
            btn.addEventListener("click",deleteProduct)
        })
    }

    function deleteProduct(e) {
        let deleteProduct = cart.find(producto => producto.id == e.target.id)
        cart.splice(cart.indexOf(deleteProduct),1)
        
        loadCart()
        totalPrice()
    }


    function totalPrice() {

        let total = 0
        let totalCart = cart.map(price => price.precio)

        totalCart.forEach(tt => {
            total += tt
        })

        containerTotal.innerHTML = `<h1>Total: $${total}</h1>`
    }

    function filterDom(date) {
        container.innerHTML = ""

        date.forEach(dt => {
            loadDom(dt)
        })
    }

    function filterProducts() {
        select.forEach(slt => {
            slt.addEventListener("change", function() {
                let value = slt.options[slt.selectedIndex].value
                
                if (value == "Menor a Mayor") {
                    let view = productos.sort((a,b)=> a.precio - b.precio)
                    filterDom(view)
                } else if (value == "Mayor a Menor") {
                    view = productos.sort((a,b)=> b.precio - a.precio)
                    filterDom(view)
                } else if (value == "A - Z") {
                    view = productos.sort((a,b)=> a.producto.localeCompare(b.producto))
                    filterDom(view)
                } else if (value == "Z - A") {
                    view = productos.sort((a,b)=> b.producto.localeCompare(a.producto))
                    filterDom(view)
                }
            })
        })
    }
});
 */


/* fetch("./js/data.json")
.then(response => response.json())
.then(productos => {
    
    
    const search = document.getElementById("search1")
    search.addEventListener("input",chargeProductDom)
    const container = document.getElementById("container")
    const containerCheck = document.getElementById("containerCheck")
    const containerTotal = document.getElementById("containerTotal")
    const select = document.querySelectorAll(".select")
    let cart = []



    chargeProductDom()
    totalCart()
    filterProducts()
    localRestore()

    function localRestore() {
        if (localStorage.getItem("cart") == null) {
            localStorage.setItem("cart",JSON.stringify(cart))
        } else {
            cart = JSON.parse(localStorage.getItem("cart"))
            loadCart()
            totalCart()
        }
    }

    function chargeProductDom() {
        container.innerHTML = ""

        productos.forEach(producto => {
            if (producto.producto.includes(search.value)) {
                loadDom(producto)
            }
        });
    }

    function loadDom(producto) {
        let div = document.createElement("div")
        div.innerHTML = `<div>
                            <img src=${producto.imgUrl}>
                            <h1>${producto.producto}</h1>
                            <p>${producto.precio}</p>
                            <button class="btns" id=${producto.id}>Add</button>
                            </div>`
        container.append(div)

        let btns = document.querySelectorAll(".btns")
        btns.forEach(btn => {
            btn.addEventListener("click",addProductsCart)
        })
    }

    function addProductsCart(e) {
        let add = productos.find(producto => producto.id == e.target.id)
        cart.push(add)

        localStorage.setItem("cart",JSON.stringify(cart))

        loadCart()
        totalCart()
    }

    function loadCart() {
        containerCheck.innerHTML = ""

        cart.forEach(producto => {
            let div2 = document.createElement("div")
            div2.innerHTML = `<div>
                                <h1>${producto.producto}</h1>
                                <p>${producto.precio}</p>
                                <button class="btnX" id=${producto.id}>X</button>
                                </div>`
            containerCheck.append(div2)
        })

        let btnX = document.querySelectorAll(".btnX")
        btnX.forEach(btn => {
            btn.addEventListener("click",deleteProduct)
        })
    }

    function deleteProduct(e) {
        let delet = cart.find(producto => producto.id == e.target.id)

        cart.splice(cart.indexOf(delet),1)

        localStorage.setItem("cart",JSON.stringify(cart))

        loadCart()
        totalCart()
    }

    function totalCart() {
        let prices = cart.map(date => date.precio)
        let total = 0

        prices.forEach(pr => {
            total += pr
        })

        containerTotal.innerHTML = `<h1>Total:$${total}`
    }

    function filterDom(producto) {
        container.innerHTML = ""

        producto.forEach(date => {
            loadDom(date)
        })
    }

    function filterProducts() {
        select.forEach(st => {
            st.addEventListener("change",function() {
                let value = st.options[st.selectedIndex].value

                if (value == "Menor a Mayor") {
                    let finalValue = productos.sort((a,b) => a.precio - b.precio)
                    filterDom(finalValue)
                } else if (value == "Mayor a Menor") {
                    finalValue = productos.sort((a,b) => b.precio - a.precio)
                    filterDom(finalValue)
                } else if (value == "A - Z") {
                    finalValue = productos.sort((a,b) => a.producto.localeCompare(b.producto))
                    filterDom(finalValue)
                } else if (value == "Z - A") {
                    finalValue = productos.sort((a,b) => b.producto.localeCompare(a.producto))
                    filterDom(finalValue)
                }
            })
        })
    }
}) 
 */


/* fetch("./js/data.json")
.then(response => response.json())
.then(productos => {
    let search = document.getElementById("search1")
    search.addEventListener("input",loadProducts)
    let container = document.getElementById("container")
    let containerCheck = document.getElementById("containerCheck")
    let containerTotal = document.getElementById("containerTotal")
    let cart = []

    if (localStorage.getItem("cart") == null) {
        localStorage.setItem("cart",cart)
    } else {
        cart = JSON.parse(localStorage.getItem("cart"))
    }

    loadProducts()
    loadCart()
    totalPrice()

    function loadProducts() {
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
                            <button class="btns" id=${producto.id}>Add</button>
                            </div>`
        container.append(div)

        let btns = document.querySelectorAll(".btns")
        btns.forEach(btn => {
            btn.addEventListener("click",addProduct)
        })
    }

    function addProduct(e) {
        let add = productos.find(producto => producto.id == e.target.id)
        cart.push(add)

        localStorage.setItem("cart",JSON.stringify(cart))

        loadCart()
        totalPrice()
    }

    function loadCart() {
        containerCheck.innerHTML = ""
        
        cart.forEach(productos => {
            let div2 = document.createElement("div")
            div2.innerHTML = `<div>
                                <h1>${productos.producto}</h1>
                                <p>${productos.precio}</p>
                                <button class="btnX" id=${productos.id}>X</button>
                                </div>`
            containerCheck.append(div2)
        }) 

        let btnX = document.querySelectorAll(".btnX")
        btnX.forEach(btn => {
            btn.addEventListener("click",deleteProduct)
        })
    }

    function deleteProduct(e) {
        let delet = cart.find(producto => producto.id == e.target.id)
        cart.splice(cart.indexOf(delet),1)

        localStorage.setItem("cart",JSON.stringify(cart))

        loadCart()
        totalPrice()
    }

    function totalPrice() {
        let total = cart.map(producto => producto.precio)

        let totalPrice = 0

        total.forEach(pr => {
            totalPrice += pr
        })

        containerTotal.innerHTML = `<h1>Total:$${ totalPrice}</h1>`
    }


}) */




fetch('./js/data.json')
.then(response => response.json())
.then(productos => {
    
    let viewcart = document.getElementById("viewcart")
    let buttonCart = document.getElementById("buttonCart")
    buttonCart.addEventListener("click", () => {
        viewcart.classList.toggle("active2")
    })
    let cart = []
    let search = document.getElementById("search1")
    search.addEventListener("input",loadProducts)
    let container = document.getElementById("container")
    let containerCheck = document.getElementById("containerCheck")
    let containerTotal = document.getElementById("containerTotal")
    let selects = document.querySelectorAll(".select")
    let deleteAll = document.querySelector(".deleteAll")
    deleteAll.addEventListener("click",function() {
        cart = []
        loadProducts()
        loadCart()
        totalCart()
        localStorage.setItem("cart",JSON.stringify(cart))
    })


    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
        loadProducts()
        loadCart()
        totalCart()
    }

    loadProducts()
    totalCart()
    filterProducts()

    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function loadProducts() {
        container.innerHTML = ""

        productos.forEach(producto => {
            if (producto.producto.includes(search.value)) {
                loadDom(producto)
            }
        });
    }

    function loadDom(producto) {
        let div = document.createElement("div")
        
        div.innerHTML = `<div>
                            <img src=${producto.imgUrl}>
                            <h1>${capitalizarPrimeraLetra(producto.producto)}</h1>
                            <p>$${producto.precio}</p>
                            <p>Stock:${producto.stock}</p>
                            <input class="inputS" placeholder="1" min="1" value="1"  type="number">
                            <button class="btnS" id=${producto.id}>Add</button>
                            </div>`
        container.append(div)

        let btnS = document.querySelectorAll(".btnS")
        btnS.forEach(btn => {
            btn.addEventListener("click",addProduct)
        })
    }


    function addProduct(e) {
        let add = productos.find(producto => producto.id == e.target.id)
        let input = e.target.parentElement.querySelector(".inputS").value
        
        if(input <= add.stock && cart.includes(add) == false) {
            cart.push(add)
            add.stock = add.stock - input
            add.cantidad = input

            if (input == 1) {
                add.totalPrice = add.precio
            } else {
                add.totalPrice = add.precio * add.cantidad
            }
        } else if (add.stock >= 1 && input <= add.stock) {
            add.cantidad++
            add.stock = add.stock - input
            
            if (add.cantidad >= 0) {
                add.totalPrice = add.precio * add.cantidad
            }
        }

        if (add.stock <= 0) {
            Swal.fire({
                position: 'bottom-end',
                title: 'No hay Stock',
                showConfirmButton: false,
                timer: 1000,
                width: "15rem",
            })
        }

        loadCart()
        totalCart()
        loadProducts()
        localStorage.setItem("cart",JSON.stringify(cart))
    }

    function deleteProduct(e) {
        let delet = cart.find(producto => producto.id == e.target.id)
        cart.splice(cart.indexOf(delet),1)


        let stock = productos.find(producto => producto.id == e.target.id)
        stock.stock = parseInt(stock.stock) + parseInt(delet.cantidad)

        loadCart()
        totalCart()
        loadProducts()

        localStorage.setItem("cart",JSON.stringify(cart))
    }

    function loadCart() {
        containerCheck.innerHTML = ""
        
        
        cart.forEach(producto => {
            let div2 = document.createElement("div")
            div2.innerHTML = `<div class="classCart">
                                <div  class="carting">
                                <h1>Producto: ${producto.producto}, Precio: $${producto.precio}</h1>
                                <button class="btnX" id=${producto.id}>X</button>
                                </div>
                                <p>Unidades:${producto.cantidad}</p>
                                </div>`
            containerCheck.append(div2)
        })

        let btnX = document.querySelectorAll(".btnX")
        btnX.forEach(btn => {
            btn.addEventListener("click", (e) => {
                Swal.fire({
                    title: 'Desea eliminar?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteProduct(e)
                    }
                })
            })
        })
    }

    function totalCart() {
        let precios = cart.map(productos => productos.totalPrice)
        let total = 0

        precios.forEach(tt => {
            total = total + tt
        })


        if (cart.length == 0) {
            containerTotal.innerHTML = `No se agrego ningun producto al carrito!`
        } else if (cart.length >= 0) {
            containerTotal.innerHTML = `Total:$${total}`
        }
    }

    function loadDomFilters(date) {
        container.innerHTML = ""

        date.forEach(dt => {
            loadDom(dt)
        })
    }

    function filterProducts() {
        selects.forEach(select => {
            select.addEventListener("change",function() {
                let value = select.options[select.selectedIndex].value

                if (value == "Menor a Mayor") {
                    loadDomFilters(productos.sort((a,b) => a.precio - b.precio))
                } else if (value == "Mayor a Menor") {
                    loadDomFilters(productos.sort((a,b) => b.precio - a.precio))
                } else if (value == "A - Z") {
                    loadDomFilters(productos.sort((a,b) => a.producto.localeCompare(b.producto)))
                } else if (value == "Z - A") {
                    loadDomFilters(productos.sort((a,b) => b.producto.localeCompare(a.producto)))
                }
            })
        })
    }
})

.catch(function(errors) {
    alert(errors)
})