# OPEN-PWA Platform turns any device into a Cloud!
Get Reach and Power with your Hybrid Apps on any Device and Scale! A Universal Entire Operating System Platform Interface and Framework!

Open Pwa is a Platform that runs on Any Device with a easy installer and then allows you to run WebSites and Applications with Nativ Capabilitys.
It has a Permission System, Window,Task, Prozess Manager, Install & Update Api Inspired by ServiceWorker Concepts.

It can change everything as a Open Platform to port your existing software or create new Software with the most Efficent Open Source Frameworks around.

It Also Offers its own Formart for Cloud Deployments any device can be part of any cloud or its own cloud.
Platform by providing the needed API's to legacy Platforms a dropin replacement for the electron framework that scales more well when multiple applications get executed on the same host. It offers a Total new way of Deployment and Application update concepts.


## https://oam.dev/
An App-centric Model
1. Application first - the platform is built around a self-contained app model, where operational characteristics are also part of app definition, free of infrastructure here.
2. Clarity and extensibility - an open standard to modularize your platform capabilities into reusable pieces, with freedom to bring your own abstractions and implementations.
3. Runtime agnostic - a consistent experience to deploy and operate your apps across on-prem clusters, cloud providers or even edge devices.



## Information for Google Carlo Users
As Google Carlo is deprecated we will offer @open-pwa/carlo with the same and more abilitys which will get maintained as it is a shared dependencie of oepen-pwa that can run standalone simply use ```npm i @open-pwa/carlo``` inside open-pwa/packages/carlo you can find readme.md and additional explainations.


# Open PWA Compared with WebView2, Electron, NW.JS and so on
- Electron apps More Efficent and allows to run them directly on open-pwa without a indipendent electron installation. Adds Open Pwa Features!
- WebView2 Allows Hybrid Apps while OPEN-PWA is a Hybrid App Platform it allows to turn Hybrid Apps and even Websites Into Nativ Apps!
- HashiCorp Terraform Compatible Syntax Support! Enables Remote Deployments of Terraform Specs.

There is a discussion in https://news.ycombinator.com/item?id=18355345 which shows that Open-PWA is still the way to go as it manages the nodejs or serverside dependency while chrome manages updates it self.

We Are more then happy to announce that we will keep that functionality running and will reuse it as Carlo is not maintained anymore we adopted it's code and made a ECMAScript 6+ version out of it to keep maintance overhead low. We will publish that under @open-pwa/carlo@>0.10.0


## Current backend Runtime Integrations
- [x] electron
- [ ] unraid
- [x] open-stack
- [x] kubernetes
- [x] docker
- [x] nodejs (Including Java InterOp via node-graalvm)
- [x] os nativ apps
- [ ] nodejs-mobile
- [ ] wasmer

## Evaluation
- [ ] weex
- [ ] QT
- [ ] wxWidgets
- [x] deno
- [ ] cordova


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
- It offers a service worker deployment interface open-pwa://my-app-id and <protocol>://open-pwa/my-app-id that exposes *.<my-app-id> 
    - additional on ip:port for restricted deployments without access to dns or host protocol services.
      - grpc endpoint 
      - http2 endpoint
      - websockets endpoint
- It offers all browser related API's for PWA's like storage and others
- Custom kublet implementation done via rust

- First Implamentations JS+WASM
  - ECMAScript 6+ Modules Compatible for NodeJS (mobile) (graalvm) Based Host Platform
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
