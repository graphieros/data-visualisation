function sortStoreOutput(btnP, n, m, d, svg0, svg1){
  let btnProcess = document.getElementById(btnP),
    names = document.getElementsByClassName(n),
    months = document.getElementsByClassName(m),
    datas = document.getElementsByClassName(d),
    output0 = document.getElementById(svg0);
    output1 = document.getElementById(svg1);

  let arrayNames = [
    "name0",
    "name1"
  ];    

  let allValues = [];
  let maxValue;

  let obj = {};
  let arrayObj = [];
  let arrayObj0 = [],
       arrayObj1 = [];
  let sortedData0 = [],
       sortedData1 = [];     
  let i;
  let check0 = document.getElementById("checkEtab0"),
       check1 = document.getElementById("checkEtab1");

  // create an object to take all the data from the table and push it in an array of objects
  for (i = 0; i < datas.length; i += 1){
    obj = {
      name: names[i].innerHTML,
      month: Number(months[i].innerHTML),
      data: Number(datas[i].innerHTML)
    }
      arrayObj.push(obj);
      allValues.push(obj.data);
  }

  maxValue = Math.max(...allValues); // to set max height in svg

  // organize the array of objects by sorting the names and months
  function sort(organizedObject){
    organizedObject.sort((a,b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.month > b.month) ? 1: -1) : -1);
  }
  sort(arrayObj);

  // store each sorted object in unique arrays of objects
  // has to be reiterated for every name
  for (i = 0 ; i < arrayObj.length; i += 1){
    if (arrayObj[i].name === arrayNames[0]){
      arrayObj0.push(arrayObj[i]);
    };
    if (arrayObj[i].name === arrayNames[1]){
      arrayObj1.push(arrayObj[i]);
    };
  }

  // retrieve specific data from a given object
  let getData = function (arrObj, arrData){
    let i;
    for(i = 0; i < arrObj.length; i +=1){
      arrData.push(arrObj[i].data);
    }
  }
  getData(arrayObj0, sortedData0);
  getData(arrayObj1, sortedData1);

  // console.log(sortedData0);
  // console.log(sortedData1[0]);

  btnProcess.addEventListener("click", function(){

    let i;
    let space0 = 0,
         space1 = 0;
    let nextMonthIncrement = 33;     
  
    for (i = 0; i < sortedData0.length; i += 1){
      let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", "2");
      circle.setAttribute("fill", "red");
      circle.setAttribute("cx", space0 + nextMonthIncrement);
      circle.setAttribute("cy", 100 - ((sortedData0[i] /maxValue) * 100 - 10));
      output0.appendChild(circle);
      space0 += nextMonthIncrement;

      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      let plot0 = 110 - ((sortedData0[i]/maxValue)*100);
      let plot1 = function p(){
        if (isNaN(sortedData0[i+1])){
          path.setAttribute("stroke", "none");
          return "L" + "0" + " " + "0";
        }else{
          return "L" + (space0 + nextMonthIncrement) + " " + (100 - ((sortedData0[i+1]/maxValue)*100 - 10)) ;
        }
      }
      path.setAttribute("stroke", "rgba(158, 76, 76, 0.788)");
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("d", "M" + space0 + " " + plot0 + " " + plot1());
      output0.appendChild(path);
    }
  
    for (i = 0; i < sortedData1.length; i += 1){
      let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", "2");
      circle.setAttribute("fill", "blue");
      circle.setAttribute("cx", space1 + nextMonthIncrement);
      circle.setAttribute("cy", 100 - ((sortedData1[i] /maxValue) * 100 - 10));
      output1.appendChild(circle);
      space1 += nextMonthIncrement;

      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      let plot0 = 110 - ((sortedData1[i]/maxValue)*100);
      let plot1 = function p(){
        if (isNaN(sortedData1[i+1])){
          path.setAttribute("stroke", "none");
          return "L" + "0" + " " + "0";
        }else{
          return "L" + (space1 + nextMonthIncrement) + " " + (100 - ((sortedData1[i+1]/maxValue)*100 - 10)) ;
        }
      }

      path.setAttribute("stroke", "rgba(76, 114, 158, 0.788)");
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("d", "M" + space1 + " " + plot0 + " " + plot1());
      output1.appendChild(path);
    }
  })

}

sortStoreOutput(
  "processButton",
  "tdName",
  "tdMonth",
  "tdData",
  "svg0",
  "svg1" 
);

function selectView(chk, svgTog){
  let check = document.getElementById(chk);
  let svgToggle = document.getElementById(svgTog);

  check.addEventListener("click", function(){
    if (check.checked === true){
      svgToggle.style.opacity = 1;
    }else{
      svgToggle.style.opacity = 0;
    }
  });
}


selectView("checkEtab0","svg0");
selectView("checkEtab1", "svg1");