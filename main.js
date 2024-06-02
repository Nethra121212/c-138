function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Hall : Detecting Object";
}

img="";
hall = "";
objects = [];
function modelLoaded()
{
  console.log("model loaded");
  hall = true;
  objectDetector.detect(video,gotResult);
}

function gotResult(error,results)
{
    if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(results);
            objects = results;
        }
}


function preload()
{
    img = loadImage('c-139-1.jpg');
}

function draw()
{
    image(video,0,0,380,380);
    if(hall!="")
        {
            r=random(255);
            g=random(255);
            b=random(255);
            objectDetector.detect(video,gotResult); 
            for (i = 0; i < objects.length; i++)

                {
                
                document.getElementById("hall").innerHTML = "Hall: Object Detected";
                document.getElementById("number_of_objects").innerHTML = "number of objects detectected are: "+objects.length;
                 fill(r,g,b);
                
                percent = floor(objects[i].confidence*100);
                
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                
                noFill();
                
                stroke(r,g,b);
                
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                
                }
                  
        }
    
}