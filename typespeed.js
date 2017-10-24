document.addEventListener('DOMContentLoaded', () => {
  let begun = false;

  // TODO verify this event listener works as intended
  let inputField = document.getElementByID("type-speed-input");

  inputField.oninput = () => {
    if (!begun) {
      begun = true;
      let startTime = new Date();
      console.log(`input entered and begun = ${begun}`);
    }

    // TODO put this inside calculator for completed words
    if () {
      let endTime = new Date();
    }

    if (endTime) {
      let elapsedTime = endTime - startTime;
    }
  }

//end of doc, end of document loaded listener
});
