function startTypewriteInteraction() 
{
  function callbackOnFinish() {
    // alert("finito!");
    // CAN I SEE THIS?
  }

  new TypeWriter({
    elementSelector: "#myParagraph",
    text: "Hello I'm Giuseppe"
  }).run()

}

window.addEventListener("load", () => {
  startTypewriteInteraction();
});