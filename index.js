const express = require('express');
const path = require('path');

const fs = require('fs');
const port = 4444;

const app = express();


app.get("/", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/index.html"));
})


app.get("/kinezet.css", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/kinezet.css"));
})       

app.get("/hamburgerek", (req, res) =>{
    res.sendFile( path.join(__dirname, "./data/hamburgerek.json"));
})         
        
app.get("/hamburger.js", (req, res) =>{
    res.sendFile( path.join(__dirname, "./public/hamburger.js"));
}) 
       
app.post("/hamburgerek", (req, res) =>{
    let adatom = '';
    req.on('data', (chunk) => {
        adatom += chunk.toString();
    });
    req.on('end', () => {
        const ujHamburger = JSON.parse(adatom);



        fs.readFile('./data/hamburgerek.json', (err, data) => {
            let adatok = JSON.parse(data);
            adatok.push({
                "nev": ujHamburger.nev,
                "telefonszam": ujHamburger.telefonszam,
                "cim": ujHamburger.cim,
                "fajta": ujHamburger.fajta,
            });
            fs.writeFile('./data/hamburgerek.json', JSON.stringify(adatok), () => {
                res.end(JSON.stringify(adatok));
            })
        })
    })
})

       
            

app.get("/", (req, res) => {
    res.redirect("/");
})           

app.listen(port);


