var canvas;
var ctx;

function reset(){
  canvas = $('canvas');
  ctx = canvas[0].getContext('2d');
  ctx.fillStyle='#444';
  ctx.strokeStyle='#444';
  ctx.translate(0.5, 0.5);
}

$(document).ready(function() {
  canvas = $('canvas');
  ctx = canvas[0].getContext('2d');
  ctx.fillStyle='#444';
  ctx.strokeStyle='#444';
  ctx.translate(0.5, 0.5);

  var points = [];
  var cycle = 2000;
  var reset = false;

  var canvasW = canvas.width();
  var canvasH = canvas.height();

  var maxX = canvasW - 50;
  var maxY = canvasH - 50;
  var min = 10;
  var minT = -100;
  var maxT = 50;

  function dot(){
    var x = Math.floor(Math.random() * (maxX - min + 1)) + min;
    var y = Math.floor(Math.random() * (maxY - min + 1)) + min;
    var transx = Math.floor(Math.random() * (maxT - minT + 1)) + minT;
    var transy = Math.floor(Math.random() * (maxT - minT + 1)) + minT;

    points.push([x, y, transx, transy]);
  }

  var iter = 0;

  function draw(){
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();

    $.each(points, function(i){
      var transx = (this[2] / cycle) * iter;
      var transy = (this[3] / cycle) * iter;
      if (reset == true){
        this[0] = this[0] + this[2];
        this[1] = this[1] + this[3];

        this[2] = Math.floor(Math.random() * (maxT - minT + 1)) + minT;
        this[3] = Math.floor(Math.random() * (maxT - minT + 1)) + minT;

        var x = this[0] + transx;
        var y = this[1] + transy;

      }else{
        var x = this[0] + transx;
        var y = this[1] + transy;
      }

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
      ctx.fill();

      if (i > 4){
        var newX = points[0][0] + (points[0][2] / cycle) * iter;
        var newY = points[0][1] + (points[0][3] / cycle) * iter;

        var newX = points[0][0] + (points[0][2] / cycle) * iter;
        var newY = points[0][1] + (points[0][3] / cycle) * iter;
      }else{
        var newX = points[(i + 1)][0] + (points[(i + 1)][2] / cycle) * iter;
        var newY = points[(i + 1)][1] + (points[(i + 1)][3] / cycle) * iter;

        var newerX = points[(i + 2)][0] + (points[(i + 2)][2] / cycle) * iter;
        var newerY = points[(i + 2)][1] + (points[(i + 2)][3] / cycle) * iter;

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(newerX, newerY);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(newX, newY);
      ctx.stroke();

    });

  }

  var i = 0;
  while(i < 7){
    dot();
    ++i;
  }


  setInterval(function(){
    draw();
    ++iter;

    if(iter > cycle){
      reset = true;
      iter = 0;
    }else{
      reset = false;
    }
  }, 2.5);

});
