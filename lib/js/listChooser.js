"use strict";
{
  const listIndex = "https://gael-58.github.io/gaelsRollerThingo/data/0000ListIndex.json";
  //const listIndex = "../data/0000ListIndex.json";
  const roller =
    "https://gael-58.github.io/gaelsRollerThingo/lib/js/ArrayRollLib.js";

  const divListChooser = document.createElement("div");
  const listsDataList = document.createElement("select");
  const divButtons = document.createElement("div");
  const divContent = document.createElement("div");
  divContent.id = "divContent";
  divButtons.id = "divButtons";
  document.body.appendChild(divButtons);
  document.body.appendChild(divContent);
  //const listsDataListInput = document.createElement("input");
  listsDataList.id = "listOfLists";
  //listsDataListInput.setAttribute("list", "listOfLists");
  //listsDataListInput.name = "listOflists";

  divListChooser.appendChild(listsDataList);
  //divListChooser.appendChild(listsDataListInput);
  //listsDataListInput.appendChild(listsDataList);
    //listsDataListInput.multiple = true;
    listsDataList.multiple = true;
  //listsDataListInput.addEventListener("input", async (e) => {
  listsDataList.addEventListener("input", async (e) => {
    let value = e.target.value;
    //let a = Array.from(e.target).filter(option => option.selected).map(option=>option.value);
    
    if (value != null && value != "") {
        let fullList = [];
        for(let array of Array.from(e.target).filter(option => option.selected).map(option=>option.value)){
            fullList = fullList.concat(await getData((await getData(listIndex))[array]["url"]));
        }
        //console.log(fullList);
        
        if (typeof document.getElementById("divButtons") != "undefined" && document.getElementById("divButtons") != null) {
          document.getElementById("divButtons").remove();
        }
        if (typeof document.getElementById("divContent") != "undefined" && document.getElementById("divContent") != null) {
          document.getElementById("divContent").remove();
        }
      //getRollerMarkup(await getData((await getData(listIndex))[value]["url"]));
      getRollerMarkup(fullList);
      //getRollerMarkup(["hola", "adios"]);
    }
  });

  document.body.appendChild(divListChooser);
  (async () => {
    let data = await getData(listIndex);
    //console.log(data);
    /*data.forEach((element, key) => {
            const listOption = document.createElement("option");
            listOption.value = key;
            listOption.innerText =  element.name;
            listsDataList.appendChild(listOption.cloneNode(true));
        });*/
    for (let key in data) {
      const listOption = document.createElement("option");
      listOption.value = key;
      listOption.innerText = data[key].name;

      listsDataList.appendChild(listOption.cloneNode(true));

    }
  })();






  // - - - replace once i figure out modules ---------------------------------------------------------------------

  async function getData(route) {
    try {
      const response = await fetch(new Request(route));
      const output = await response.json();
      return output;
    } catch (error) {
      console.error("error: " + error);
    }
  }







  async function getRollerMarkup(array) {

    
    let btnRandom = document.createElement("input");
    btnRandom.setAttribute("type", "button");
    btnRandom.setAttribute("value", "ROLL THE DICE");
    divButtons.appendChild(btnRandom);
    let btnErase = document.createElement("input");
    btnErase.setAttribute("type", "button");
    btnErase.setAttribute("value", "ERASE PREVIOUS ROLLS");
    divButtons.appendChild(btnErase);


    btnRandom.addEventListener("click", function (event) {
      
        addRandParagraphFromArray(array, divContent);
      
    });
    btnErase.addEventListener("click", function (event) {
      while (divContent.firstChild !== null) {
        divContent.removeChild(divContent.firstChild);
      }
    });
    /*(async () => {
    return getRandElemFromArray(await getData(route));
  })();
*/
    function getRandElemFromArray(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
    async function addRandParagraphFromArray(inputArray, outputDiv) {
      const outputParagraph = document.createElement("p");
      outputParagraph.innerText = getRandElemFromArray(inputArray);
      outputDiv.appendChild(outputParagraph.cloneNode(true));
    }
  }
}











    let btnComplex = document.createElement("input");
    btnComplex.setAttribute("type", "button");
    btnComplex.setAttribute("value", "COMPLEX EFFECT! (beta, WIP)");
    divButtons.appendChild(btnComplex);
    btnComplex.addEventListener("click", function (event) {
    (async () => {
      const outputParagraph = document.createElement("p");
      outputParagraph.innerText = await getRandomComplexEffect("https://gael-58.github.io/gaelsRollerThingo/data/complex_chaos_effects_01.json");
      divContent.appendChild(outputParagraph.cloneNode(true));
    })();

    });

    



async function getRandomComplexEffect(effRoute) {

    let data = await getData(effRoute);

let output = data["finalized"];



const outerThing = /(\[(?:\{[^\[\]\{\}]+\},?)+\])/gm;
const innerThing = /(\{[^\[\]\{\}]+\})/gm;
const brackets = /[\{\}]+/gm;


let keepGoin1 = output.match(innerThing) != null;

while(keepGoin1){

let keepGoin2 = output.match(outerThing) != null;

while(keepGoin2){

const myArr1 = output.match(outerThing);

 const myArr2 = myArr1[0].match(innerThing);
 const num = Math.floor(Math.random() * (myArr2.length));
 const result = myArr2[num];


output = output.replace(myArr1[0], result);

keepGoin2 = output.match(outerThing) != null;

}

const myArr3 = output.match(innerThing);
const myOpt = myArr3[0].replace(brackets, '');
const myArr4 = data[myOpt];
const num2 = Math.floor(Math.random() * (myArr4.length));
output = output.replace(myArr3[0], myArr4[num2]);


keepGoin1 = output.match(innerThing) != null;

}


return output;
   
            

}




