function svgChart(b, d, l, s){
  const BUTTON = document.getElementById(b);
  const DATA = document.getElementById(d);
  const UL = document.getElementById(l);
  const SVG = document.getElementById(s);
  const DATASET = 24;
  const FACTOR = 10000;

  BUTTON.addEventListener("click", function(){
    let dataArray = [];
    let maxValue;
    let minValue;
    let sum = 0;
    let average;
    let i;
    let allLi = [];

    //generate random data to be displayed on the data section
    UL.innerHTML ="";
    for (i = 0; i < DATASET; i += 1){
      let li = document.createElement("LI");
      li.className = "dataLi";
      let num = Math.round(Math.random() * FACTOR);
      li.innerHTML = num;
      UL.appendChild(li);
      dataArray.push(num);
      allLi.push(li);
    };

    maxValue = Math.max(...dataArray);
    minValue = Math.min(...dataArray);

    for (i = 0; i < dataArray.length; i += 1){
      sum += dataArray[i];
    }

    average = Math.round(sum / dataArray.length);

    //draw SVG
    let circleArray = [];
    let space = 0;

    let length = SVG.clientWidth;
    let height = SVG.clientHeight;
    let interval = length / DATASET;
  
    SVG.innerHTML = "";
    for(i = 0; i < dataArray.length; i += 1){
      let limes = document.createElementNS("http://www.w3.org/2000/svg", "path");
      let cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      limes.setAttribute("stroke", "rgb(195, 219, 213)");
      limes.setAttribute("stroke-width", "1");

      cir.setAttribute("r", "2");
      cir.setAttribute("fill", "rgb(69, 86, 95)");

      let plot0 = height * (1 - ((dataArray[i]/maxValue)));
      let plot1 = function(){
        if (isNaN(dataArray[i+1])){
          path.setAttribute("stroke", "none");
          return "L" + "0" + " " + "0";
        }else{
          if(dataArray[i+1] === maxValue){
            return "L" + " " + (space + interval) + " " + height * (1 - ((dataArray[i+1]/maxValue)));
          }else if(dataArray[i+1] === minValue){
            return "L" + " " + (space + interval) + " " + (-2 + height);
          }else{
            return "L" + " " + (space + interval) + " " + height * (1 - ((dataArray[i+1]/maxValue)));
          }
        }
      }

      path.setAttribute("stroke", "rgb(100, 139, 130)");
      path.setAttribute("stroke-width", "1.5");

      if(dataArray[i] === maxValue){
        if(space === 0){
          path.setAttribute("d", "M" + (2 + space) + " " + ( 4 + plot0) + " " + plot1());
        }else{
          path.setAttribute("d", "M" + space + " " + ( 2 + plot0) + " " + plot1());
        }
        
      }else if(dataArray[i] === minValue){
        if(space === 0){
          path.setAttribute("d", "M" + (2 + space) + " " + (-2 + height )+ " " + plot1());
        }else{
          path.setAttribute("d", "M" + space + " " + (-2 + height )+ " " + plot1());
        }
        
      }else{
        if(space === 0){
          path.setAttribute("d", "M" + (2 + space) + " " + plot0 + " " + plot1());
        }else{
          path.setAttribute("d", "M" + space + " " + plot0 + " " + plot1());
        }
      }
      SVG.appendChild(path);

      if(space === 0){
        cir.setAttribute("cx", 2 + space);
      }else{
        cir.setAttribute("cx", space);
      }
      if(dataArray[i] === maxValue){
        cir.setAttribute("cy", 2 + plot0);
      }else if(dataArray[i] === minValue){
        cir.setAttribute("cy", -2 + height);
      }else{
        cir.setAttribute("cy", plot0);
      }
      SVG.appendChild(cir);
      circleArray.push(cir);
      space += interval;
    }

    for(i = 0; i < DATASET; i += 1){
      let circle = circleArray[i];
      allLi[i].addEventListener("mouseover", function(){
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", "blue");
      });
      allLi[i].addEventListener("mouseout", function(){
        circle.setAttribute("r", 2);
        circle.setAttribute("fill", "rgb(69, 86, 95)")
      })
    }

    for(i = 0; i < DATASET; i += 1){
      let fig = allLi[i];
      let circle = circleArray[i];
      circleArray[i].addEventListener("mouseover", function(){
        fig.style.opacity = 1;
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", "blue");
      });
      circleArray[i].addEventListener("mouseout", function(){
        fig.style.opacity = 0.3;
        circle.setAttribute("r", 2);
        circle.setAttribute("fill", "rgb(69, 86, 95)")
      })
    }

  });
}

svgChart(
  "btn",
  "data",
  "list",
  "svg"
  );

 