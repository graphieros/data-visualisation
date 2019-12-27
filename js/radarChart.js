function radarChart(b, d, c){
  const BUTTON = document.getElementById(b);
  const DATA = document.getElementById(d);
  let canvas = document.getElementById(c);
  const FACTOR = 100;

  let i;
  let maxValue;

  BUTTON.addEventListener("click", function(){
    DATA.innerHTML = "";
    const DATASET = document.getElementById("inputSet").value;
    console.log(DATASET)
    //generate random KPI

    let kpiCollection = [];
    for(i = 0; i < DATASET; i += 1){
      let kpi = Math.round((Math.random() * FACTOR)*10)/10;
      kpiCollection.push(kpi);
    }

    maxValue = Math.max(...kpiCollection);  

      //display KPI in DATA area
      for(i = 0; i < kpiCollection.length; i += 1){
        let t = document.createElement("P");
        let p = document.createElement("P");
        t.className = "titleP";
        p.className = "dataP";
        t.innerHTML = `KPI${[i]}`;
        p.innerHTML = kpiCollection[i];
        DATA.appendChild(t);
        DATA.appendChild(p);
      }

      //draw pentagon
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
    let sides = DATASET;
    let Xcenter= 1050;
    let Ycenter = 1050;
    let maxSize = 950;

    let Xcol = [];
    let Ycol = [];

    function drawPent(hw){
    let size = hw;
    let Xcord;
    let Ycord;

    ctx.beginPath();
    ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

    for(i = 0; i <= sides; i += 1){
      Xcord = Xcenter + size * Math.cos(i * 2 * Math.PI / sides);
      Ycord = Ycenter + size * Math.sin(i * 2 * Math.PI / sides);
      ctx.lineTo(Xcord, Ycord);
      if(size === maxSize){
        Xcol.push(Xcord);
        Ycol.push(Ycord);
      };
    }
    ctx.strokeStyle = "rgb(40, 94, 94)";
    ctx.setLineDash([10, 15]);
    ctx.lineWidth = 3;
    ctx.stroke(); 
    };

    drawPent(150);
    drawPent(350);
    drawPent(550);
    drawPent(750);
    drawPent(maxSize);

    console.log(Xcol[0], Ycol[0]);

    for(i = 0; i <= sides; i += 1){
      ctx.beginPath();
      ctx.moveTo(Xcol[i], Ycol[i]);
      ctx.lineTo(Xcenter, Ycenter);
      ctx.strokeStyle = "rgb(40, 94, 94)";
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    //draw KPI on chart
    // based on maxSize * (n / maxSize)
    
    (function drawKpi(){
      let Xcord;
      let Ycord;
      let kpiSize;
      let colX = [];
      let colY = [];
  
      ctx.beginPath();
      ctx.moveTo(Xcenter + kpiSize * Math.cos(0), Ycenter + kpiSize * Math.sin(0));
  
      for(i = 0; i <= sides; i += 1){
        kpiSize = maxSize * (kpiCollection[i] / maxValue);
        Xcord = Xcenter + kpiSize * Math.cos(i * 2 * Math.PI / sides);
        Ycord = Ycenter + kpiSize * Math.sin(i * 2 * Math.PI / sides);
        ctx.lineTo(Xcord, Ycord);
        colX.push(Xcord);
        colY.push(Ycord);
      }
        ctx.lineTo(colX[0], colY[0]);

      ctx.strokeStyle = "red";
      ctx.lineCap = "round";
      ctx.setLineDash([]);
      ctx.lineWidth = 10;
      ctx.stroke(); 
    }());

    //draw TEXT on canvas
    (function drawText(){
      let Xcord;
      let Ycord;
      let kpiSize;

      for(i = 0; i <= sides; i += 1){
        kpiSize = maxSize * (kpiCollection[i] / maxValue);
        Xcord = Xcenter + (kpiSize+40) * Math.cos(i * 2 * Math.PI / sides);
        Ycord = Ycenter + (kpiSize+40) * Math.sin(i * 2 * Math.PI / sides);
        ctx.font = "50px Courier New";
        ctx.fillText(kpiCollection[i], Xcord, Ycord);
      }
      
    }());

  })

}

radarChart(
  "btn",
  "data",
  "chart"
)
