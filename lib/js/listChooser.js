"use strict";
{
  const listIndex = "https://gael-58.github.io/gaelsRollerThingo/data/0000ListIndex.json";
  //const listIndex = "../data/0000ListIndex.json";
  
  const roller =
    "https://gael-58.github.io/gaelsRollerThingo/lib/js/ArrayRollLib.js";
  
  const divListChooser = document.createElement("div");
  const divButtons = document.createElement("div");
  const divContent = document.createElement("div");
    let btnComplex = document.createElement("input");
    divContent.id = "btnComplex";
    btnComplex.setAttribute("type", "button");
    btnComplex.setAttribute("value", "COMPLEX EFFECT! (beta, WIP)");
    divButtons.appendChild(btnComplex);

  
  const listsDataList = document.createElement("select");

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
          while (divButtons.firstChild !== null && divButtons.firstChild.id != "btnComplex") {
              divButtons.removeChild(divButtons.firstChild);
          }
        }
        if (typeof document.getElementById("divContent") != "undefined" && document.getElementById("divContent") != null) {
          while (divContent.firstChild !== null) {
              divContent.removeChild(divContent.firstChild);
          }
        }
      //getRollerMarkup(await getData((await getData(listIndex))[value]["url"]));

      
      getRollerMarkup(fullList);
      //getRollerMarkup(["hola", "adios"]);
    }
  });
    btnComplex.addEventListener("click", function (event) {
    (async () => {
      const outputParagraph = document.createElement("p");
      outputParagraph.innerText = await getRandomComplexEffect("https://gael-58.github.io/gaelsRollerThingo/data/complex_chaos_effects_01.json");
      divContent.appendChild(outputParagraph.cloneNode(true));
    })();

    });
  document.body.appendChild(divListChooser);
  divContent.id = "divContent";
  divButtons.id = "divButtons";
  document.body.appendChild(divButtons);
  document.body.appendChild(divContent);
  
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
    divButtons.appendChild(btnComplex);
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

    



async function getRandomComplexEffect(effRoute) {

let data = await getData(effRoute);
const num2 = Math.floor(Math.random() * (data["finalized"].length));

let output = data["finalized"][num2];
console.log("INITIAL output " + output);


const outerThing = /(\[(?:\{[\]\{\}]+\},?)+\])/gm;
const innerThing = /(\{[^\[\]\{\}]+\})/gm;
const brackets = /[\{\}]+/gm;
const inside = /\/([^\/]+)/gm;


let keepGoin1 = output.match(innerThing) != null;

while(keepGoin1){

let keepGoin2 = output.match(outerThing) != null;

while(keepGoin2){

const myArr1 = output.match(outerThing);

 const myArr2 = myArr1[0].match(innerThing);
 const num = Math.floor(Math.random() * (myArr2.length));
 const result = myArr2[num];


output = output.replace(myArr1[0], result);

console.log("output " + output);
keepGoin2 = output.match(outerThing) != null;

}

const myArr3 = output.match(innerThing);
const myOpt = myArr3[0].replace(brackets, '');
const myOpt2 = myOpt;
  
let keepGoin3 = myOpt.match(inside) != null;

let myArr5 = data;
  if(!keepGoin3){
    myArr5 = myArr5[myOpt];
  }
while(keepGoin3){
let myArr4 = myOpt.match(inside);
console.log("array4 = " + myArr4);
console.log("array5 = " + myArr5);
console.log("data = " + data);
console.log("a1 = " + data["a1"]);
myArr5 = myArr5[(myArr4[0].replace('\/', ''))];
myOpt.replace(myArr4[0], '');
keepGoin3 = myOpt.match(inside) != null;
}

let myArr6 = await myArray6Thing(myArr5);
async function myArray6Thing(arrayInput){
  let newArray = [];
  let processedInput = arrayInput;
  if(i != null && !Array.isArray(i) && typeof i === 'object'){processedInput = arrayInput.values();}
  for(let i of processedInput){
    if(i != null && (Array.isArray(i) || typeof i === 'object')){
      newArray = newArray.concat(await myArray6Thing(i));
    }else{
      newArray = newArray.concat(i);
    }
  }
  return newArray;
}

const num2 = Math.floor(Math.random() * (myArr6.length));
output = output.replace(myArr3[0], myArr6[num2]);

console.log("output " + output);

keepGoin1 = output.match(innerThing) != null;

}

console.log("FINAL output " + output);

return output;
   
            

}


}
















