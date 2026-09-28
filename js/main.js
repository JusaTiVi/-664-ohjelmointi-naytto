const addButton = document.getElementById("lisaa-tuote")
const loginMessage = document.getElementById("login-message")
const listingForm = document.getElementById("listing-form")
const listingsContainer = document.getElementById("listings")

function naytaIlmoitukset() {
    const listings = JSON.parse(localStorage.getItem("ilmoitukset")) || []
    const currentUser = localStorage.getItem("kayttaja")

    listingsContainer.replaceChildren()

    listings.forEach(function(listing, index) {
        const item = document.createElement("p")
        item.textContent = `${listing.name} - ${listing.price} € (myyjä: ${listing.seller})`

        if (currentUser === listing.seller) {
            const removeButton = document.createElement("button")
            removeButton.type = "button"
            removeButton.textContent = "Poista ilmoitus"

            removeButton.addEventListener("click", function() {
                const latestListings = JSON.parse(localStorage.getItem("ilmoitukset")) || []

                if (localStorage.getItem("kayttaja") !== latestListings[index]?.seller) {
                    return
                }

                latestListings.splice(index, 1)
                localStorage.setItem("ilmoitukset", JSON.stringify(latestListings))
                naytaIlmoitukset()
            })

            item.append(" ", removeButton)
        }

        listingsContainer.appendChild(item)
    })
}
addButton.addEventListener("click", function() {
    if (!localStorage.getItem("kayttaja")) {
        loginMessage.hidden = false
        listingForm.hidden = true
        return
    }

    loginMessage.hidden = true
    listingForm.hidden = !listingForm.hidden
    addButton.textContent = listingForm.hidden
        ? "Lisää ilmoitus"
        : "Piilota lomake"
})

listingForm.addEventListener("submit", function(event) {
    event.preventDefault()

    const seller = localStorage.getItem("kayttaja")

    if (!seller) {
        loginMessage.hidden = false
        listingForm.hidden = true
        return
    }

    const listings = JSON.parse(localStorage.getItem("ilmoitukset")) || []

    listings.push({
        name: document.getElementById("listing-name").value.trim(),
        price: document.getElementById("listing-price").value,
        seller: seller
    })

    localStorage.setItem("ilmoitukset", JSON.stringify(listings))
    listingForm.reset()
    naytaIlmoitukset()
})

naytaIlmoitukset()