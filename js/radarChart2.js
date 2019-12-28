function radarChartCanvas(b, d, c, w, sr){
  const BUTTON = document.getElementById(b);
  const DATA = document.getElementById(d);
  let canvas = document.getElementById(c);
  const WRAPPER = document.getElementById(w);
  const SHOW = document.getElementById(sr);
  const FACTOR = 100;

  let i;
  let maxValue;

  BUTTON.addEventListener("click", function(){
    DATA.innerHTML = "";
    WRAPPER.innerHTML = "";
    const DATASET = document.getElementById("inputSet").value;

     //generate colors
     let colorCollection = [];

     (function generateColor(){
       let red = 235;
       let green = 116;
       let blue = 52;
       let move = 80;
       let color;
 
       if(DATASET <= 10){
         move = move;
       }else if(DATASET > 10 && DATASET <= 20){
         move *= 0.5;
       }else if(DATASET > 20 && DATASET <= 40){
         move *= 0.28;
       }else if(DATASET > 30 && DATASET <= 60){
         move *= 0.2;
       }else if(DATASET > 60 && DATASET <= 80){
         move *= 0.1;
       }else if(DATASET > 80 && DATASET <= 120){
         move *= 0.08;
       }else{
         move *= 0.05;
       }
 
       for(i = 0; i < DATASET + 1 ; i += 1){
         color = `rgb(${red},${green},${blue})`;
 
        if(red >= 235 && blue === 52){
          green += move;
          if (green >= 235){
            green = 235;
          }
        }
        
        if(green >= 235 && blue === 52){
          red -= move;
          green = 235;
        }
        
        if(red <= 52 && green >= 235){
          blue += move;
          green = 235;
        }
        
        if(red <= 52 && blue >= 235){
          green -= move;
          blue = 235;
        }
        
        if(green <= 52 && blue >= 235){
          red += move;
          blue = 235;
        }
         colorCollection.push(color);
       }
     }());     
 

    //generate random KPI

    let kpiCollection = [];
    for(i = 0; i < DATASET; i += 1){
      let kpi = Math.round((Math.random() * FACTOR)*10)/10;
      kpiCollection.push(kpi);
    }

    // maxValue = Math.max(...kpiCollection);  
    maxValue = 100;

    let titles = [];
    let values = [];

    //display KPI in DATA area
      for(i = 0; i < kpiCollection.length; i += 1){
        let t = document.createElement("P");
        let p = document.createElement("P");
        t.className = "titleP";
        p.className = "dataP";
        t.innerHTML = `KPI${[i]}`;
        t.style.background = `radial-gradient(white, ${colorCollection[i]})`;
        p.innerHTML = kpiCollection[i];
        DATA.appendChild(t);
        DATA.appendChild(p);
        titles.push(t);
        values.push(p);
      }

    //CANVAS-------
    //draw polygon
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
    let sides = DATASET;
    let Xcenter= 1050;
    let Ycenter = 1050;
    let maxSize = 950;

    let Xapex = [];
    let Yapex = [];

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
        Xapex.push(Xcord);
        Yapex.push(Ycord);
      };
    }
    ctx.strokeStyle = "grey";
    ctx.setLineDash([10, 15]);
    ctx.lineWidth = 3;
    ctx.stroke(); 
    };

    drawPent(150);
    drawPent(350);
    drawPent(550);
    drawPent(750);
    drawPent(maxSize);

    for(i = 0; i <= sides; i += 1){
      ctx.beginPath();
      ctx.moveTo(Xapex[i], Yapex[i]);
      ctx.lineTo(Xcenter, Ycenter);
      ctx.strokeStyle = "grey";
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    //draw KPI on chart based on maxSize * (n / maxSize)
    let colX = [];
    let colY = [];
    (function drawKpi(){
      let Xcord;
      let Ycord;
      let kpiSize;
  
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

      ctx.strokeStyle = "grey";
      ctx.lineCap = "round";
      ctx.setLineDash([]);
      ctx.lineWidth = 10;
      ctx.stroke(); 
    }());

    //draw TEXT on canvas
    // (function drawText(){
    //   let Xcord;
    //   let Ycord;
    //   let kpiSize;

    //   for(i = 0; i <= sides; i += 1){
    //     kpiSize = maxSize * (kpiCollection[i] / maxValue);
    //     Xcord = Xcenter + (kpiSize+40) * Math.cos(i * 2 * Math.PI / sides);
    //     Ycord = Ycenter + (kpiSize+40) * Math.sin(i * 2 * Math.PI / sides);
    //     ctx.font = "50px Courier New";
    //     ctx.fillText(kpiCollection[i], Xcord, Ycord);
    //   }
      
    // }());

    //SVG
    //draw ploygon
    let plots = [];

    (function CreateSVG() {
      let xmlns = "http://www.w3.org/2000/svg";
      let boxWidth = 400;
      let boxHeight = 400;
  
      let svg = document.createElementNS(xmlns, "svg");
      svg.setAttributeNS(null, "viewBox", "0 0 2100 2100");
      svg.setAttributeNS(null, "width", boxWidth);
      svg.setAttributeNS(null, "height", boxHeight);
      svg.setAttribute(null, "fill", "rgb(1,1,1)");
      svg.style.display = "block";
  
      let coords = `M ${colX[0]} ${colY[0]}`;
      for(i = 1; i < DATASET; i += 1){
        coords += `,${colX[i]} ${colY[i]}`;
      }
  
      let path = document.createElementNS(xmlns, "path");
      path.setAttributeNS(null, 'stroke', "transparent");
      path.setAttributeNS(null, 'stroke-width', 1);
      path.setAttributeNS(null, 'stroke-linejoin', "round");
      path.setAttributeNS(null, 'd', coords);
      path.setAttributeNS(null, 'opacity', 0.3);
      path.setAttributeNS(null, "fill", "rgb(1,1,1)");
      svg.appendChild(path);

      for(i = 0; i < DATASET; i += 1){
        let circle = document.createElementNS(xmlns, "circle");
        circle.setAttributeNS(null, 'stroke', "rgb(1,1,1)");
        circle.setAttributeNS(null, "stroke-width", "10");
        circle.setAttributeNS(null, "r", "20");
        circle.setAttributeNS(null, "fill", `${colorCollection[i]}`);
        circle.setAttributeNS(null, "cx", `${colX[i]}`);
        circle.setAttributeNS(null, "cy", `${colY[i]}`);
        svg.appendChild(circle);
        plots.push(circle);
      }
  
      WRAPPER.appendChild(svg);
  }());

    //events
    for(i = 0; i < DATASET; i += 1){
      let onePlot = plots[i];
      let oneTitle = titles[i];
      let oneValue = values[i];
      let oneColor = colorCollection[i];
  
      onePlot.addEventListener("mouseover", function(){
        oneValue.style.background = `radial-gradient(white,${oneColor})`;
        oneValue.style.color = "black";
        SHOW.innerHTML = `${oneTitle.innerHTML}: ${oneValue.innerHTML}`;
        SHOW.style.background = `radial-gradient(white, ${oneColor})`;
      });
      onePlot.addEventListener("mouseout", function(){
        oneValue.style.background = "white";
        oneValue.style.color = "var(--B5)";
        SHOW.innerHTML = "";
        SHOW.style.background = "transparent";
      });
      oneTitle.addEventListener("mouseover", function(){
        onePlot.setAttributeNS(null, "r", "100");
        oneValue.style.background = `radial-gradient(white,${oneColor})`;
        oneValue.style.color = "black";
        SHOW.innerHTML = `${oneTitle.innerHTML}: ${oneValue.innerHTML}`;
        SHOW.style.background = `radial-gradient(white, ${oneColor})`;
      });
      oneTitle.addEventListener("mouseout", function(){
        onePlot.setAttributeNS(null, "r", "20");
        oneValue.style.background = "white";
        oneValue.style.color = "var(--B5)";
        SHOW.innerHTML = "";
        SHOW.style.background = "transparent";
      });
      oneValue.addEventListener("mouseover", function(){
        onePlot.setAttributeNS(null, "r", "100");
        oneValue.style.background = `radial-gradient(white,${oneColor})`;
        oneValue.style.color = "black";
        SHOW.innerHTML = `${oneTitle.innerHTML}: ${oneValue.innerHTML}`;
        SHOW.style.background = `radial-gradient(white, ${oneColor})`;
      });
      oneValue.addEventListener("mouseout", function(){
        onePlot.setAttributeNS(null, "r", "20");
        oneValue.style.background = "white";
        oneValue.style.color = "var(--B5)";
        SHOW.innerHTML = "";
        SHOW.style.background = "transparent";
      })
    }

  });

}

radarChartCanvas(
  "btn",
  "data",
  "canvasChart",
  "svgWrapper",
  "showResults"
);

