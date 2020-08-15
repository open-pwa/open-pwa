# OPEN-PWA Platform 
An OpenSource Project to research and offer the ability to Port PWA and Serverless Concepts to any Platform by providing the needed API's to legacy Platforms a dropin replacement for the electron framework that scales more well when multiple applications get executed on the same host. It offers a Total new way of Deployment and Application update concepts.

## News 

## 15.08.2020
- New Electron Support Landed makes Electron apps More Efficent and allows to run them directly on open-pwa without a indipendent electron installation.
- WebView2 Support upcoming the guys @google carlo did point out that Mozilla and Microsoft are working on WebView2 and we looked into it and will support that.


### 20.07.2020
- Add Carlo
- Add android build 
- refactoring and cleanups

### 17.07.2020
Google Created Project Carlo that will eliminate the most biggest problems of electron (the packaging of chrome) we will use it as the fundation to allow desktop apps as it is using simply JS+pupeteer(Browser Control) it is a good fit while it solves not all problems that we solve as for example open-pwa:// integration it is a big game changer 

"the idea is amazing i am shoked that i did not have it" Quoted from Frank Lemanschik

There is a discussion in https://news.ycombinator.com/item?id=18355345 which shows that Open-PWA is still the way to go as it manages the nodejs or serverside dependency while chrome manages updates it self.
- https://github.com/GoogleChromeLabs/carlo

We Are more then happy to announce that we will keep that functionality running and will reuse it as Carlo is not maintained anymore we adopted it's code and made a ECMAScript 6+ version out of it to keep maintance overhead low. We will publish that under @open-pwa/carlo@>0.10.0


## Current backend Runtime Integrations
- [ ] unraid
- [ ] open-stack
- [ ] kubernetes
- [ ] docker
- [ ] nodejs
- [ ] nodejs-mobile
- [ ] wasmer

## Evaluation
- [ ] deno
- [ ] cordova-webserver-plugin


## Permissions - Application based Permissions on the Host

## Service Workers - as Deployment Package

## Run a PWA on a None Browser based Runtime
We can expect a RasPI with a small lcd screen to display a scrolling text without a browser.
- The RasPI will need to call a app based on the url if a new service worker gets deployed.

## Remote API Polyfills
- wasi
  - Run wasm in a browser client with access to a remote resource as would it be the local environment.
- chrome
  - run a uwasi remote host and expose that as the current browser to JS
  
This will make service worker driven pwa and pssa work.

## PSSA - Progressive Server Side Applications
they will get deployed via installation of a remote serviceworker.
  
## What and Why?
We will research and create an environment agnostic way to run PWA's in browsers that do not support them. we will offer a permission-based API and implement all the functionality that chrome offers for a PWA.

so this will be a single daemon or app or server it is not so important how we name that. It will expose API's that a remote website can call to request a local installation and use of existing Platform features.

The Implementation will be written in JS the First Prototype will be NodeJs based and later we expand it to GraalJs to get it even more embedded able while keeping the code understandable by all ECMAScript knowing people,

## Concepts open-pwa runtime
- open-pwa runtime runs on a remote host or the local desktop pc
- It offers a service worker deployment interfaces open-pwa://my-app-id and <protocol>://open-pwa/my-app-id
    - grpc endpoint 
    - http2 endpoint
    - websockets endpoint
- It offers all browser related API's for PWA's like storage and others
- Current Implementation
  - (docker)NodeJS-(mobile) + Wasmer
  - Custom kublet implementation done via rust 
- First Implamentations JS+WASM
  - [upwa](https://github.com/direktspeed/upwa) rust + wasmer + deno
  - [uwasi](https://github.com/direktspeed/uwasi) offers wasmer-js Platform bindings.
  - graalvm and also node-graalvm https://github.com/lazar-mitrovic/GraalREPL
  - nodejs + [es-permissions](https://github.com/direktspeed/es-permissions) can be used for the first implamentation
- API's
  - run worker process
  - register desktop app 
  - listen on address device
  - systeminfo
  - user management (maybe reffered to the underlaying os not sure if we should implement it)

## What will Open-PWA Solve?
It will provide a ecosystem for a total new concept to deploy existing PWA's to diffrent Platforms then the Browser as also 
New Concepts for Live Updates and Deployments PSSA - Progressive Server Side Applications maybe it will be called PSSS - Progressive Server Side Services. of existing Applications Running. This is research on the new Container Caps of wasm also.
- permission system isolated access to device caps
- running processes on the device with access to os api's via unified api
- universal install system
- universal software update system
- supports nodejs, docker, kubernetes, open-stack, chrome

## Collaboration
Simply contact me via the issue section at present it is fast to get into the project as it is quit new :)


## History
This is an Open Source Effort it got initialized by Frank Lemanschik not on purpose because he has written that article
https://medium.com/@frank_lemanschik/is-it-all-about-the-package-manager-43077634124c?sk=1fdba664c3fdce60b3a5d4d10d0e8773

It Joins with a lot of my other projects that i was working on the last 20 years
- direktspeed server
- direktspeed os
- direktspeed serverless *
- serverless *

Into one giant open project OPEN-PWA That will hopefully deliver Expirences better then ever to the user.

## PREREQUISITES windows, linux, macos, Android Dev Only,IOS  Dev Only
bash,git,mv, rm, tr, type, curl/wget, base64, sudo (if not root),make (GNU)
tar (or unzip on OSX and Windows),
gpg (optional verification)

## Package Manager for the OS
- brew (macos)
- chocolatey (windows)
- apt (bash)(linux)



## Development Linux
Use existing n and pm2 installs maybe create a seperated user profile for testing

```bash
mkdir ~/.open-pwa
ln -s ~/n ~/.open-pwa
ln -s ~/.pm2 ~/.open-pwa

```


## Supported Package Formarts 
- appimage
- docker
- tar.gz
- git
