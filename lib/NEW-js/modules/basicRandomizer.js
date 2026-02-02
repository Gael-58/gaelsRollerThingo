



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
