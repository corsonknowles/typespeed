document.addEventListener('DOMContentLoaded', () => {
  let begun = false;
  let startTime;
  let endTime;
  let wordCount;
  let elapsedTime;
  let testLength;
  let texts = ['HI','BYE','CEY'];
  let completed = false;
  let currentText = texts[Math.floor(Math.random() * texts.length)];
  console.log(currentText);

  let accuracyNode = document.getElementById("accuracy");
  let countNode = document.getElementById("word-count");
  let errorNode = document.getElementById("error-count");
  let elapsedTimeNode = document.getElementById("typing-time");


  let stringCount = (string) => string.split(' ').filter( e => e ).length;
  let displayField = document.getElementById("display");
  // let totalWords = stringCount(displayField.innerHTML);
  let inputField = document.getElementById("type-speed-input");

  displayField.innerHTML = currentText;
  testLength = stringCount(currentText);

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

    if (wordCount === testLength ) {
      endTime = new Date();
    }

    let userInput = inputField.value;
    console.log('userinput', userInput);
    let lastIdx = userInput.split(' ').length - 1;
    console.log('lastIdx', lastIdx);
    let lastword = userInput.split(' ')[lastIdx];
    console.log('lastword', lastword);
    let lastWordsMatch = (lastword === currentText.split(" ")[lastIdx]);
    console.log('target', currentText.split(" ")[lastIdx]);
    if (endTime && !completed && lastWordsMatch ) {
      elapsedTime = endTime - startTime;
      elapsedTimeNode.innerHTML = elapsedTime;
      completed = true;
    }
  };

  let updateText = (newText) => {
    displayField.innerHTML = newText;
  };

//end of doc, end of document loaded listener
});
