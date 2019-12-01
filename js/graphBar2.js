function generateData(b, cY, pY, cR){
  const btn = document.getElementById(b);
  const tableCurrentYear = document.getElementById(cY);
  const tablePreviousYear = document.getElementById(pY);
  const canvas = document.getElementById(cR);
  
  btn.addEventListener("click", function(){

    tableCurrentYear.innerHTML ="";
    tablePreviousYear.innerHTML ="";

    let months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];

    let factor = 10000;
    let random0;
    let random1;
    let i;
    let currentDataSet = [];
    let previousDataSet = [];
    let allValues = [];
    let maxValue;
    let averageC = 0;
    let averageP = 0;
    let sumC = 0;
    let sumP = 0;
    let progression;
    let progressionExpressed;

    function applyGeneration(t, r, s, c){
      for(i = 0; i < months.length; i += 1){
        let P0 = document.createElement("P");
        let P1 = document.createElement("P");
        P0.className = "month";
        P1.className = c;
        r = Math.round(Math.random() * factor);
        if(months[i] === "FEB"){
          r *= 1.5;
        }
        if(months[i] === "MAY"){
          r *=2;
        }
        if(months[i] === "DEC"){
          r *= 5;
        }
        P0.innerHTML = months[i];
        P1.innerHTML = r;
        t.appendChild(P0);
        t.appendChild(P1);
        s.push(r);
        allValues.push(r);
      }
    }

    applyGeneration(tableCurrentYear, random0, currentDataSet, "dataC");
    applyGeneration(tablePreviousYear, random1, previousDataSet, "dataP");
    maxValue = Math.max(...allValues);

    (function getSum(){
      for(i = 0; i < months.length; i += 1){
        sumC += currentDataSet[i];
        sumP += previousDataSet[i];
      }
    }());

    averageC = Math.round(sumC / months.length);
    averageP = Math.round(sumP / months.length);

    progression = Math.round(((averageC / averageP)-1)*1000)/10;
    progressionExpressed = progression + "%";

    let currentCollection = document.getElementsByClassName("dataC");
    let previousCollection = document.getElementsByClassName("dataP");

    for (i = 0; i < currentCollection.length; i += 1){
      if(Number(currentCollection[i].innerHTML) < Number(previousCollection[i].innerHTML)){
        currentCollection[i].style.color = "red";
      }else{
        currentCollection[i].style.color = "green";
      }
    }

    //canvas rendering
    let ctx = canvas.getContext("2d");
    let heightRatio = 0.67;
    canvas.height = canvas.width * heightRatio;

    let dataWidth = (canvas.width) / months.length;

  //display data on the chart

  function draw(input, color, widz) {
    let barWidth = (canvas.width / months.length) - (widz * 2);
    let lessHeight = 0.8;
    let topSpace = 100;
    let start = 0;

    for (i = 0; i < input.length; i += 1) {
      let data = (1 - (input[i]/ maxValue)) * (canvas.height * lessHeight) + topSpace;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(start + widz, data, barWidth, canvas.height);
      ctx.strokeStyle = "white";
      ctx.strokeRect(start + widz, data, barWidth, canvas.height);
      ctx.stroke();
      start += (canvas.width) / months.length;
    }
}

draw(currentDataSet, "rgba(46, 65, 70, 0.5)", 0);
draw(previousDataSet, "rgba(252, 102, 3, 0.5)", 30);

//draw lines for averages
ctx.beginPath();
ctx.lineWidth = 2;
ctx.setLineDash([10, 10]);

let avgLineC = Math.round((1-(averageC / maxValue)) * (canvas.height*0.8)) +20;

ctx.moveTo(0, avgLineC);
ctx.lineTo(canvas.width, avgLineC);
ctx.strokeStyle = "rgba(46, 65, 70, 0.75)";
ctx.stroke();
ctx.font = "30px Courier New";
ctx.fillStyle = "rgb(46,65,70)";
ctx.fillText("Avg. N: " + averageC, canvas.width * 0.87, avgLineC);

ctx.beginPath();
let avgLineP = (1-(averageP / maxValue)) * (canvas.height*0.8) +20;

ctx.moveTo(20,avgLineP);
ctx.lineTo(1980, avgLineP);
ctx.strokeStyle = "rgba(252,102,3, 0.75)";
ctx.stroke();
ctx.font = "30px Courier New";
ctx.fillStyle = "rgb(252, 102, 3)";
ctx.fillText("Avg. N-1: " + averageP, 20, avgLineP);

//display n vs n-1 monthly evolution
let sortedRatios = [];
for (i = 0; i < months.length; i += 1) {
    let ratio = 0;
    if (previousDataSet.length !== 0) {
        ratio = Math.round(((currentDataSet[i] / previousDataSet[i]) - 1) * 1000) / 10;
        sortedRatios.push(ratio);
    } else {
        ratio = 0;
        sortedRatios.push(ratio);
    }
}

//display months names
for (i = 0; i < months.length; i += 1) {
  ctx.font = "50px Courier New";
  ctx.fillStyle = "white";
  ctx.fillText(months[i], dataWidth - 130, 1325);
  dataWidth += (canvas.width) / months.length;
}
  })
}

generateData(
  "generateData",
  "currentYear",
  "previousYear",
  "chartRender"
)



