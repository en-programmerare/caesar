const alfabetet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "å", "ä", "ö"];
const ALFABETET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Å", "Ä", "Ö"]
let ord;
//lyssnare
document.getElementById("chifferUI").addEventListener("click", chifferUI);
document.getElementById("tillbaka").addEventListener("click", tillbakaChiffer);
document.getElementById("tillbakares").addEventListener("click", tillbakaRes);
document.getElementById("chiffreraKnapp").addEventListener("click", chiffreraUI);
document.getElementById("knackUI").addEventListener("click", knackUI);
document.getElementById("tillbakaK").addEventListener("click", tillbakaKnack);
document.getElementById("knackKnapp").addEventListener("click", knackdetUI);

//språkdata
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // när det är redo
       ord = JSON.parse(xhttp.responseText).ord;
    }
};
xhttp.open("GET", "https://raw.githubusercontent.com/en-programmerare/caesar/master/ordlista.json", true);
xhttp.send();

//chiffrera
function chiffrera(text, nyckel) {
    let bokstaver = text.split("");
    let svar = [];
    for(let bokstav of bokstaver) {
        if(alfabetet.includes(bokstav)) {
            if(alfabetet.indexOf(bokstav) + nyckel < alfabetet.length && alfabetet.indexOf(bokstav) + nyckel > -1) {
                svar.push(alfabetet[alfabetet.indexOf(bokstav) + nyckel]);
                //console.log(bokstav);
            } else if(alfabetet.indexOf(bokstav) + nyckel > alfabetet.length - 1) {
                svar.push(alfabetet[(alfabetet.indexOf(bokstav) + nyckel) - (alfabetet.length)]);
                //console.log("Överslag " + bokstav);
            } else if(alfabetet.indexOf(bokstav) + nyckel < 0) {
                svar.push(alfabetet[(alfabetet.length) + (alfabetet.indexOf(bokstav) + nyckel)]);
                //console.log("Underslag " + bokstav);
            } else
                console.error("Bokstaven " + bokstav + " kunde inte tas hand om av en hanterare med försök till index " + alfabetet.indexOf(bokstav) + nyckel > -1);
        } else if(ALFABETET.includes(bokstav)) {
            if(ALFABETET.indexOf(bokstav) + nyckel < ALFABETET.length && ALFABETET.indexOf(bokstav) + nyckel > -1) {
                svar.push(ALFABETET[ALFABETET.indexOf(bokstav) + nyckel]);
                //console.log(bokstav);
            } else if(ALFABETET.indexOf(bokstav) + nyckel > ALFABETET.length - 1) {
                svar.push(ALFABETET[(ALFABETET.indexOf(bokstav) + nyckel) - (ALFABETET.length)]);
                //console.log("Stort överslag " + bokstav);
            } else if(ALFABETET.indexOf(bokstav) + nyckel < 0) {
                svar.push(ALFABETET[(ALFABETET.length) + (ALFABETET.indexOf(bokstav) + nyckel)]);
                //console.log("Stort underslag " + bokstav);
            } else
                console.error("Bokstaven " + bokstav + " kunde inte tas hand om av en hanterare med försök till index " + alfabetet.indexOf(bokstav) + nyckel > -1);
        } else
            svar.push(bokstav);
    }
    return svar.join("");
}

function knack(text) {
    console.time("Knäcka chiffret");
    let nyckel = -29;
    let test = "";
    let poang = 0;
    let bastNyckel = 0;
    let bastText = "Tyvärr kunde inte texten knäckas. Ju längre text, desto bättre blir knäckaren.<br><br>&nbsp;";
    let bastPoang = 0;
    while(nyckel != 29) {
        poang = 0;
        test = chiffrera(text, nyckel);
        for(let o of ord) {
            let reg = new RegExp(" " + o + " ", "g");
            if(test.match(reg) === null)
                continue;
            poang += test.match(reg).length;
        }
        if(poang > bastPoang) {
            bastPoang = poang;
            bastText = test;
            bastNyckel = nyckel;
        }
        nyckel++;
    }
    let trv = {
        nyckel: 0,
        meddelande: ""
    };
    
    trv.nyckel = bastNyckel;
    trv.meddelande = bastText;
    console.timeEnd("Knäcka chiffret");
    if(trv.nyckel === 0 && trv.meddelande === "Tyvärr kunde inte texten knäckas. Ju längre text, desto bättre blir knäckaren.<br><br>&nbsp;") {
        console.warn("Texten kunde inte knäckas.");
    }
    return trv;
}

//Grafik chiffreringsprocess
function chiffreraUI() {
    let nyckel = Math.floor(Math.random() * 25) + 1;
    if(Number(document.getElementById("nyckel").value) !== 0) {
        nyckel = Number(document.getElementById("nyckel").value);
    }
    document.getElementById("resultat").innerHTML = "Nyckel: " + nyckel + "<br>" + chiffrera(document.getElementById("meddelande").value, nyckel);
    setTimeout(res, 1000);
    document.getElementById("chiffrera").style.animation = "forsvinn 1s ease-in";
}

//Grafisk knäckprocess
function knackdetUI() {
    let respons = knack(document.getElementById("text").value);
    document.getElementById("resultat").innerHTML = "Nyckel: " + respons.nyckel + "<br>" + respons.meddelande;
    setTimeout(res, 1000);
    document.getElementById("chiffrera").style.animation = "forsvinn 1s ease-in";
}

//Nedan endast animationer
function chifferUI() {
    setTimeout(chifferUI2, 1000);
    document.getElementById("val").style.animation = "forsvinn 1s ease-in";
}
function chifferUI2() {
    document.getElementById("val").style.animation = "none";
    document.getElementById("val").style.display = "none";
    document.getElementById("chiffrera").style.display = "block";
    document.getElementById("chiffrera").style.animation = "dykupp 1s ease-out";
}

function tillbakaChiffer() {
    setTimeout(tillbaka, 1000);
    document.getElementById("chiffrera").style.animation = "forsvinn 1s ease-in";
}
function tillbakaRes() {
    setTimeout(tillbaka, 1000);
    document.getElementById("resultatRuta").style.animation = "forsvinn 1s ease-in";
}
function tillbakaKnack() {
    setTimeout(tillbaka, 1000);
    document.getElementById("knack").style.animation = "forsvinn 1s ease-in";
}
function tillbaka() {
    document.getElementById("chiffrera").style.animation = "none";
    document.getElementById("chiffrera").style.display = "none";
    document.getElementById("resultatRuta").style.animation = "none";
    document.getElementById("resultatRuta").style.display = "none";
    document.getElementById("knack").style.animation = "none";
    document.getElementById("knack").style.display = "none";
    document.getElementById("val").style.display = "block";
    document.getElementById("val").style.animation = "dykupp 1s ease-out";
}

function res() {
    document.getElementById("chiffrera").style.animation = "none";
    document.getElementById("chiffrera").style.display = "none";
    document.getElementById("knack").style.animation = "none";
    document.getElementById("knack").style.display = "none";
    document.getElementById("resultatRuta").style.display = "block";
    document.getElementById("resultatRuta").style.animation = "dykupp 1s ease-out";
}

function knackUI() {
    setTimeout(knackUI2, 1000);
    document.getElementById("val").style.animation = "forsvinn 1s ease-in";
}

function knackUI2() {
    document.getElementById("val").style.animation = "none";
    document.getElementById("val").style.display = "none";
    document.getElementById("knack").style.display = "block";
    document.getElementById("knack").style.animation = "dykupp 1s ease-out";
}

window.onscroll = function() {
    console.log(document.documentElement.scrollTop);
}