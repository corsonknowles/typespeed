document.addEventListener('DOMContentLoaded', () => {
  let begun = false;
  let completed = false;
  let startTime;
  let endTime;
  let wordCount;
  let elapsedTime;
  let testLength;
  let accuracy;
  let texts = [
`It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.
However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.
“My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?”
Mr. Bennet replied that he had not.
“But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.”
Mr. Bennet made no answer.
“Do you not want to know who has taken it?” cried his wife impatiently.
“You want to tell me, and I have no objection to hearing it.”
This was invitation enough.`,
`Willowton is a village of some seventeen thousand population, large enough for the inhabitants to talk of "going up the town" when they mean the broad main street which stands on a gentle slope leading from the railway station to the church. This street, which is paved at the sides with nice old-world, ankle-twisting cobbles, boasts of two drapers', a chemist's, a saddler's, grocer's, and bootmaker's shops.`,
`Away in the less aristocratic parts of the village are the butchers and bakers, and the miscellaneous stores so dear to the country housewives. About the middle of the town, in the very widest part, is the bridge, and close to the bridge itself is the Wild Swan public-house, or rather hotel, as it calls itself. The little stream that runs under the bridge comes along through miles of cool meadows, now golden with buttercups, for it is May.`,
`It comes through many gardens and orchards, now white with apple blossom; and when it leaves the bridge it burrows underground for some little distance, and reappears at the foot of the cottage gardens, to lose itself in pleasant meandering through more flowery meadows, till it passes out of the ken of Heigham folks, and out of our story's picture.`,
`Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book?" thought Alice "without pictures or conversations?"`
  ];

  let currentText = texts[Math.floor(Math.random() * texts.length)].replace(/(\r\n|\n|\r)/gm,"");
  console.log(currentText);

  let accuracyNode = document.getElementById("accuracy");
  let countNode = document.getElementById("word-count");
  let errorNode = document.getElementById("error-count");
  let wpm = document.getElementById("wpm");
  let elapsedTimeNode = document.getElementById("typing-time");
  let mistypedNode = document.getElementById("mistyped-words");

  // filters for truthy values, ignoring empty strings and other falsy values
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
    let lastIdx = stringCount(userInput) - 1;
    console.log('lastIdx', lastIdx);
    let filterUserInput = userInput.split(' ').filter(e => e);
    let lastword = filterUserInput[lastIdx];
    console.log('filter user input', filterUserInput);
    console.log('lastword', lastword);
    let filterCurrentText = currentText.split(' ').filter(e => e);
    let targetWord = filterCurrentText[lastIdx];
    console.log('filter curr', filterCurrentText);
    let lastWordsMatch = (lastword === targetWord);
    console.log('target', targetWord);
    let mistypedWords = 0;
    for(let i = 0 ; i < lastIdx; i++){
      if (filterCurrentText[i] !== filterUserInput[i]){
        mistypedWords++;
      }
    }
    if (mistypedWords >= 0) {
      mistypedNode.innerHTML = mistypedWords;
    }
    let mistakes = 0;
    let characters = 0;
    for(let i = 0 ; i <= lastIdx; i++){
      let userword = filterUserInput[i];
      let orginalTextWord = filterCurrentText[i];
      for(let j = 0 ; j < userword.length ; j++){
        characters++;

        if (userword[j] !== orginalTextWord[j]){
          mistakes++;
        }
      }
    }

    if (mistakes >= 0) {
      errorNode.innerHTML = mistakes;
    }

    accuracy = Math.floor(( (characters - mistakes) / characters ) * 100);
    if (!isNaN(accuracy)) {
      accuracyNode.innerHTML = `${accuracy}%`;
    }

    let entryTime = new Date();
    let elapsedMinutes = (entryTime - startTime) / 1000 / 60;
    wpm.innerHTML = Math.floor(wordCount / elapsedMinutes);

    if (endTime && !completed && lastWordsMatch) {
      elapsedTime = (endTime - startTime) / 1000;
      elapsedTimeNode.innerHTML = `${elapsedTime} seconds`;
      completed = true;
    }


  }; //end of the oninput function

  let updateText = (newText) => {
    displayField.innerHTML = newText;
  };

//end of doc, end of document loaded listener
});
