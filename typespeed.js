document.addEventListener('DOMContentLoaded', () => {

  let begun = false;


  // TODO put this inside event listener for text in input field
  document.getElementByID("type-speed-input").oninput = () => {
    if (!begun) {
      begun = true;
      let startTime = new Date();
    }
  }

  // TODO put this inside calculator for completed words
  if () {
    let endTime = new Date();
  }

  let elapsedTime = endTime - startTime;


//end of doc, end of document loaded listener
});
