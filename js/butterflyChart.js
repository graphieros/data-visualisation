function generateData(b, dL, dR, cL, cR, cM){
  const BUTTON = document.getElementById(b);
  const DATALEFT = document.getElementById(dL);
  const DATARIGHT = document.getElementById(dR);
  const CHARTLEFT = document.getElementById(cL);
  const CHARTRIGHT = document.getElementById(cR);
  const CHARTMIDDLE = document.getElementById(cM);
  const DATASET = 15;
  const FACTOR = 1000;

  let i;

  BUTTON.addEventListener("click", function(){
    DATALEFT.innerHTML = "";
    DATARIGHT.innerHTML = "";
    CHARTLEFT.innerHTML = "";
    CHARTRIGHT.innerHTML = "";
    CHARTMIDDLE.innerHTML = "";
    let numsLeft = [];
    let numsRight = [];
    let allNums = [];

    let num;
    let maxValue;

    function displayData(container, arrayNums){
      let sum = 0;
      let psum = document.createElement("P");
      psum.className = "sum";

      for(i = 0; i < DATASET; i += 1){
        let p = document.createElement("P");
        num = Math.round(Math.random() * FACTOR);
        p.innerHTML = num;
        p.className = "num";
        container.appendChild(p);
        arrayNums.push(num);
        allNums.push(num);
        sum += num;
      }
      psum.innerHTML = sum;
      container.appendChild(psum);
    }

    displayData(DATALEFT, numsLeft);
    displayData(DATARIGHT, numsRight);

    // chart is a DIV with GRID
    // each histo should have a width set as width = n%
    // with n being the proportion of data to max value * 100
    // also GRID-TEMPLATE-ROWS should depend on the data set

    CHARTLEFT.style.gridTemplateRows = `repeat(${DATASET}, auto)`;
    CHARTRIGHT.style.gridTemplateRows = `repeat(${DATASET}, auto)`;
    CHARTMIDDLE.style.gridTemplateRows = `repeat(${DATASET}, auto)`;
  
   
    maxValue = Math.max(...allNums);

    let butLeft = [];
    let butRight = [];

    //incremental color generator

    let colorCollection = [];

    (function generateColor(){
      let red = 235;
      let green = 116;
      let blue = 52;
      let move = 0;
      let color;

      if(DATASET <= 10){
        move = 40;
      }else if(DATASET > 10 && DATASET <= 20){
        move = 30;
      }else if(DATASET > 20 && DATASET <= 40){
        move = 20;
      }else{
        move = 10;
      }

      for(i = 0; i < DATASET+1 ; i += 1){
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


    function nestButterflies(chart, nums, but, cap, side, color, dir){
      for(i = 0; i < DATASET; i += 1){
        let histo = document.createElement("DIV");
        let caption = document.createElement("DIV");
        histo.className = side;
        caption.className = cap;
        histo.style.width = `${((nums[i]/maxValue)*100)}%`;
        histo.style.background = `linear-gradient(${dir},${color[i]},${color[i+1]})`;
        caption.innerHTML = nums[i];
        histo.appendChild(caption);
        chart.appendChild(histo);
        but.push(histo);
      }
    }

    nestButterflies(CHARTLEFT, numsLeft, butLeft, "captionLeft", "histoLeft", colorCollection, "to left");
    nestButterflies(CHARTRIGHT, numsRight, butRight, "captionRight", "histoRight", colorCollection, "to right");
    
    //display analysis in center row

    for(i = 0; i < DATASET; i += 1){
        let knot = document.createElement("DIV");
        let ratio = Math.round(((numsRight[i] / numsLeft[i])-1) * 100);
        knot.className = "knot";
        knot.innerHTML = `${ratio}%`;
        if(ratio < 0){
          knot.style.color = "red";
        }else{
          knot.style.color = "green";
        }
        CHARTMIDDLE.appendChild(knot);
      }

  })

}

generateData(
  "btn",
  "dataLeft",
  "dataRight",
  "chartLeft",
  "chartRight",
  "chartMiddle"
);