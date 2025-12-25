function main() {}
window.addEventListener("load", main);

const typewriter = new TypeWriter({
  elementSelector: "#myParagraph",
  text: "Hello I'm Giuseppe. Refresh this page to see the typewriting",
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
