# Typewriting

Human-like typewriting, as if someone is tipying real-time.

Use it to:
- add a personal touch to your apps
- make an app feel more interactive for the user
- or simply to display some text in a progressive "typewrite" fashion, instead of all at once, so the user can notice the visual change

## Installation

The library is provided via CDN by Cloudflare.


### CDN

JavaScipt

```
https://typewriter.giutav.workers.dev/script.js
```


### HTML

JavaScipt

```html
<script src="https://typewriter.giutav.workers.dev/script.js"></script>
```




### Configuration
 
#### Typewrite immediately (on page loaded)

```js
new TypeWriter({
    elementSelector: "#myParagraph",
    text: "Hello this is the typewriter library",
}).run();
```


#### Typewrite on user event

Be sure to not create a new TypeWriter instance, it must be the same.

The TypeWriter instance must be created only once.

```js
const typewriter = new TypeWriter({
    elementSelector: "#myParagraph",
    text: "Hello this is the typewriter library",
})

// modify your button here
myBtn.addEventListener("click", () => {
    typewriter.run();
})
```



## Features


### Human-like typewriting

Random intervals between character typing allow for human-like typewriting.

### Typewrite with callback on finish typewriting

On the event finish typewrite, you can call a custom callback.

### Typewrite "one at a time"

Prevent the typewrite feature to be called more than once while it's "busy". Consecutive calls to the typewriting will have no effect 
until the typewriting function will have finished its work.

### Personalize speed

You can customize the speed.

Further guidelines will be coming soon.