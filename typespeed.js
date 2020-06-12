document.addEventListener('DOMContentLoaded', () => {
  let begun = false;
  let completed = false;
  let startTime;
  let endTime;
  let wordCount;
  let elapsedTime;
  let testLength;
  let accuracy;
  let markupText = "";
  let texts = [
`It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighborhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.`,
`"My dear Mr. Bennet," said his lady to him one day, "have you heard the park is let at last?" Mr. Bennet replied that he had not. "But it is," returned she; "for Mrs. Long has just been here, and she told me all about it." Mr. Bennet made no answer. "Do you not want to know who has taken it?" cried his wife impatiently. "You want to tell me, and I have no objection to hearing it." This was invitation enough.`,
`There seemed to be no use in waiting by the little door, so she went back to the table, half hoping she might find another key on it, or at any rate a book of rules for shutting people up like telescopes: this time she found a little bottle on it, ('which certainly was not here before,' said Alice,) and round the neck of the bottle was a paper label, with the words 'DRINK ME' beautifully printed on it in large letters.`,
`Willow is a village of some seventeen thousand population, large enough for the inhabitants to talk of "going up the town" when they mean the broad main street which stands on a gentle slope leading from the railway station to the church. This street, which is paved at the sides with nice old-world, ankle-twisting cobbles, boasts of two drapers', a chemist's, a saddler's, grocer's, and bootmaker's shops.`,
`Away in the less aristocratic parts of the village are the butchers and bakers, and the miscellaneous stores so dear to the country housewives. About the middle of the town, in the very widest part, is the bridge, and close to the bridge itself is the Wild Swan public-house, or rather hotel, as it calls itself. The little stream that runs under the bridge comes along through miles of cool meadows, now golden with buttercups, for it is May.`,
`It comes through many gardens and orchards, now white with apple blossom; and when it leaves the bridge it burrows underground for some little distance, and reappears at the foot of the cottage gardens, to lose itself in pleasant meandering through more flowery meadows, till it passes out of the ken of local folks, and out of our story's picture.`,
`Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book?" thought Alice "without pictures or conversations?"`
  ];


  const selectText = () => texts[Math.floor(Math.random() * texts.length)].replace(/(\r\n|\n|\r)/gm,"");
  let currentText = selectText();

  // save dom nodes for displaying metrics and updates
  let accuracyNode = document.getElementById("accuracy");
  let countNode = document.getElementById("word-count");
  let errorNode = document.getElementById("error-count");
  let wpm = document.getElementById("wpm");
  let elapsedTimeNode = document.getElementById("typing-time");
  let mistypedNode = document.getElementById("mistyped-words");
  let newTest = document.getElementById("newTest");

  // stringCount filters for truthy values, ignoring empty strings and other falsy values
  let stringCount = (string) => string.split(' ').filter( e => e ).length;

  // store the dom nodes for main UI elements, where text is rendered and typed
  let displayField = document.getElementById("display");
  let inputField = document.getElementById("type-speed-input");

  newTest.onclick = () => {
      completed = false;
      currentText = selectText();
      displayField.innerHTML = currentText;
      testLength = stringCount(currentText);
      accuracyNode.innerHTML = "100%";
      countNode.innerHTML = "0";
      errorNode.innerHTML = "0";
      wpm.innerHTML = "60";
      elapsedTimeNode.innerHTML = "(not done)";
      mistypedNode.innerHTML = "0";
      inputField.value = "";
  };

  displayField.innerHTML = currentText;
  testLength = stringCount(currentText);

  inputField.oninput = () => {
    if (!begun) {
      begun = true;
      startTime = new Date();
    }

    let userInput = inputField.value;
    wordCount = stringCount(inputField.value);
    if (wordCount >= 0) {
      countNode.innerHTML = wordCount;
    }

    if (wordCount === testLength) {
      endTime = new Date();
    }

    let lastIdx = stringCount(userInput) - 1;
    let filterUserInput = userInput.split(' ').filter(e => e);
    let lastword = filterUserInput[lastIdx];
    let filterCurrentText = currentText.split(' ').filter(e => e);
    let targetWord = filterCurrentText[lastIdx];
    let lastWordsMatch = (lastword === targetWord);

    // count then display any mispelled words
    let mistypedWords = 0;
    for(let i = 0 ; i < lastIdx; i++){
      if (filterCurrentText[i] !== filterUserInput[i]){
        mistypedWords++;
      }
    }
    if (mistypedWords >= 0) {
      mistypedNode.innerHTML = mistypedWords;
    }

    // count character accuracy
    let mistakes = 0;
    let characters = 0;
    for(let i = 0 ; i <= lastIdx; i++){
      let userword = filterUserInput[i];
      let originalTextWord = filterCurrentText[i];
      if (userword && originalTextWord) {
        for(let j = 0 ; j < userword.length ; j++){
          characters++;
          if (userword[j] !== originalTextWord[j]){
            mistakes++;
          }
        } // end of inner for loop
      }
    } // end of outer for loop

    // markup and replace text to insert highlighted spans for detected typing errors
    for(let i = 0 ; i < testLength; i++){
      // highlight previously mispelled words in red
      if ((i < lastIdx && filterCurrentText[i] !== filterUserInput[i]) ) {
          markupText += `<span style='background: red;'>${filterCurrentText[i]}</span> `;
      // in the current word, if there are non-matching characters, highlight them in yellow
      } else if(i === lastIdx && filterCurrentText[i] !== filterUserInput[i]) {
        let currentUserWord = filterUserInput[i];
        let currentWordLength = currentUserWord.length;
        let originalWord = filterCurrentText[i];
        let buildWord = "";
        for(let j = 0; j < originalWord.length; j++){
          if(j >= currentWordLength || currentUserWord[j] === originalWord[j]){
            buildWord += `${originalWord[j]}`;
          } else {
            buildWord += `<span style='background: yellow;'>${originalWord[j]}</span>`;
          }
        }
        markupText += `${buildWord} `;
      // otherwise, just add the word from the original source
      } else {
        markupText += `${filterCurrentText[i]} `;
      }
    }

    // only display positive integers, reset markupText
    if (mistakes >= 0) {
      errorNode.innerHTML = mistakes;
      displayField.innerHTML = markupText;
      // reset markupText
      markupText = "";
    }

    // display character accuracy
    accuracy = Math.floor(( (characters - mistakes) / characters ) * 100);

    // ignore not-a-number errors when updating
    if (!isNaN(accuracy)) {
      accuracyNode.innerHTML = `${accuracy}%`;
    }

    // calculate words per minute
    let entryTime = new Date();
    let elapsedMinutes = (entryTime - startTime) / 1000 / 60;
    wpm.innerHTML = Math.floor(wordCount / elapsedMinutes);

    // calculate total typing time, only once per given text
    if (endTime && !completed && lastWordsMatch) {
      elapsedTime = (endTime - startTime) / 1000;
      let minutes = Math.floor(elapsedTime / 60);
      let seconds = Math.floor(elapsedTime % 60);
      elapsedTimeNode.innerHTML = `${minutes}m${seconds}s`;
      completed = true;
    }

  }; //end of the oninput function

}); //end of doc, end of document loaded listener
