function main() {
  startTypewritingInteraction();
}

window.addEventListener("load", main);

function startTypewritingInteraction() {
  function callbackOnFinish() {
    // alert("finito!");
    // CAN I SEE THIS?
    console.log("finished typewriting");
  }

  new TypeWriter({
    elementSelector: "#myParagraph",
    text: "Hello I'm Giuseppe. Refresh this page to see the typewriting",
    onFinishTypewrite: callbackOnFinish,
    speed: "normal"
  }).run();

    new TypeWriter({
    elementSelector: "#myParagraph2",
    text: "Hello I'm Giuseppe. Refresh this page to see the typewriting",
    onFinishTypewrite: callbackOnFinish,
    speed: "normal"
  }).run();
}
