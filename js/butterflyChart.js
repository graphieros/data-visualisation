function generateData(b, dL, dR, cL, cR, cM){
  const BUTTON = document.getElementById(b);
  const DATALEFT = document.getElementById(dL);
  const DATARIGHT = document.getElementById(dR);
  const CHARTLEFT = document.getElementById(cL);
  const CHARTRIGHT = document.getElementById(cR);
  const CHARTMIDDLE = document.getElementById(cM);
  const DATASET = 6;
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

    //commented out below is a function to generate random set of colors for each dataset

    // let color = function(){
    //   let red = Math.random() * 255;
    //   let green = Math.random() * 255;
    //   let blue = Math.random() * 255;
    //   return `${red},${green},${blue}`;
    // };

    // let arrayColors = [];

    // for(i = 0; i < DATASET; i += 1){
    //   arrayColors.push(`rgb(${color()})`);
    // }

    function nestButterflies(chart, nums, but, cap, side){
      for(i = 0; i < DATASET; i += 1){
        let histo = document.createElement("DIV");
        let caption = document.createElement("DIV");
        histo.className = side;
        caption.className = cap;
        histo.style.width = `${((nums[i]/maxValue)*100)}%`;
        caption.innerHTML = nums[i];
        histo.appendChild(caption);
        chart.appendChild(histo);
        but.push(histo);
      }
    }

    nestButterflies(CHARTLEFT, numsLeft, butLeft, "captionLeft", "histoLeft");
    nestButterflies(CHARTRIGHT, numsRight, butRight, "captionRight", "histoRight");
    
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