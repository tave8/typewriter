class TypeWriter {
  /**
   * speed: slow | normal | fast
   */
  constructor({ elementSelector, text, speed = "normal", onFinishTypewrite = null }) {
    this.text = text;
    this.elementSelector = elementSelector;
    this.onFinishTypewrite = onFinishTypewrite;

    // typewriting speed config
    this.speed = speed;

    this.humanizeRandTimeoutSpeeds = {
      normal: {
        start: 10,
        end: 100,
      },
      fast: {
        start: 10,
        end: 50,
      },
      slow: {
        start: 10,
        end: 200,
      },
    };

    this.humanizeRandTimeoutStart = this.humanizeRandTimeoutSpeeds[speed].start;
    this.humanizeRandTimeoutEnd = this.humanizeRandTimeoutSpeeds[speed].end;

    // on instancing, the typewriter is available,
    // meaning that the target html element to be typewrote,
    // is available to be typewrote
    this.isTypewriteAvailable = true;
  }

  /**
   * This method is called by the instance to start the typewrite mechanism.
   */
  run() {
    const isDocumentReady = document.readyState === "complete";

    // page is loaded.
    if (isDocumentReady) {
      this.whenUserRuns();
    }
    // page is loading.
    else {
      window.addEventListener("load", this.whenUserRuns.bind(this));
    }

    return this;
  }

  whenUserRuns() {
    const elementHtml = document.querySelector(this.elementSelector);
    // check if the id if the target html element to be typewritten, exists
    const elementHtmlExists = elementHtml instanceof HTMLElement;

    if (!elementHtmlExists) {
      throw Error("The target element to be typewritten, " + "doesn't exist. Provide a valid id.");
    }

    this.typeWrite();
  }

  /**
   * The core typewriting function.
   */
  typeWrite() {
    const self = this;

    // console.log("about to work");

    // if the typewriter was available, it won't be anymore,
    // (because it's about to work = do the typewriting)
    // until it will be made available once again
    if (this.isTypewriteAvailable) {
      this.isTypewriteAvailable = false;
    } else {
      console.log("typewriter was called while it is working, operation canceled");
      return;
    }

    const nChars = this.text.length;
    const timeoutStep = 10;
    const cursorExists = true;
    let lastTimeout = 0;

    for (let i = 0; i < nChars; i++) {
      const newText = this.cutText(i + 1);
      const randomTimeout = this.getRandomTimeout();

      setTimeout(() => {
        self.updateText({ text: newText, addCursor: cursorExists });
      }, lastTimeout);

      lastTimeout += timeoutStep + randomTimeout;
    }

    // this simulates an asynchronous operation,
    // without blocking the function's execution.
    // it's simply a timeout with timeout equal
    // to the last saved timeout
    setTimeout(() => {
      self.removeCursorIfExists({ cursorExists });

      // operationFinished = true;
      // if there's a callback, run it
      if (this.onFinishTypewrite) {
        this.onFinishTypewrite();
      }

      // because the typewriter has just finished,
      // then it's set to be available again
      this.isTypewriteAvailable = true;
    }, lastTimeout);
  }

  // HELPERS

  updateText({ text, addCursor = false }) {
    const cursor = addCursor ? "|" : "";
    document.querySelector(this.elementSelector).textContent = text + cursor;
  }

  cutText(iUntil) {
    return this.text.slice(0, iUntil);
  }

  removeCursorIfExists({ cursorExists }) {
    if (cursorExists) {
      const newText = document.querySelector(this.elementSelector).textContent.slice(0, -1);
      document.querySelector(this.elementSelector).textContent = newText;
    }
  }

  getRandomTimeout() {
    let start = this.humanizeRandTimeoutStart;
    let end = this.humanizeRandTimeoutEnd;

    return Math.floor(Math.random() * (end - start + 1)) + start;
  }
}
