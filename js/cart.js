const cartContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkout = document.getElementById("checkout")

function naytaOstoskori() {
    const cart = JSON.parse(localStorage.getItem("ostoskori")) || []
    cartContainer.replaceChildren()

    if (cart.length === 0) {
        cartContainer.textContent = "ostoskori tyhjä!"
        cartTotal.textContent = "Yhteensä: 0 €"
        return
    }

    let total = 0

    cart.forEach(function(item, index) {
        const product = document.createElement("p")
        product.textContent = `${item.name} - ${item.price} € (myyjä: ${item.seller}`

        const removeButton = document.createElement("button")
        removeButton.textContent = "poista"

        removeButton.addEventListener("click", function() {
            cart.splice(index, 1)
            localStorage.setItem("ostoskori", JSON.stringify(cart))
            naytaOstoskori()
        })

        product.append(removeButton)
        cartContainer.appendChild(product)

        total += Number(item.price)
    })

    cartTotal.innerHTML = `Yhteensä: ${total} €`
}

checkout.addEventListener("click", function() {
    localStorage.removeItem("ostoskori")
    naytaOstoskori()
    alert("Kiitos tilauksestasi!")
})

naytaOstoskori()