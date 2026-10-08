const addButton = document.getElementById("lisaa-tuote")
const loginMessage = document.getElementById("login-message")
const listingForm = document.getElementById("listing-form")
const listingsContainer = document.getElementById("listings")
const filterForm = document.getElementById("filter-form")

function naytaIlmoitukset() {
    const listings = JSON.parse(localStorage.getItem("ilmoitukset")) || []
    const currentUser = localStorage.getItem("kayttaja")
    const currentRole = localStorage.getItem("rooli")

    const nameQuery = document.getElementById("filter-name").value.trim().toLowerCase()
    const categoryFilter = document.getElementById("filter-category").value
    const minPrice = document.getElementById("filter-min-price").value
    const maxPrice = document.getElementById("filter-max-price").value

    listingsContainer.replaceChildren()

    listings.forEach(function(listing, index) {

        if (!listing.hyvaksytty && currentRole !== "yllapitaja" && currentUser !== listing.seller) {
            return
        }

        if (nameQuery && !listing.name.toLowerCase().includes(nameQuery)) return
        if (categoryFilter && listing.category !== categoryFilter) return
        if (minPrice !== "" && Number(listing.price) < Number(minPrice)) return
        if (maxPrice !== "" && Number(listing.price) > Number(maxPrice)) return

        const item = document.createElement("p")
        const details = document.createElement("span")
details.textContent =
    `${listing.name} - ${listing.price} € (myyjä: ${listing.seller})\n` +
    `Kategoria: ${listing.category || "Ei kategoriaa"}\n` +
    (listing.description || "")
item.appendChild(details)

        if (currentRole === "yllapitaja" && !listing.hyvaksytty) {
            const status = document.createElement("span")
            status.textContent = " - odottaa hyväksyntää"
            item.appendChild(status)

            const approveButton = document.createElement("button")
            approveButton.type = "button"
            approveButton.textContent = "hyväksy"

            approveButton.addEventListener("click", function() {
                const latestListings = JSON.parse(localStorage.getItem("ilmoitukset")) || []

                if (latestListings[index]) {
                    latestListings[index].hyvaksytty = true
                    localStorage.setItem("ilmoitukset", JSON.stringify(latestListings))
                    naytaIlmoitukset()
                }
            })

            item.appendChild(approveButton)
        }

        if (currentUser === listing.seller || currentRole === "yllapitaja") {
            const removeButton = document.createElement("button")
            removeButton.type = "button"
            removeButton.textContent = "Poista ilmoitus"

            removeButton.addEventListener("click", function() {
                const latestListings = JSON.parse(localStorage.getItem("ilmoitukset")) || []
                const activeRole = localStorage.getItem("rooli")

                if (localStorage.getItem("kayttaja") !== latestListings[index]?.seller && activeRole !== "yllapitaja") {
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
    const currentRole = localStorage.getItem("rooli")

    if (!seller) {
        loginMessage.hidden = false
        listingForm.hidden = true
        return
    }

    const listings = JSON.parse(localStorage.getItem("ilmoitukset")) || []

    listings.push({
        name: document.getElementById("listing-name").value.trim(),
        price: document.getElementById("listing-price").value,
        category: document.getElementById("listing-category").value,
        description: document.getElementById("listing-description").value.trim(),
        seller: seller,
        hyvaksytty: currentRole === "yllapitaja"
    })

    localStorage.setItem("ilmoitukset", JSON.stringify(listings))
    listingForm.reset()
    naytaIlmoitukset()
})

filterForm.addEventListener("input", naytaIlmoitukset)

filterForm.addEventListener("reset", function() {
    setTimeout(naytaIlmoitukset)
})

naytaIlmoitukset()