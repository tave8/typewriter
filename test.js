function startTypewriteInteraction() {
  function callbackOnFinish() {
    // alert("finito!");
    // CAN I SEE THIS?
  }

  typeWriteMultipleElements([
    { elId: "p1", text: "il bicchiere mezzo pieno o mezzo intero", callbackOnFinish },
    { elId: "p2", text: "chi va piano va sano e va vicino" },
    { elId: "p3", text: "amore a primo olfatto" },
    // {
    //   elId: "p4",
    //   text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex quidem repellat ullam ad, consectetur, labore facilis, nihil suscipit cum necessitatibus maiores consequatur alias fuga qui dolorem obcaecati corrupti sint.",
    // },
  ]);
}

window.addEventListener("load", () => {
  startTypewriteInteraction();
});