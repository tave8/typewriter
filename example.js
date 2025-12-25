function main() {}
window.addEventListener("load", main);

const typewriter = new TypeWriter({
  elementSelector: "#myParagraph",
  text: "Hello I'm Giuseppe. Click the button to see the typewriting effect.",
  // onFinishTypewrite: callbackOnFinish,
  speed: "normal",
});

function startTypewritingInteraction() {
  // function callbackOnFinish() {
  //   // alert("finito!");
  //   // CAN I SEE THIS?
  //   console.log("finished typewriting");
  // }

  typewriter.run();
}

function runTypewriter() {
  startTypewritingInteraction();
}

const typewriterText1 = new TypeWriter({
  elementSelector: "#text1",
  text: "text1",
  onFinishTypewrite: () => {
    console.log("finished typewriting text 1");
  },
});

const typewriterText2 = new TypeWriter({
  elementSelector: "#text2",
  text: "text2",
  onFinishTypewrite: () => {
    console.log("finished typewriting text 2");
  },
});

const typewriterText3 = new TypeWriter({
  elementSelector: "#text3",
  text: "text3",
  onFinishTypewrite: () => {
    console.log("finished typewriting text 3");
  },
});

TypeWriter.runOneAfterAnother([typewriterText1, typewriterText2, typewriterText3]);
