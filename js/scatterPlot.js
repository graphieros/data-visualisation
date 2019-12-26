function scatterPlots(b, d, c){
  const BUTTON = document.getElementById(b);
  const DATAWRAP = document.getElementById(d);
  const DATASET = 20;
  const FACTORPDT = 100;
  const FACTORTRE = 200;
  const CHART = document.getElementById(c);


  let i;


  BUTTON.addEventListener("click", function(){

    DATAWRAP.innerHTML = "";
    CHART.innerHTML = "";

    let colPdt = [];
    let colTre = [];
    let colRs = [];
    let nSet,
         nPdt,
         nTre,
         nRs;

    //generate colors
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

    let allSets = [];
    let allPdt = [];
    let allTre = [];
    let allRs = [];

    for(i = 0; i < DATASET; i += 1){
      let set = document.createElement("DIV");
      let pdt = document.createElement("DIV");
      let tre = document.createElement("DIV");
      let rs = document.createElement("DIV");
      set.className = "itemTitle";
      set.style.background = `radial-gradient(white, ${colorCollection[i]})`;
      pdt.className = "itemPdt";
      tre.className = "itemTre";
      rs.className = "itemRs";
  
      nSet = `s${[i]}`;
      nPdt = Math.round(Math.random() * FACTORPDT);
      nTre = Math.round(Math.random() * FACTORTRE);
      nRs = Math.round((nPdt / nTre)*1000)/10;

      set.innerHTML = nSet;
      pdt.innerHTML = nPdt;
      tre.innerHTML = nTre;
      rs.innerHTML = nRs;

      DATAWRAP.appendChild(set);
      DATAWRAP.appendChild(pdt);
      DATAWRAP.appendChild(tre);
      DATAWRAP.appendChild(rs);

      allSets.push(set);
      allPdt.push(pdt);
      allTre.push(tre);
      allRs.push(rs);

      colPdt.push(nPdt);
      colTre.push(nTre);
      colRs.push(nRs);
    };

    console.log(colPdt)

    let maxPdt = Math.max(...colPdt);
    let maxTre = Math.max(...colTre);
    let x = 0;
    let y = 0;

    let plotCollection = [];

    for(i = 0; i < DATASET; i += 1){
      let plot = document.createElement("DIV");
      plot.className = "plot";
      x = (colPdt[i] / maxPdt) * 100;
      y = (colTre[i] / maxTre) * 100;
      plot.style.bottom = `${x}%`;
      plot.style.left = `${y}%`;
      plot.style.background = `radial-gradient(white, ${colorCollection[i]})`;
      CHART.appendChild(plot);
      plotCollection.push(plot);
    }

    //events
    for(i = 0; i < plotCollection.length; i += 1){
      let p = plotCollection[i];
      let data = colRs[i];

      p.addEventListener("mouseover", function(){
        p.innerHTML = `${data}%`;
      });

      p.addEventListener("mouseout", function(){
        p.innerHTML = "";
      })
    }

    for(i = 0; i < allSets.length; i += 1){

      let oneSet = allSets[i];
      let onePlot = plotCollection[i];
      let data = colRs[i];
      let onePdt = allPdt[i];
      let oneTre = allTre[i];
      let oneRs = allRs[i];

      oneSet.addEventListener("mouseover", function(){
        onePlot.className = "plotSelect";
        onePlot.innerHTML = `${data}%`;
      });

      oneSet.addEventListener("mouseout", function(){
        onePlot.className = "plot";
        onePlot.innerHTML = "";
      });

      onePlot.addEventListener("mouseover", function(){
       onePdt.style.background = "lightgrey";
       oneTre.style.background = "lightgrey";
       oneRs.style.background = "lightgrey";
      });

      onePlot.addEventListener("mouseout", function(){
        onePdt.style.background = "white";
        oneTre.style.background = "white";
        oneRs.style.background = "white";
      })

    }

  })
}

scatterPlots(
  "btn",
  "dataGeneration",
  "chart"
)