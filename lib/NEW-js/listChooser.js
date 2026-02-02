"use strict";
{
  const listIndex = "https://gael-58.github.io/gaelsRollerThingo/data/0000ListIndex.json";
  const roller =
    "https://gael-58.github.io/gaelsRollerThingo/lib/js/ArrayRollLib.js";

  const divListChooser = document.createElement("div");
  const listsDataList = document.createElement("select");
  listsDataList.id = "listOfLists";

  divListChooser.appendChild(listsDataList);
  listsDataList.multiple = true;
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
    const divButtons = document.createElement("div");
    const divContent = document.createElement("div");
    divContent.id = "divContent";
    divButtons.id = "divButtons";

    let btnRandom = document.createElement("input");
    btnRandom.setAttribute("type", "button");
    btnRandom.setAttribute("value", "ROLL THE DICE");
    divButtons.appendChild(btnRandom);
    let btnErase = document.createElement("input");
    btnErase.setAttribute("type", "button");
    btnErase.setAttribute("value", "ERASE PREVIOUS ROLLS");
    divButtons.appendChild(btnErase);

    document.body.appendChild(divButtons);
    document.body.appendChild(divContent);

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
