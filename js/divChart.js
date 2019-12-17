 function getData(b, d, c){
  let button = document.getElementById(b);
  let div = document.getElementById(d);
  let chart = document.getElementById(c);

  button.addEventListener("click", function(){
    div.innerHTML ="";
    let i;
    let set = 12;
    let chartWidth = chart.offsetWidth;
    let chartHeight = chart.offsetHeight;
    let arrayObj = [];

    //generate random data and display it on the left DIV
    for(i = 0; i < set; i += 1){
      let obj = {};
      let dataName = document.createElement("P");
      dataName.className = "dataName";
      let data = document.createElement("P");
      data.className = "dataSet";
      dataName.innerHTML = "data" + " " + [i] + ":";
      data.innerHTML = Math.round((Math.random() * 1000) * 100) / 100;
      div.appendChild(dataName);
      div.appendChild(data);
      obj.name = dataName.innerHTML;
      obj.data = Number(data.innerHTML);
      arrayObj.push(obj);
    }

    let collection = document.getElementsByClassName("dataSet");
    let allData = [];

    for (i = 0; i < collection.length; i += 1){
      allData.push(Number(collection[i].innerHTML));
    }

    // get max value to manage histogram max height
    let maxValue;
    maxValue = Math.max(...allData);
    let plotCollection = [];
    let setInterval = 0;

    //create histograms and append them to the chart DIV
    chart.innerHTML ="";
    for(i = 0; i < allData.length; i +=1){
      let plot = document.createElement("DIV");
      let top =  chartHeight * (1 - (allData[i] / maxValue));
      let height = chartHeight * (allData[i] / maxValue);
      let width = (chartWidth / allData.length) -10;
      let interval = chartWidth / allData.length;
      plot.className = "plot";
      plot.style.marginTop = top + "px";
      plot.style.height = height + "px";
      plot.style.width = width + "px";
      plot.style.marginLeft = setInterval + "px";
      chart.appendChild(plot);
      setInterval += interval;
      plotCollection.push(plot);
      };

    //Create events to display data on each histogram on hover  
    let barCollection = document.getElementsByClassName("plot");
    for(i = 0; i < barCollection.length; i +=1){
      let num = allData[i]
      barCollection[i].addEventListener("mouseover", function(){
        let dataP = document.createElement("DIV");
        dataP.className = "insideData";
        dataP.innerHTML = num;
        this.appendChild(dataP);
      });
      barCollection[i].addEventListener("mouseout", function(){
        this.innerHTML ="";
      })
    }

   });
 }

 getData("btn", "dataWrapper", "chart");