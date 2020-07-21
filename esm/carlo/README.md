# Carlo - headful Node app framework
A Chrome Window Manager written for use inside NodeJS ECMAScript Modules.
a lib for lunching & reusing Chrome Instances and exposing NodeJS Context similar to electron, nwjs but reusing existing browser instances or installations is not needed when you want to code a open-pwa app as open-pwa exposes the NodeJS Context via its interfaces. 

### ❗Carlo was [no longer maintained](https://github.com/open-pwa/open-pwa/issues/163#iesm/carlo/ssuecomment-592238093). 

@open-pwa/carlo provides Node applications with [Google Chrome](https://www.google.com/chrome/) rendering capabilities, communicates with the locally-installed browser instance using the [Puppeteer](https://github.com/GoogleChrome/puppeteer/) project, and implements a remote call infrastructure for communication between Node and the browser.

while @open-pwa/backend provides communication with a installed browser using a local server.

###### [API](https://github.com/open-pwa/open-pwa/blob/master/esm/carlo/API.md) | [FAQ](#faq) | [Contributing](https://github.com/open-pwa/open-pwa/blob/master/esm/carlo/CONTRIBUTING.md)

![image](https://user-images.githubusercontent.com/883973/47826256-0531fc80-dd34-11e8-9c8d-c1b93a6ba631.png)

<!-- [START usecases] -->
###### What can I do?

With Carlo and open-pwa, users can create hybrid applications that use the existing Browser for rendering and NodeJS or open-pwa for capabilities:
- For Node applications, the web rendering stack lets users visualize the dynamic state of the app. 
- For Web applications, additional system capabilities are accessible from Node.
- The application can be bundled with node into a single executable using [pkg](https://github.com/zeit/pkg).
- Or Installed via open-pwa 

###### How does it work?
- open-pwa supports carlo as app type and ships always with the newst carlo build
  - open-pwa can also use the server type to run custom carlo instances if needed. or even do not use it
- Carlo locates Google Chrome installed locally.
- Launches Chrome and establishes a connection over the process pipe.
- Exposes a high-level API for rendering in Chrome with the Node environment.

<!-- [END usecases] -->

<!-- [START getstarted] -->

## Usage

Install Carlo

#### npm
```bash
npm i carlo
# yarn add carlo
```

> Carlo requires at least Node v14.0.0.

**Example** - Display local environment

Save file as **example.js**

```js
const carlo = require('carlo');

(async () => {
  // Launch the browser.
  const app = await carlo.launch();

  // Terminate Node.js process on app window closing.
  app.on('exit', () => process.exit());

  // Tell carlo where your web files are located.
  app.serveFolder(__dirname);

  // Expose 'env' function in the web environment.
  await app.exposeFunction('env', _ => process.env);

  // Navigate to the main page of your app.
  await app.load('example.html');
})();
```

Save file as **example.html**

```html
<script>
async function run() {
  // Call the function that was exposed in Node.
  const data = await env();
  for (const type in data) {
    const div = document.createElement('div');
    div.textContent = `${type}: ${data[type]}`;
    document.body.appendChild(div);
  }
}
</script>
<body onload="run()">
```

Run your application:

```bash
node example.js
```

Check out [systeminfo](https://github.com/open-pwa/open-pwa/tree/master/esm/carlo/examples/systeminfo) and [terminal](https://github.com/open-pwa/open-pwa/tree/master/esm/carlo/examples/terminal) examples with richer UI and RPC-based communication between the Web and Node in the [examples](https://github.com/open-pwa/open-pwa/tree/master/esm/carlo/examples) folder.

<!-- [END getstarted] -->

## API

Check out the [API](https://github.com/open-pwa/open-pwa/blob/master/esm/carlo/API.md) to get familiar with Carlo.


## Testing

Carlo uses [Puppeteer](https://pptr.dev/) project for testing. Carlo application and all Carlo windows have
corresponding Puppeteer objects exposed for testing. Please refer to the [API](https://github.com/open-pwa/open-pwa/blob/master/esm/carlo/API.md) and the [systeminfo](https://github.com/open-pwa/open-pwa/tree/master/esm/carlo/examples/systeminfo) project for more details.

## Contributing to Carlo

Look at the [contributing guide](https://github.com/open-pwa/open-pwa/blob/master/esm/carlo/CONTRIBUTING.md) to get an overview of Carlo's development.

<!-- [START faq] -->

## FAQ

#### Q: Can a Node app using Carlo be packaged as a Desktop app?

https://github.com/open-pwa/open-pwa provides the ability to install Desktop Apps with branding configurability such as application icons

The [pkg](https://github.com/zeit/pkg) project can be used to package a Node app as a Desktop app. Carlo does not provide branding configurability such as application icons or customizable menus, instead, Carlo focuses on productivity and Web/Node interoperability. Check out the [systeminfo](https://github.com/open-pwa/open-pwa/tree/master/esm/carlo/examples/systeminfo) example and call `pkg package.json` to see how it works.


#### Q: What happens if the user does not have Chrome installed?

Carlo prints an error message when Chrome can not be located.

#### Q: What is the minimum Chrome version that Carlo supports?

Chrome Stable channel, versions 70.* are supported.


<!-- [END faq] -->
