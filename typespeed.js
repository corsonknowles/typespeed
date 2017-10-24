document.addEventListener('DOMContentLoaded', () => {
  let begun = false;
  let startTime;
  let endTime;
  let wordCount;
  let accuracyNode = document.getElementById("accuracy");
  let countNode = document.getElementById("word-count");
  let errorNode = document.getElementById("error-count");

  let stringCount = (string) => string.split(' ').filter( e => e ).length;
  let displayField = document.getElementById("display");
  let totalWords = stringCount(displayField.value);
  let inputField = document.getElementById("type-speed-input");


  inputField.oninput = () => {
    if (!begun) {
      begun = true;
      startTime = new Date();

      console.log(`input entered and begun = ${begun}`);
    }

    // TODO put this inside calculator for completed words
    // wordCount = inputField.value.split(' ').filter( e => e ).length;
    wordCount = stringCount(inputField.value);

    countNode.innerHTML = wordCount;
    // console.log(inputField.value);
    // console.log(wordCount);

    if (wordCount) {
      endTime = new Date();
    }

    if (endTime) {
      let elapsedTime = endTime - startTime;
    }
  }

//end of doc, end of document loaded listener
});
