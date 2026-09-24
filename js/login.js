let kayttajat = JSON.parse(localStorage.getItem("kayttajat")) || []

function tallennaKayttajat() {
    localStorage.setItem("kayttajat", JSON.stringify(kayttajat))
}

function rekisteroidy() {

    let kayttajanimi = document.getElementById("kayttajanimi").value
    let salasana = document.getElementById("salasana").value

    let olemassa = kayttajat.find(function(kayttaja) {
        return kayttaja.kayttajanimi === kayttajanimi
    })

    if (olemassa) {
        document.getElementById("error").textContent = "käyttäjänimi on jo otettu!"
        return
    }

    const kayttaja = {
        kayttajanimi: kayttajanimi,
        salasana: salasana
    }

    kayttajat.push(kayttaja)

    tallennaKayttajat()

    document.getElementById("message").textContent = "rekisteröinti onnistui!"
}

function kirjaudu() {

    let kayttajanimi = document.getElementById("kayttajanimi").value
    let salasana = document.getElementById("salasana").value

    let kayttaja = kayttajat.find(function(kayttaja) {
        return kayttaja.kayttajanimi === kayttajanimi &&
            kayttaja.salasana === salasana
    })

    if (kayttaja) {

        localStorage.setItem("kayttaja", kayttajanimi)

        document.getElementById("message").textContent = "kirjautuminen onnistui!"
        document.getElementById("error").textContent = ""
    }
    else {

        document.getElementById("error").textContent = "väärä käyttäjänimi tai salasana."
        document.getElementById("message").textContent = ""
    }
    

}
