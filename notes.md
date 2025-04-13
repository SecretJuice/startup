# CS260 Notes

These are some notes

### Deplpying to a sub-sub domain
The target sub-domain I'm using is `startup.cs260.conrobb.com`. That's because, along with Simon, I wanted to contain everything under one subdomain to avoid clutter, as I intend to use this domain for a lot of personal projects, portfolio, etc.

When using the `deployFiles.sh` script, the "domain" flag should include `cs260.conrobb.com` and the "service" flag should read `startup`

### PicoCSS container class
Don't fret when the provided picocss container class doesn't look centered. It's likely just adhereing to it's size steps defined [here](https://picocss.com/docs/container)

### React Routing
React uses an interesting routing approach. It seems easy to use (at least here at the small scale), I wonder what this would look like at a larger scale.

### React Lists
React requires a top-level prop called "key" that acts as a unique identifier among the other items of the list. You don't have to use that key prop in the instantiated components, just as you create them

### Forms in React
When creating forms in which you make your own requests and functionality, it's important that you start with calling `event.preventDefault`. Otherwise unwanted and weird behavior like page reloading and cancelled requests occured.
