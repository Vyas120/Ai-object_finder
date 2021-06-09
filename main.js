status = "";
object = "";
objects = [];

function setup(){
    canvas = createCanvas(400,400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    cocossd = ml5.objectDetector("cocossd",modelloaded)
}

function modelloaded(){
    console.log("modelloaded")
    status = true
}

function start(){
    object = document.getElementById("texty").value
    cocossd.detect(video,gotresult)
}

function gotresult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        objects = results
    }
}

function draw(){
    image(video,0,0,400,400)
    if(status!=""){
        fill("red")
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML= "Objects detected";
            
            fill("red")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(object==objects[i].label){
                document.getElementById("num_ob").innerHTML= object+" found"
                video.stop()
                cocossd.detect(video,gotresult)        
            }
            else{
                document.getElementById("num_ob").innerHTML= object+" not found"        
            }
        }
    }
}
