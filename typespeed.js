document.addEventListener('DOMContentLoaded', () => {
  let begun = false;
  let startTime;
  let endTime;
  let wordCount;

  // TODO verify this event listener works as intended
  let inputField = document.getElementById("type-speed-input");

  inputField.oninput = () => {
    if (!begun) {
      begun = true;
      startTime = new Date();

      console.log(`input entered and begun = ${begun}`);
    }

    // TODO put this inside calculator for completed words
    wordCount = inputField.value.split(' ').length;
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
