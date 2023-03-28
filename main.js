prediction = "";

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="image_captured" src= "' + data_uri + '"/>'
    });
   
}
console.log("ml5 version : ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LY9R64G8Z/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model is loaded!!!");
   
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data = "The prediction is : " + prediction;
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}

function check(){
    img = document.getElementById("image_captured");
    classifier.classify('img', gotresults);
}

function gotresults(error, results){
    if(error){
        console.log(error);
    }
    else{
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("result_emoji").innerHTML = "👌";
            document.getElementById("quote").innerHTML = "This is looking amazing";
        }
        else if(results[0].label == "Best"){
            document.getElementById("result_emoji").innerHTML = "👍";
            document.getElementById("quote").innerHTML = "All the best";
        }
        else{
            document.getElementById("result_emoji").innerHTML = "✌";
            document.getElementById("quote").innerHTML = "That was a marvelous victory";
        }
    }
}