let kayttajat = JSON.parse(localStorage.getItem("kayttajat")) || []

const yllapitaja = {
    kayttajanimi: "admin",
    salasana: "password123",
    rooli: "yllapitaja"
}
function tallennaKayttajat() {
    localStorage.setItem("kayttajat", JSON.stringify(kayttajat))
}

function rekisteroidy() {

    let kayttajanimi = document.getElementById("kayttajanimi").value
    let salasana = document.getElementById("salasana").value
    
    if (!kayttajanimi.trim() || !salasana.trim()) {
        document.getElementById("error").textContent = "Täytä kentät!"
        document.getElementById("message").textContent = ""
        return
    }

    if (kayttajanimi === yllapitaja.kayttajanimi) {
        document.getElementById("error").textContent = "käyttäjänimi on jo otettu!"
        document.getElementById("message").textContent = ""
        return
    }

    let olemassa = kayttajat.find(function(kayttaja) {
        return kayttaja.kayttajanimi === kayttajanimi
    })

    if (olemassa) {
        document.getElementById("error").textContent = "käyttäjänimi on jo otettu!"
        document.getElementById("message").textContent = ""
        return
    }

    const kayttaja = {
        kayttajanimi: kayttajanimi,
        salasana: salasana,
        rooli: "kayttaja"
    }

    kayttajat.push(kayttaja)

    tallennaKayttajat()

    document.getElementById("message").textContent = "rekisteröinti onnistui!"
    document.getElementById("error").textContent = ""
}

function kirjaudu() {

    let kayttajanimi = document.getElementById("kayttajanimi").value
    let salasana = document.getElementById("salasana").value

    let kirjattuKayttaja = null

    if (kayttajanimi === yllapitaja.kayttajanimi && salasana === yllapitaja.salasana) {
        kirjattuKayttaja = yllapitaja
    }

    else {
        kirjattuKayttaja = kayttajat.find(function(kayttaja) {
        return kayttaja.kayttajanimi === kayttajanimi && kayttaja.salasana === salasana
        })
    }

    if (kirjattuKayttaja) {

        localStorage.setItem("kayttaja", kirjattuKayttaja.kayttajanimi)
        localStorage.setItem("rooli", kirjattuKayttaja.rooli)

        document.getElementById("message").textContent = "kirjautuminen onnistui!"
        document.getElementById("error").textContent = ""

        roolinSivu(kirjattuKayttaja.rooli)
    }

    else {
        document.getElementById("error").textContent = "väärä käyttäjänimi tai salasana."
        document.getElementById("message").textContent = ""
    }
}

function roolinSivu(rooli) {
    // jos luet tätä, ja tahdot tehdä jostain asiasta vain ylläpitäjälle nähtävän, kirjoita class="yllapitajanElementti hidden" osioosi html tiedostossa
    const yllapitajanElementit = document.querySelectorAll(".yllapitajanElementti")

    if (rooli === "yllapitaja") {
        yllapitajanElementit.forEach(function(element) {
            element.classList.remove("hidden")
        })
    }

}

function kirjauduUlos() {
    localStorage.removeItem("kayttaja")
    localStorage.removeItem("rooli")

    const yllapitajanElementit = document.querySelectorAll(".yllapitajanElementti")
    yllapitajanElementit.forEach(function(element) {
        element.classList.add("hidden")
    })

    document.getElementById("message").textContent = "kirjauduttu ulos!"
    document.getElementById("error").textContent = ""
}

const tallennettuRooli = localStorage.getItem("rooli")
if (tallennettuRooli) {
    roolinSivu(tallennettuRooli)
}