var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
setInterval(drawClock, 1000);

function drawClock() {
 drawFace(ctx, radius);
 drawNumbers(ctx, radius);
 drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
 //var grad;
 ctx.beginPath();
 ctx.arc(0,0,radius,0,2*Math.PI);
 ctx.fillStyle = "#CD0000"; //tile color
 ctx.fill();
 //grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
 //grad.addColorStop(0, '#333');
 //grad.addColorStop(0.5, 'white');
 //grad.addColorStop(1, '#333');
 //ctx.strokeStyle = grad;
 //ctx.lineWidth = radius*0.1;
 //ctx.stroke();
 //ctx.beginPath();
 //ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
 //ctx.fillStyle = "white";
 //ctx.fill();
}

function drawNumbers(ctx, radius) {
 var ang;
 var num;
 ctx.font = "bold " + radius*0.25 + "px Century";
 ctx.textBaseline="middle";
 ctx.textAlign="center";
 for(num = 1; num < 13; num++){
  ang = num * Math.PI / 6;
  ctx.rotate(ang);
  ctx.translate(0, -radius*0.9);
  ctx.rotate(-ang);
  ctx.fillStyle="white"
  ctx.fillText(num.toString(), 0, 0);
  ctx.rotate(ang);
  ctx.translate(0, radius*0.9);
  ctx.rotate(-ang);
 }
}

function drawTime(ctx, radius) {
 var now = new Date();
 var hour = now.getHours();
 var minute = now.getMinutes();
 var second = now.getSeconds();
 // second
 second=(second*Math.PI/30);
 drawHand(ctx, second, radius*0.8, radius*0.02, radius);
 // hour
 hour=hour%12;
 hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
 drawHand(ctx, hour, radius*0.5, radius*0.07, radius);
 // minute
 minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
 drawHand(ctx, minute, radius*0.7, radius*0.07, radius);
}

function drawHand(ctx, pos, length, width, radius) {
 ctx.beginPath();
 ctx.lineWidth = width;
 ctx.lineCap = "round";
 ctx.moveTo(0,0);
 ctx.rotate(pos);
 ctx.lineTo(0, -length);
 if (length == radius*0.8) {
  ctx.strokeStyle = "#333333";
 } else {
  ctx.strokeStyle = "white";
 }
 ctx.stroke();
 ctx.rotate(-pos);
}

