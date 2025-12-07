/**
    ## USAGE

    ```js
    const typewriter = new TypeWriter({
      elId: "myParagraph",
      text: "hello world hows it going",
      onFinishTypewrite: cbk,
    });

    function cbk() {
        alert("after typewriting..")
    }

    // consecutive calls will not produce any effect,
    // meaning the typewriting will not take effect,
    // until the current typewriting has finished its work
    typewriter.run();
    typewriter.run();
    typewriter.run();

    // same here - if there's any timeout that will try to 
    // typewrite when the current typewriting is working,
    // nothing will happen
    setTimeout(() => {
      typewriter.run();
    }, 1000);
    ```

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
    const inst = this;
    function cbk() {
      inst._setElHtml();
      inst._run();
    }
    // CASE: if the page is loading.
    // this happens when the user calls to typewrite before the page is loaded
    if (document.readyState === "loading") {
      window.addEventListener("load", () => {
        // console.log("called typewrite when page was not loaded, now loaded");
        cbk();
        // if (!this.elHtml) {
        //   throw Error(
        //     "Error: target typewriting html element doesn't exist, " +
        //       "maybe because page has not been loaded yet, or because the " +
        //       "html element with this id doesn't exist. " +
        //       "It seems like the element in which to run the " +
        //       "typewriting mechanism is not in the DOM."
        //   );
        // }
      });
    }
    // CASE: if the page is loaded.
    else {
      // console.log("called typewrite when page is loaded");
      cbk();
    }
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
    // console.log("about to work");

    // if the typewriter was available, it won't be anymore,
    // (because it's about to work = do the typewriting)
    // until it will be made available once again
    if (this._isTypewriteAvailable) {
      this._isTypewriteAvailable = false;
    } else {
      console.log("typewriter was called while it is working, operation canceled");
      return;
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

  /**
   * Set the target html element to be typewritten,
   * only if it's not been set already
   */
  _setElHtml() {
    // console.log(this.elHtml)
    // if the target html to be typewritten, has already been saved
    if (this.elHtml instanceof HTMLElement) {
      return;
    }

    const elHtml = document.getElementById(this.elId);
    // check if the id if the target html element to be typewritten, exists
    const elExists = elHtml instanceof HTMLElement;
    if (!elExists) {
      throw Error("The target element to be typewritten, " + "doesn't exist. Provide a valid id.");
    }

    this.elHtml = elHtml;
  }

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

