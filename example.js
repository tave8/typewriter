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
