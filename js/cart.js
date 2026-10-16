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
        product.textContent = `${item.name} - ${item.price} € (myyjä: ${item.seller})`

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
    const cart = JSON.parse(localStorage.getItem("ostoskori")) || []
    if (cart.length === 0) return

    const boughtIds = cart.map(function(item) {
        return item.id
    })

    const listings = JSON.parse(localStorage.getItem("ilmoitukset")) || []
    const remaining = listings.filter(function(listing) {
        return !boughtIds.includes(listing.id)
    })

    localStorage.setItem("ilmoitukset", JSON.stringify(remaining))
    localStorage.removeItem("ostoskori")
    naytaOstoskori()
    alert("Kiitos tilauksestasi!")
})

naytaOstoskori()