var dogCount = 0;
var catCount = 0;
var lionCount = 0;
var cowCount = 0;
var monkeyCount = 0;

function startClassification() {
    document.getElementById("images").src = "";
    document.getElementById("vezes_audio").innerHTML = 'Carregando...';
    document.getElementById("audio_detectado").innerHTML = "";
    dogCount = catCount = lionCount = cowCount = monkeyCount = 0;

    navigator.mediaDevices.getUserMedia({ audio: true })
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/xtGG-pZXT/model.json', modelReady);
}

function modelReady() {
    document.getElementById("vezes_audio").innerHTML = 'Posso ouvir';
    document.getElementById("images").src = "images/ouvir.png";
    classifier.classify(gotResults);
}

function rgba(r, g, b, a = 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {

        if (results[0].label == "Background Noise" || results[0].confidence < 0.80)
            return;


        console.log(results[0]);

        r = Math.floor(Math.random() * 255) + 1;
        g = Math.floor(Math.random() * 255) + 1;
        b = Math.floor(Math.random() * 255) + 1;

        document.getElementById("audio_detectado").innerHTML = 'Som Detectado - ' + results[0].label;
        document.getElementById('audio_detectado').style.color = rgba(r, g, b);


        if (results[0].label == "Latido") {
            document.getElementById("images").src = "images/cachorro.png";
            dogCount++;
        }
        else if (results[0].label == "Miado") {
            document.getElementById("images").src = "images/gato.png";
            catCount++;
        }
        else if (results[0].label == "Rugido") {
            document.getElementById("images").src = "images/leao.png";
            lionCount++;
        }
        else if (results[0].label == "Mugido") {
            document.getElementById("images").src = "images/vaca.png";
            cowCount++;
        }
        else if (results[0].label == "Macaco") {
            document.getElementById("images").src = "images/macaco.png";
            monkeyCount++;
        }

        document.getElementById("vezes_audio").innerHTML = "Cachorro = " + dogCount
            + "<br/> Gato = " + catCount
            + "<br/> Leão = " + lionCount
            + "<br/> Vaca = " + cowCount
            + "<br/> Macaco = " + monkeyCount;
    }

}

