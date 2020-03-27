# OPEN-PWA
An OpenSource Project to research and offer the ability to Port PWA Concepts to any Platform by providing the needed API's to legacy Platforms a dropin replacement for the electron framework that scales more well when multiple applications get executed on the same host. It offers a Total new way of Deployment and Application update concepts.

## News 
cordova-webserver-plugin as a 




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

This is an Open Source Effort it got initialized by Frank Lemanschik not on purpose because he has written that article
https://medium.com/@frank_lemanschik/is-it-all-about-the-package-manager-43077634124c?sk=1fdba664c3fdce60b3a5d4d10d0e8773

## Concepts open-pwa runtime
- open-pwa runtime runs on a remote host or the local desktop pc
- It offers a service worker deployment interface
- It offers all browser related API's for PWA's like storage and others
- First Implamentations JS+WASM
  - nodejs + [es-permissions](https://github.com/direktspeed/es-permissions) can be used for the first implamentation
  - [upwa](https://github.com/direktspeed/upwa) rust + wasmer + deno
  - [uwasi](https://github.com/direktspeed/uwasi) offers wasmer-js Platform bindings.
  - graalvm and also node-graalvm


## What will Open-PWA Solve?
It will provide a ecosystem for a total new concept to deploy existing PWA's to diffrent Platforms then the Browser as also 
New Concepts for Live Updates and Deployments PSSA - Progressive Server Side Applications maybe it will be called PSSS - Progressive Server Side Services. of existing Applications Running. This is research on the new Container Caps
of wasm also.
