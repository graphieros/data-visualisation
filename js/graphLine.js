function drawSvg(btn, data, svg, graph){
  let processButton = document.getElementById(btn);
  let dataCollection = document.getElementsByClassName(data);
  let arrayRev = [];
  let container = document.getElementById(graph); 
  let i;
  let chart = document.getElementById(svg);
  let max;

 
  for (i = 0; i < dataCollection.length; i += 1){
    let extract = Number(dataCollection[i].innerHTML);
    arrayRev.push(extract);
  }

  max = Math.max(...arrayRev)+0.5;
  //sort months
  //  arrayMonth.sort(function(a,b){
  //   return b - a;
  // });

  processButton.addEventListener("click", function(){
    let space = 38;
    for (i = 0; i < arrayRev.length; i += 1){
      let cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      cir.setAttribute("r", "2");
      cir.setAttribute("fill", "rgb(144, 20, 59)");
      cir.setAttribute("cx", space);
      cir.setAttribute("cy", 100 - ((arrayRev[i]/max)*100));
      chart.appendChild(cir);

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

      path.className = "line-path";
      path.setAttribute("stroke", "black");
      path.setAttribute("d", "M" + space + " " + plot0 + " " + plot1());
      chart.appendChild(path);
      space += 20;
    };    
  })
  console.log(container)
}

drawSvg(
      "btn-process",
      "test-td-data",
      "svg",
      "graph");