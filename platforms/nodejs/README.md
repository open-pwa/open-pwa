# NodeJS Platform Related Code
We will use n as the installer of choice

## The NodeJS Auto Update Problem
- if you run nodejs via docker you will never have it as you can replace the nodejs version
  - docker pull node:latest && docker run -v $PWD:/myapp node:latest node /myapp
- if you use the curl -L https://git.io/n-install | bash or brew install n
  - n latest && node your-app.js 
- (Windows) https://github.com/coreybutler/nvm-windows 
- on android we need to maintain lib-node versions so with every open-pwa release the most current node lts gets used.