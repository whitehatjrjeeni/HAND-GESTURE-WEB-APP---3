Webcam.set({
    width:350,
    height:350,
    Image_format:'png',
    png_quality:90
}   
);
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot()
{
Webcam.snap(function (data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'"/>';
}
);}
console.log("ml5 version",ml5.version);
classifer=ml5.imageClassifer('https://teachablemachine.withgoogle.com/models/5eJLRCnrh/' ,modeloaded);
function modeloaded(){
console.log("modeloaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="the first prediction is"+prediction_1;
    speak_data_2="and the second prediction is"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById("captured_image");
    classifer.Classify(img ,got_result);  
}

function got_result(error,result){
  if(error){
      console.error(error);
  }  
  else{
      console.log(result);
      document.getElementById("result_emotion_name").innerHTML=result[0].label;
      document.getElementById("result_emotion_name_2").innerHTML=result[1].label;

      prediction_1=result[0].label;
      prediction_2=result[1].label;

      speak();
      if(result[0].label=="happy"){
          document.getElementById("update_emoji").innerHTML="&#9996;";
      }
      if(result[0].label=="sad"){
          document.getElementById("update_emoji").innerHTML="&#128076";
      }
      if(result[0].label=="angry"){
        document.getElementById("update_emoji").innerHTML="&#128077;";
      }


        if(result[1].label=="happy"){
            document.getElementById("update_emoji_2").innerHTML="&#9996;";
        }
        if(result[1].label=="sad"){
            document.getElementById("update_emoji_2").innerHTML="&#128076";
        }
        if(result[1].label=="angry"){
          document.getElementById("update_emoji_2").innerHTML="&#128077;";
      }
  }
}