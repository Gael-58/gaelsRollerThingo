"use strict";
{

  const route_trueChaosEffects = "https://gael-58.github.io/gaelsRollerThingo/data/trueChaosEffects.json";

  const divButtons = document.createElement("div");
  const divContent = document.createElement("div");

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
   (async () => {
        addRandParagraphFromArray(await getData(route_trueChaosEffects), divContent);
    })();
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
  async function addRandParagraphFromArray(inputArray, outputDiv){
        const outputParagraph = document.createElement("p");
        outputParagraph.innerText = getRandElemFromArray(inputArray);
        outputDiv.appendChild(outputParagraph.cloneNode(true));
  }









  //  ---------------------------------------------------------------------
  async function getData(route) {
    try {
      const response = await fetch(new Request(route));
      const output = await response.json();
      return output;
    } catch (error) {
      console.error("error: " + error);
    }
  }
}
