function drawSvg(btn, clear, data, svg, graph){
  let processButton = document.getElementById(btn);
  let clearButton = document.getElementById(clear);
  let dataCollection = document.getElementsByClassName(data);
  let arrayRev = [];
  let container = document.getElementById(graph); 
  let i;
  let chart = document.getElementById(svg);
  let max;

 //if monthly data is gathered unorderedly from the server, an object should be created to store sorted data, name, etc
 //this snippet is based on already ordered data 
  
  for (i = 0; i < dataCollection.length; i += 1){
    let extract = Number(dataCollection[i].innerHTML);
    arrayRev.push(extract);
  }

  max = Math.max(...arrayRev)+0.5;

  processButton.addEventListener("click", function(){
    chart.style.display="initial";
    let space = 38;
    for (i = 0; i < arrayRev.length; i += 1){
      let cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      cir.setAttribute("r", "2");
      cir.setAttribute("fill", "rgb(69, 86, 95)");
      cir.setAttribute("cx", space);
      cir.setAttribute("cy", 100 - ((arrayRev[i]/max)*100));
      chart.appendChild(cir);

      let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("fill", "black");
      text.setAttribute("y", 100 - ((arrayRev[i]/max)*100 +10));
      text.setAttribute("x", space-10);
      text.setAttribute("font-size", "7");
      text.innerHTML = (arrayRev[i]);
      chart.appendChild(text);

      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      let plot0 = 100 - ((arrayRev[i]/max)*100);
      let plot1 = function p(){
        if (isNaN(arrayRev[i+1])){
          path.setAttribute("stroke", "none");
          return "L" + "0" + " " + "0";
        }else{
          return "L" + (space +20) + " " + (100 - ((arrayRev[i+1]/max)*100)) ;
        }
      }

      path.setAttribute("stroke", "rgba(69, 86, 95,0.5)");
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("d", "M" + space + " " + plot0 + " " + plot1());
      chart.appendChild(path);
      space += 20;
    };    
  })

  clearButton.addEventListener("click", function(){
    chart.innerHTML="";
    chart.style.display="none";
  })

}

drawSvg(
      "btn-process",
      "btn-clear",
      "test-td-data",
      "svg",
      "graph");
