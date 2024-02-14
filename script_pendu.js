
document.addEventListener('DOMContentLoaded', start())

function start() {

    // ------------ PROGRAMME PRINCIPAL ----------------
    // 1- Initialisation des variables
    var compteur = 0;
    var trouve = 0;
    var nbTrouve = 0;
    var totalTrouve = 0;
    var mot = ChoixDuMot();
    var nbLettreMot = mot.length;
    var lettreTrouve = [];
    var tAffichage = [];
    var tLettres = [];
    var tLettresSaisies = [];

    //Création du tableau affichage
    for (let i=0; i < mot.length; i++) { 
        tAffichage[i] = "-";// mot vide ------
    }
    document.querySelector('span.mot').textContent = tAffichage.join("");

console.log("ma fonction start ok");
console. log(mot)

    document.querySelector('span.trouve').textContent = totalTrouve;
    document.querySelector('span.nbLettres').textContent = nbLettreMot;

    document.getElementById("input_saisie").focus();
    document.addEventListener("keyup", function(touche) {
        if (touche.code === 'Enter') {             
            var lettre = SaisieLettre(tLettresSaisies);
            //console.log(lettre);
            if (lettre !== "") tLettresSaisies.push(lettre);
            
            nbTrouve = VerifLettre(lettre, mot, nbTrouve);
            totalTrouve += nbTrouve;
            if (nbTrouve == 0) {
                compteur++;
            }
            
            var majMot = MajDuMot(lettre, mot, tAffichage);
            AffichageMot(majMot);
            AffichageScore(compteur, totalTrouve, nbLettreMot, tLettresSaisies, majMot);
            
            // document.querySelector('input_saisie').value = "";
            document.getElementsByName("input_saisie")[0].value = "";

            PartieFinie(compteur, totalTrouve, nbLettreMot, mot)
        }
    })
} 

    // ------------- FONCTIONS ---------------

    function ChoixDuMot() {
        // recupérer les mot du dico.txt pour les mettre dans un tableau tDico
        var dico = ["maison", "papa", "maman", "moto", "ballon", "voiture", "village", "ordinateur", "console", "famille", "travail", "sport", 
        "football", "automobile", "avion", "remorque", "carrelage", "bouteille", "plante"];

        
        var mot = dico[Math.trunc(Math.random() * dico.length)];

        return mot;
    }

    function SaisieLettre(tLettresSaisies) { // Renvoi un "" si rien saisi
        var bDejaSaisie = true;
        var nbLettres = tLettresSaisies.length;

//console.log("saisie lettre OK")
        if (nbLettres == 0) {
            //var lettre = prompt("Saisissez une lettre");           
            var lettre = document.getElementById("input_saisie").value;
            return lettre;
        } else {
            while (bDejaSaisie === true) {
                if (lettre == "") {
                    break
                } else {
                    //var lettre = prompt("Saisissez une lettre");
                    var lettre = document.getElementById("input_saisie").value;
                    for (let i=0; i < nbLettres; i++){ 
                        if (tLettresSaisies[i] == lettre) {
                            console.log("vous avez déja saisis cette lettre")
                            bDejaSaisie = true;
                            document.getElementsByName("input_saisie")[0].value = "";
                            break // SORT DU IF
                        } else {
                            bDejaSaisie = false;
                        }
                    } 
                }
            }
        }
        return lettre;
    }

    function VerifLettre(lettre, mot) { 
        var nbLettreTrouve = 0;      

        for (let i=0; i < mot.length; i++) {
            if (mot[i] == lettre) nbLettreTrouve++        
        }
        return nbLettreTrouve;
    }


    function MajDuMot(lettre, mot, tAffichage) {
        for (let i=0; i < mot.length; i++) { 
            if (mot[i] == lettre) {
                tAffichage[i] = lettre;
            } 
        }
        return tAffichage;
    }

    function AffichageMot(motMisAJour) {
        console.log("->>> " + motMisAJour.join("") + " <<<-");
    }

    function AffichageScore(compteur, totalTrouve, nbLettreMot, tLettresSaisies, motMisAJour) {
        document.querySelector('span.mot').textContent = motMisAJour.join("");

        console.log("Vous avez saisis les lettres : " + tLettresSaisies);
        document.querySelector('span.lettreSaisie').textContent = tLettresSaisies;

        console.log("Vous avez fait " + compteur + " erreur sur 10");
        document.querySelector('span.erreur').textContent = compteur;

        console.log("Vous avez trouvé " + totalTrouve + " lettres / " + nbLettreMot);
        document.querySelector('span.trouve').textContent = totalTrouve;
        document.querySelector('span.nbLettres').textContent = nbLettreMot;

        document.querySelector('span.chance').textContent = (10 - compteur);

        var img = document.getElementById("image_pendu");

        switch (compteur) {
            case 0 : img.setAttribute("src", "images/pendu0.png")
            break;
            case 1 : img.setAttribute("src", "images/pendu1.png")
            break;
            case 2 : img.setAttribute("src", "images/pendu2.png")
            break;
            case 3 : img.setAttribute("src", "images/pendu3.png")
            break;
            case 4 : img.setAttribute("src", "images/pendu4.png")
            break;
            case 5 : img.setAttribute("src", "images/pendu5.png")
            break;
            case 6 : img.setAttribute("src", "images/pendu6.png")
            break;
            case 7 : img.setAttribute("src", "images/pendu7.png")
            break;
            case 8 : img.setAttribute("src", "images/pendu8.png")
            break;
            case 9 : img.setAttribute("src", "images/pendu9.png")
            break;
            case 10 : img.setAttribute("src", "images/pendu10.png")
            break;
        }
        
        
    }


    function PartieFinie(compteur, totalTrouve, nbLettreMot, mot) {
        var bContinue = true;

        if (compteur == 10) {
            console.log("GAME OVER")
            document.getElementById("zoneSaisie").remove();
            document.getElementById("boutonFin").insertAdjacentHTML("beforeend", "<button class='boutonRestart' onClick='window.location.reload();'>PERDU, cliquez ici pour recommencer</button>")
            document.querySelector('span.info').textContent = "Le mot était ";
            document.querySelector('span.infoMot').textContent = mot;
        } else if (totalTrouve == nbLettreMot) {
            console.log("Bravo ! Vous avez gagné");
            document.getElementById("zoneSaisie").remove();
            document.getElementById("boutonFin").insertAdjacentHTML("beforeend", "<button class='boutonRestart' onClick='window.location.reload();'>BRAVO, cliquez ici pour recommencer</button>")
            //document.querySelector('span.info').textContent = "vous avez trouvé toute les lettres";
        } else {
            console.log("PARTIE PAS FINIE")
            return bContinue;
        }

        // if (GagnePerdu == 1) {
        //     console.log("Bravo ! Vous avez gagné");
        //     document.querySelector('span.info').textContent = "BRAVO, vous avez trouvé toute les lettres";
        // } else {
        //     console.log("GAME OVER");
        // }
        // console.log("Merci d'avoir joué, vous pouvez relancer une partie en cliquant sur 'Pendu'")

    }
