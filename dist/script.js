/**
 * USAGE
 */
class TypeWriter {
  constructor({ text, elId, onFinishTypewrite = null }) {
    this.text = text;
    this.elId = elId;
    this.onFinishTypewrite = onFinishTypewrite;
    this.elHtml = null;
    // on instancing, the typewriter is available,
    // meaning that the target html element to be typewrote,
    // is available to be typewrote
    this._isTypewriteAvailable = true;
  }

  /**
   * This method is called by the instance to start the typewrite mechanism.
   */
  run() {
    window.addEventListener("load", () => {
      const elHtml = document.getElementById(this.elId);
      this.elHtml = elHtml;
      if (!this.elHtml) {
        throw Error(
          "Error: target typewriting html element doesn't exist, " +
            "maybe because page has not been loaded yet, or because the " +
            "html element with this id doesn't exist. " +
            "It seems like the element in which to run the " +
            "typewriting mechanism is not in the DOM."
        );
      }
      this._run();
    });
  }

  /**
   * Equivalent to .run(), but cannot be called by instance.
   * This method runs only when every necessary instance attribute is set
   * in the .run() publicly exposed instance method.
   */
  _run() {
    // console.log("running typewriting");
    this._typeWrite();
    // fn()
  }

  // CORE

  /**
   * The core typewriting function.
   */
  _typeWrite() {
    // if the typewriter was available, it won't be anymore,
    // (because it's about to work = do the typewriting)
    // until it will be made available once again
    if (this._isTypewriteAvailable) {
      this._isTypewriteAvailable = false;
    }

    const nChars = this.text.length;
    const timeoutStep = 10;
    const cursorExists = true;
    let lastTimeout = 0;

    for (let i = 0; i < nChars; i++) {
      const newText = this._cutText(i + 1);
      const randomTimeout = this._getRandomTimeout(10, 100);

      setTimeout(() => {
        this._updateText({ text: newText, addCursor: cursorExists });
      }, lastTimeout);

      lastTimeout += timeoutStep + randomTimeout;
    }

    // this simulates an asynchronous operation,
    // without blocking the function's execution.
    // it's simply a timeout with timeout equal
    // to the last saved timeout
    setTimeout(() => {
      this._removeCursorIfExists({ cursorExists });

      // operationFinished = true;
      // if there's a callback, run it
      if (this.onFinishTypewrite) {
        this.onFinishTypewrite();
      }

      // because the typewriter has just finished,
      // then it's set to be available again
      this._isTypewriteAvailable = true;
    }, lastTimeout);
  }

  /**
   * Typewrite multiple elements simoltaneously.
   */
  // _typeWriteMultipleElements(typewriteInfoList) {
  //   // let func = null
  //   for (let i = 0; i < typewriteInfoList.length; i++) {
  //     const typewriteInfo = typewriteInfoList[i];
  //     // typewrite default
  //     typeWrite(typewriteInfo);
  //   }
  // }

  // HELPERS

  _updateText({ text, addCursor = false }) {
    const cursor = addCursor ? "|" : "";
    this.elHtml.textContent = text + cursor;
  }

  _cutText(iUntil) {
    return this.text.slice(0, iUntil);
  }

  _removeCursorIfExists({ cursorExists }) {
    if (cursorExists) {
      const newText = this.elHtml.textContent.slice(0, -1);
      this.elHtml.textContent = newText;
    }
  }

  _getRandomTimeout(start = 10, end = 50) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }
}

// USAGE

const typewriter = new TypeWriter({
  elId: "p1",
  text: "ciao come stai sono giuseppe tavella",
  // onFinishTypewrite: "",
});

typewriter.run();
// typewriter.run();
// typewriter.run();
