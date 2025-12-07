/**
 * USAGE
 */
class TypeWriter {
  constructor({ text, elId, mode, onFinishTypewrite }) {
    this.text = text;
    this.elId = elId;
    this.mode = mode;
    this.onFinishTypewrite = onFinishTypewrite;
    this.elHtml = null;
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
    
  }

  // CORE

  /**
   * The core typewriting function.
   */
  _typeWrite({ text, elId, callbackOnFinish, setTypewriteAvailableWhenOneAtTime }) {
    // set the typewriter as not available, so
    // this function cannot be recalled, only when it was called
    // from the function "typewrite one at a time"
    if (setTypewriteAvailableWhenOneAtTime) {
      setTypewriteAvailableWhenOneAtTime(false);
    }

    const nChars = text.length;
    let lastTimeout = 0;
    const timeoutStep = 10;
    const cursorExists = true;

    for (let i = 0; i < nChars; i++) {
      const newText = cutText(text, i + 1);
      const randomTimeout = getRandomTimeout(10, 100);

      setTimeout(() => {
        updateText({ text: newText, elId, addCursor: cursorExists });
      }, lastTimeout);

      lastTimeout += timeoutStep + randomTimeout;
    }

    // this simulates an asynchronous operation,
    // without blocking the function's execution.
    // it's simply a timeout with timeout equal
    // to the last saved timeout
    setTimeout(() => {
      removeCursorIfExists({ elId, cursorExists });

      // operationFinished = true;
      // if there's a callback, run it
      if (callbackOnFinish) {
        callbackOnFinish();
      }

      // if the typewrite function was called from the
      // "one at a time" function, then this callback should be set
      // from "one at a time" function
      if (setTypewriteAvailableWhenOneAtTime) {
        setTypewriteAvailableWhenOneAtTime(true);
      }
    }, lastTimeout);
  }

  /**
   * Typewrite multiple elements simoltaneously.
   */
  typeWriteMultipleElements(typewriteInfoList) {
    // let func = null
    for (let i = 0; i < typewriteInfoList.length; i++) {
      const typewriteInfo = typewriteInfoList[i];
      // typewrite default
      typeWrite(typewriteInfo);
    }
  }

  /**
   * Run the typewriting function only one at a time,
   * meaning that the function cannot be re-run until
   * it has finished the "previous" round of typewriting.
   * This prevents weird situations like a text container
   * having the typewriting functionality multiple times,
   * which means the text will be typewrite (we assume) faster
   * for each extra typewrite function call.
   * Successive function calls of typeWriteOneAtTime
   * will have no effect, until the last typewriting is complete.
   *
   * The only "extra effort" you have to make, is that this function
   * will return to be called.
   */
  typeWriteOneAtTime({ text, elId, callbackOnFinish }) {
    // the first time the function gets called, typewrite is available
    let isTypewriteAvailable = true;

    // returns a function that makes the magic happen:
    // modify the state of the outer function
    return function () {
      // this inner function allows the value of the outer function
      // to be changed on demand, even outside of this outer function
      function setTypewriteAvailable(val) {
        isTypewriteAvailable = val;
      }

      if (isTypewriteAvailable) {
        typeWrite({ text, elId, callbackOnFinish, setTypewriteAvailableWhenOneAtTime: setTypewriteAvailable });
      } else {
        console.log(
          "You are calling the typewrite function in 'one at a time' mode, " +
            "which means you can call the typewrite function again, " +
            "only when it has finished all its typewring."
        );
      }
    };
  }

  // HELPERS

  _updateText({ text, elId, addCursor = false }) {
    const elHtml = document.getElementById(elId);
    const cursor = addCursor ? "|" : "";
    elHtml.textContent = text + cursor;
  }

  _cutText(text, iUntil) {
    return text.slice(0, iUntil);
  }

  _removeCursorIfExists({ elId, cursorExists }) {
    if (cursorExists) {
      const elHtml = document.getElementById(elId);
      elHtml.textContent = elHtml.textContent.slice(0, -1);
    }
  }

  _getRandomTimeout(start = 10, end = 50) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }
}

// USAGE

const typewriter = new TypeWriter({
  elId: "p1",
  text: "",
  mode: "default",
  onFinishTypewrite: "",
});

typewriter.run();
