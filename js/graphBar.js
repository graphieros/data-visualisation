//takes data from table, sorts by rev and displays a bar chart
function chartBar(x, y, a, prop, out, btn, cl, gr, btnT, gr2){
  let arrayRev = document.getElementsByClassName(x);
  let arrayName = document.getElementsByClassName(y);
  let arraymonth = document.getElementsByClassName(a);
  let output = document.getElementById(out);
  let button = document.getElementById(btn);
  let clear = document.getElementById(cl);

  let buttonTotal = document.getElementById(btnT);
  let graph2 = document.getElementById(gr2);

  let i;
  let extract;
  let months;
  let names;

  let arrayData = [];
  let arrayNames = [];
  let arraymonths = [];
  let arrayPairs = [];
  let dataPack = {}; //my first object
  let graph = document.getElementById(gr);
  let proportion = prop;

  let etab0 = "Etab. 0";
  let etab1 = "Etab. 1";
  let etab2 = "Etab. 2";

  let etab0_arr =[];
  let etab1_arr =[];
  let etab2_arr =[];

  let etab0_tot;
  let etab1_tot;
  let etab2_tot;

  let etab0_name;
  let etab1_name;
  let etab2_name;

//fill an array with objects containing name and data
//this loop serves for both sorting and totalizing purposes later endeavoured
  for (i = 0; i < arrayRev.length; i += 1){
    extract = Number(arrayRev[i].innerHTML);
    arrayData.push(extract);
    months = Number(arraymonth[i].innerHTML);
    arraymonths.push(months);
    names = arrayName[i].innerHTML;
    arrayNames.push(names);
    dataPack = {
      name: arrayNames[i],
      month: arraymonths[i],
      data: arrayData[i]
    };
    arrayPairs.push(dataPack); //nicely organized in one place
    // console.log(arrayPairs)

    //grab sums for each Etab
    //below works for one, we need a function
    if(dataPack.name === etab0){
      etab0_arr.push(dataPack.data);
      etab0_tot = etab0_arr.reduce((x,y) => x + y);
      etab0_name = dataPack.name;
    }
    if(dataPack.name === etab1){
      etab1_arr.push(dataPack.data);
      etab1_tot = etab1_arr.reduce((x,y) => x + y);
      etab1_name = dataPack.name;
    }
    if(dataPack.name === etab2){
      etab2_arr.push(dataPack.data);
      etab2_tot = etab2_arr.reduce((x,y) => x + y);
      etab2_name = dataPack.name;
    }
  }

  //sort tha array of objects
  arrayPairs.sort(function(a,b){
    return a.data - b.data;
  });

  let maxData = Math.max(...arrayData);

  // console.log(arrayData);

  button.addEventListener("click", function() {
    for (i = 0; i < arrayPairs.length; i += 1){
      let tr = document.createElement("TR");
      let td0 = document.createElement("TD");
      let td1 = document.createElement("TD");
      let td2 = document.createElement("TD");
      let table = document.createElement("TABLE");
      let graphElement = document.createElement("DIV");
      let parag = document.createElement("P");
      td0.innerHTML = arrayPairs[i].name;
      td1.innerHTML = arrayPairs[i].data;
      td2.innerHTML = arrayPairs[i].month;
      tr.appendChild(td0);
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.className = "table-result";
      table.appendChild(tr);
      table.style.margin = "0 auto";

      output.appendChild(table);

      graphElement.className = "graph-div";
      graphElement.style.height = arrayPairs[i].data / maxData * proportion + "px";
      graphElement.style.width = (arrayPairs.length / 90) * 100  +"vw";
      graphElement.innerHTML = arrayPairs[i].data;

      parag.innerHTML = arrayPairs[i].name;
      parag.className = "graph-div-p";

      graph.style.width = arrayPairs.length * 50 + "px";
      graph.style.height = "200px";

      graphElement.appendChild(parag);
      graph.appendChild(graphElement);

      button.style.display = "none";
      clear.style.opacity = 1;
      graph.style.opacity = 1;
    }
  });

  clear.addEventListener("click", function() {
    output.innerHTML = "";
    graph.innerHTML = "";
    graph.style.opacity = 0;
    button.style.display = "initial";
    clear.style.opacity = 0;
  }); 

  //Event for totals
  buttonTotal.addEventListener("click", function(){
    let tr0 = document.createElement("TR");
    let tr1 = document.createElement("TR");
    let tr2= document.createElement("TR");
    let td0_0 = document.createElement("TD");
    let td0_1 = document.createElement("TD");
    let td1_0 = document.createElement("TD");
    let td1_1 = document.createElement("TD");
    let td2_0 = document.createElement("TD");
    let td2_1 = document.createElement("TD");
    let table = document.createElement("TABLE");
    td0_0.innerHTML = etab0_name;
    td0_1.innerHTML = etab0_tot;
    td1_0.innerHTML = etab1_name;
    td1_1.innerHTML = etab1_tot;
    td2_0.innerHTML = etab2_name;
    td2_1.innerHTML = etab2_tot;
    tr0.appendChild(td0_0);
    tr0.appendChild(td0_1);
    tr1.appendChild(td1_0);
    tr1.appendChild(td1_1);
    tr2.appendChild(td2_0);
    tr2.appendChild(td2_1);
    table.appendChild(tr0);
    table.appendChild(tr1);
    table.appendChild(tr2);
    graph2.appendChild(table);
  })

}

chartBar("test-td-data",
       "test-td-name",
       "test-td-month",
       150,
       "sort-rev-res",
       "sort-rev",
       "btn-clear-data",
       "graph",
       "get-total",
       "graph2");

