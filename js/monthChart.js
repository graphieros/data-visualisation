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

    let k = (canvas.width - 52) / months.length;
    canvas.height = canvas.width * heightRatio;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(20, 1230);
    ctx.lineTo(1980, 1230);
    ctx.strokeStyle = "rgb(10,10,10)";
    ctx.stroke();


    //draw lines for averages and display figures on the lines
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    let avgLineC = Math.round((1-(averageC / maxValue)) * (canvas.height*0.8)) +20;
    ctx.moveTo(20, avgLineC);
    ctx.lineTo(1980, avgLineC);
    ctx.strokeStyle = "rgba(46, 65, 70, 0.75)";
    ctx.stroke();
    ctx.font = "30px Arial";
    ctx.fillStyle = "rgb(46,65,70)";
    ctx.fillText("Avg. N: " + averageC, 1790, avgLineC);

    ctx.beginPath();
    let avgLineP = (1-(averageP / maxValue)) * (canvas.height*0.8) +20;
    ctx.moveTo(20,avgLineP);
    ctx.lineTo(1980, avgLineP);
    ctx.strokeStyle = "rgba(252,102,3, 0.75)";
    ctx.stroke();
    ctx.font = "30px Arial";
    ctx.fillStyle = "rgb(252, 102, 3)";
    ctx.fillText("Avg. N-1: " + averageP, 20, avgLineP);


    for (i = k; i < 2000; i += 1) {
      ctx.setLineDash([0,0]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(i + 20, 20);
      ctx.lineTo(i + 20, 1230);
      ctx.strokeStyle = "rgba(100,100,100,0.5)";
      ctx.stroke();
      i += k;
  }

  //display months names
  for (i = 0; i < months.length; i += 1) {
      ctx.font = "50px Arial";
      ctx.fillStyle = "rgb(150,150,150)";
      ctx.fillText(months[i], k - 100, 1300);
      k += (canvas.width - 70) / months.length;
  }

  //display data on the chart

  function draw(input, color) {
    let k2 = (canvas.width) / months.length;
    let adjust = 50;
    let lessHeight = 0.8;
    let topSpace = 20;

    for (i = 0; i < input.length; i += 1) {
        let h = (1 - (input[i]/ maxValue)) * (canvas.height * lessHeight) + topSpace;
        let h2;
        if (input[i + 1] !== undefined) {
            h2 = (1 - (input[i + 1] / maxValue)) * (canvas.height * lessHeight) + topSpace;
            ctx.beginPath();
            ctx.arc(k2 - adjust, h, 8, 0, 2 * Math.PI);
            ctx.lineWidth = 5;
            ctx.strokeStyle = color;
            ctx.moveTo(k2 - adjust, h);
            ctx.lineTo(k2 - adjust + ((canvas.width - adjust) / months.length), h2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.stroke();
            k2 += (canvas.width - adjust) / months.length;
        } else {
            h2 = 0;
            ctx.beginPath();
            ctx.arc(k2 - adjust, h, 8, 0, 2 * Math.PI);
            ctx.lineWidth = 5;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.fill();
            ctx.stroke();
            k2 += (canvas.width - adjust) / months.length;
        }
    }
}

draw(currentDataSet, "rgb(46, 65, 70)");
draw(previousDataSet, "rgb(252,102,3)");



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

let k3 = (canvas.width) / months.length;
for (i = 0; i < months.length; i += 1) {
    ctx.font = "30px Arial";
    if (sortedRatios[i] < 0) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "green";
    }
    ctx.fillText(sortedRatios[i] + "%", k3 - 100, 1200);
    k3 += (canvas.width - 40) / months.length;
}

ctx.font = "50px Arial";
if(progression < 0){
  ctx.fillStyle ="red";
}else{
  ctx.fillStyle = "green";
}
ctx.fillText("Progression N vs N-1: " + progressionExpressed, 40, 40);

  })
}

generateData(
  "generateData",
  "currentYear",
  "previousYear",
  "chartRender"
)
