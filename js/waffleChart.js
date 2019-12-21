 function waffleChart(b, d, ds0, ds1, ds2, l0, l1, l2, s, p, c, ln0, ln1, ln2){
  const BUTTON = document.getElementById(b);
  const DATA = document.getElementById(d);
  const DATASET0 = document.getElementById(ds0);
  const DATASET1 = document.getElementById(ds1);
  const DATASET2 = document.getElementById(ds2);
  const UL0 = document.getElementById(l0);
  const UL1 = document.getElementById(l1);
  const UL2 = document.getElementById(l2);
  const SUMS = document.getElementById(s);
  const PIECES = document.getElementsByClassName(p);
  const CHART = document.getElementById(c);
  const LINE0 = document.getElementById(ln0);
  const LINE1 = document.getElementById(ln1);
  const LINE2 = document.getElementById(ln2);
  const DATACOL0 = 12;
  const DATACOL1 = 12;
  const DATACOL2 = 12;
  const FACTOR = 1000;

  let ctx0 = LINE0.getContext("2d");
  let ctx1 = LINE1.getContext("2d");
  let ctx2 = LINE2.getContext("2d");

  BUTTON.addEventListener("click", function(){

    UL0.innerHTML = "";
    UL1.innerHTML = "";
    UL2.innerHTML = "";
    SUMS.innerHTML = "";


    // generate series of random numbers and display in DATA section
    function generate(x, y, clr, clas){
      let i;
      let num;
      let li;
      let div;
      let arrayData = [];
      let sum = 0;

      for(i = 0; i < x; i += 1){
        li = document.createElement("DIV");
        li.className = clas;
        num = Math.round(Math.random() * FACTOR);
        li.innerHTML = num;
        arrayData.push(num);
        y.appendChild(li);
      }

      for(i = 0; i < arrayData.length; i += 1){
        sum += arrayData[i];
      }

      div = document.createElement("DIV");
      div.className = "gotSum";
      div.innerHTML = sum;
      div.style.color = clr;
      SUMS.appendChild(div);
    }

    generate(DATACOL0, UL0, "var(--B0)", "set0");
    generate(DATACOL1, UL1, "var(--P0)", "set1");
    generate(DATACOL2, UL2, "var(--G0)", "set2");


    //canvas
    let arrayUnits0 = document.getElementsByClassName("set0");
    let arrayUnits1 = document.getElementsByClassName("set1");
    let arrayUnits2 = document.getElementsByClassName("set2");
    let allValues = [];
    let maxValue;

    function push(x){
      for(i = 0; i < x.length; i +=1){
        allValues.push(Number(x[i].innerHTML));
      }
    }

    push(arrayUnits0);
    push(arrayUnits1);
    push(arrayUnits2);

    maxValue = Math.max(...allValues);
   
    function buildCanvas(col, dat, can, x, color){
      let width = can.width / col;
      let start = 80;
      x.clearRect(0, 0, can.width, can.height);

      for(i = 0; i < dat.length; i += 1){
        let h = ((1 - Number(dat[i].innerHTML) / maxValue) * can.height);
        let h2;

        x.beginPath();
        x.moveTo(start, 0);
        x.lineTo(start, 600);
        x.strokeStyle ="rgb(200,200,200)";
        x.lineWidth = 5;
        x.stroke();

        if(dat[i + 1] !== undefined){
          h2 = (1 - Number(dat[i+1].innerHTML) / maxValue) * can.height;
          x.beginPath();
          x.arc(start, h, 10, 0, 2 * Math.PI);
          x.lineWidth = 10;
          x.strokeStyle = color;
          x.moveTo(start, h);
          x.lineTo(start + width, h2);
          x.fillStyle = color;
          x.fill();
          x.stroke();
          start += width;
        }else{
          h2 = 0;
          x.beginPath();
          x.arc(start, h, 10, 0, 2 * Math.PI);
          x.lineWidth = 10;
          x.strokeStyle = color;
          x.fillStyle = color;
          x.fill;
          x.stroke();
          start += width;
        }
      }
    }

    buildCanvas(DATACOL0, arrayUnits0, LINE0, ctx0, "rgb(41, 144, 148)");
    buildCanvas(DATACOL1, arrayUnits1, LINE1, ctx1, "rgb(207, 109, 28)");
    buildCanvas(DATACOL2, arrayUnits2, LINE2, ctx2, "rgb(150,150,150)");

    //get the sum of sums and display in DATA section
    (function sumOfSums(){
      let arraySums = document.getElementsByClassName("gotSum");
      let sumDiv = document.getElementById("sumOfSums");
      let totalSum = 0;
      for(i = 0; i < arraySums.length; i += 1){
        totalSum += Number(arraySums[i].innerHTML);
      }
      sumDiv.innerHTML = "";
      sumDiv.innerHTML = totalSum;
    }());
    
    //get proportion of each sum to total Sum
    let arraySums = document.getElementsByClassName("gotSum");
    let totalSum = document.getElementById("sumOfSums");
    function proportion(a){
      return Number(a.innerHTML) / Number(totalSum.innerHTML);
    };

    let prop0 = Math.round((proportion(arraySums[0])) * 100);
    let prop1 = Math.round((proportion(arraySums[1])) * 100);
    let prop2 = Math.round((proportion(arraySums[2])) * 100);

    console.log(prop0, prop1, prop2);

    //display proportion in legend
    let legend0 = document.getElementById("legend0");
    let legend1 = document.getElementById("legend1");
    let legend2 = document.getElementById("legend2");

    let canvasLegend0 = document.getElementById("canvasLegend0");
    let canvasLegend1 = document.getElementById("canvasLegend1");
    let canvasLegend2 = document.getElementById("canvasLegend2");

    legend0.innerHTML = prop0 + "%";
    legend1.innerHTML = prop1 + "%";
    legend2.innerHTML = prop2 + "%";

    canvasLegend0.innerHTML = prop0 + "%";
    canvasLegend1.innerHTML = prop1 + "%";
    canvasLegend2.innerHTML = prop2 + "%";

    if(prop0 + prop1 + prop2 !== 100){
      prop2 = 100 - prop0 + prop1;
    }
    
    //display result in waffle chart

    for(i = 0; i < PIECES.length; i += 1){
      let piece = PIECES[i];
      piece.style.background = "white";
    }

    for(i = 0; i < prop0; i += 1){
      let piece = PIECES[i];
      piece.style.background = "linear-gradient(to right bottom, var(--B0), var(--B1)";
    }

    for(i = 0; i < prop1; i +=1){
      let piece = PIECES[i + prop0];
      piece.style.background = "linear-gradient(to right bottom, var(--P0), var(--P1)";
    }

    for(i = 0; i < prop2; i += 1){
      let piece = PIECES[i + prop0 + prop1];
      piece.style.background = "linear-gradient(to right bottom, var(--G0), var(--G1)";
    }

  });

 }

 waffleChart(
   "btn",
   "data",
   "dataSet0",
   "dataSet1",
   "dataSet2",
   "ul0",
   "ul1",
   "ul2",
   "sums",
   "pieces",
   "chart",
   "line0",
   "line1",
   "line2"
 );