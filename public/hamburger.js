document.getElementById('eddigihamburgereim').onclick = hamburgerekLista;

async function hamburgeerekLista() {
    const response = await fetch("/hamburgerek");
    const hamburgerek = await response.json();

    var hamburgerHTML = "<h1>Az eddigi hamburgerek listája:</h1>";
    hamburgerHTML += `<table id="hamburgertabla"><tr><th>Név</th><th>Telefonszám</th><th>Cím</th><th>Fajta</th></tr>`;
    for (const egyHamburger of hamburgerek) {
        hamburgerHTML += `<tr><td>${egyHamburger.nev}</td><td>${egyHamburger.telefonszam}</td><td>${egyHamburger.cim}</td><td>${egyHamburger.fajta}</td>
        <td class=>${sorClass}</td></tr>`;
    }
    hamburgerHTML += `</table>`;

    document.getElementById("hamburgermut").innerHTML = hamburgerHTML;
}

document.getElementById("hamburgerform").onsubmit = async function (event) {
    event.preventDefault();
    const nev = event.target.elements.nev.value;
    const telefonszam = event.target.elements.telefonszam.value;
    const cim = event.target.elements.cim.value;
    const fajta = event.target.elements.fajta.value;


    const res = await fetch("/hamburgerek", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            nev,
            telefonszam,
            cim,
            fajta
        }),
    });

    if (res.ok) {
        hamburgerekLista();
    } else {
        alert("Server error");
    }
};