function generateData(b, d, c, l){
  const BUTTON = document.getElementById(b);
  const DATAWRAP = document.getElementById(d);
  const CHART = document.getElementById(c);
  const LEGEND = document.getElementById(l);
  const DATASET = 12;
  const FACTOR = 1000;

  let i;

  BUTTON.addEventListener("click", function(){
    DATAWRAP.innerHTML = "";
    CHART.innerHTML = "";
    LEGEND.innerHTML = "";
    let nums = [];
    let psum = document.createElement("P");
    psum.className = "sum";
    let num;
    let sum = 0;
    let maxValue;

    for(i = 0; i < DATASET; i += 1){
      let p = document.createElement("P");
      let num = Math.round(Math.random() * FACTOR);
      p.innerHTML = num;
      p.className = "num";
      DATAWRAP.appendChild(p);
      nums.push(num);
      sum += num;
    }
    psum.innerHTML = sum;
    DATAWRAP.appendChild(psum);

    // chart is a DIV with GRID
    // each histo should have a height set as height = n%
    // with n being the proportion of data to max value * 100
    // also GRID-TEMPLATE-COLUMNS should depend on the data set

    CHART.style.gridTemplateColumns = `repeat(${DATASET}, 1fr)`;
    LEGEND.style.gridTemplateColumns = `repeat(${DATASET}, 1fr)`;
   
    maxValue = Math.max(...nums);

    let histoCollection = [];

    for(i = 0; i < DATASET; i += 1){
      let histo = document.createElement("DIV");
      histo.className = "histo";
      histo.style.height = ((nums[i]/maxValue)*100)+"%";
      CHART.appendChild(histo);
      histoCollection.push(histo);
    }

    for(i = 0; i < DATASET; i += 1){
      let legend = document.createElement("DIV");
      legend.innerHTML = `M${[i]}`;
      LEGEND.appendChild(legend);
    }
    
    //events on histograms
    for(i = 0; i < histoCollection.length; i += 1){
      let hoveredHisto = histoCollection[i];
      let numOnHisto = nums[i];
      let div = document.createElement("DIV");

      histoCollection[i].addEventListener("mouseover", function(){
        div.className = "dataOnHisto";
        div.innerHTML = numOnHisto;
        hoveredHisto.appendChild(div);
      });
      histoCollection[i].addEventListener("mouseout", function(){
        div.className = "dataOutHisto";
      })
    }

  })

}

generateData(
  "btn",
  "generatedData",
  "chart",
  "legend"
);