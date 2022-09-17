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


fetch("./js/data.json")
.then(response => response.json())
.then(productos => {
    
    window.addEventListener("load", localRestore)
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
