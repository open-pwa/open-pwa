import {fstat, promises as fs } from 'fs'
if (url === null) throw 'no url supplied'
if (binaryPath === null) throw 'no binary path supplied'
if (launcherName === null) throw 'no launcher name supplied'
//:Array<Promise<string>>
const iconGenerationPromises = iconSizes.map((size) => new Promise((resolve, reject) => {
  sharp(pngOutPath)
    .resize(size, size)
    .toBuffer()
    .then((resizedIconData) => {
      if (!test('-d', getLinuxInstallationDesktopFilesIconFilesPath(size, true))) {
        mkdir(getLinuxInstallationDesktopFilesIconFilesPath(size, true))
      }
      if (!test('-d', getLinuxInstallationDesktopFilesIconFilesPath(size))) {
        mkdir(getLinuxInstallationDesktopFilesIconFilesPath(size))
      }
      writeFile(
        `${getLinuxInstallationDesktopFilesIconFilesPath(size)}/${binaryName}.png`,
        resizedIconData,
        { mode: 0o666, flag: 'w' },
        (err) => {
          if (err) {
            return reject(err)
          } else {
            this.log(`Icon file of ${size}x${size} generated...`)
            resolve(`${getLinuxInstallationDesktopFilesIconFilesPath(size)}/${binaryName}.png`)
          }
        }
      )
    })
    .catch((err) => {
      return reject(err)
    })
}))
Promise.all(iconGenerationPromises)
  .then((iconPaths) => {
    const dotDesktop = `[Desktop Entry]
    Type=Application
    Name=${launcherName}
    Exec=${binaryPath}
    Icon=${binaryName}
    Terminal=false`
    const shortcutPath = `${getLinuxInstallationDesktopFilesPath()}/${binaryName}.desktop`
    fs.writeFile(shortcutPath,dotDesktop).then(()=>{
        this.log('Desktop file generated...')
        this.log('Shortcut installation complete...')
        this.log('To remove installation of shortcut, remove following files:')
        this.log(`${getLinuxInstallationDesktopFilesPath()}/${binaryName}.desktop`)
        iconPaths.forEach((iconPath) => {
          this.log(iconPath)
        })
    })
    
  })
  .catch((err) => {
    throw err
  })