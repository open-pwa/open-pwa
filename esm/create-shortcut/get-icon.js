import { platform as osPlatform, type as platformType, release as platformRelease } from 'os'
import { writeFile, existsSync } from 'fs'
import { dir as tempDir } from 'tmp'
import { cp, mv, echo, exec, pwd, cd, cat, mkdir, test, rm } from 'shelljs'
import fetch from 'node-fetch'
import pageIcon = require('page-icon')
import sharp = require('sharp')
import pngToIco = require('png-to-ico')
import ICO = require('icojs')
import dedent = require('dedent-js')
import semver = require('semver')
const icnsConvert = require('@fiahfy/icns-convert')
const createNodeAppWithoutTerminal = require('create-nodew-exe')
const windowsShortcut = require('windows-shortcuts')
const { exec: pkgExec } = require('pkg')

const placeholderAppName = 'quark-carlo-placeholder'
const iconSizes = [16, 24, 32, 48, 64, 72, 96, 128, 256]

const guranteeSemverFormat = (version:string) => {
  if (version.split('.').length === 2) {
    version += '.0'
  }
  return version
}
const isLessThanWin8 =() => {
  return (
    platformType() === 'Windows_NT' &&
    semver.satisfies(guranteeSemverFormat(platformRelease()), '<6.2.9200')
  )
}
const isLinux = () => osPlatform() === 'linux'
const isWindows = () => osPlatform() === 'win32'
const isMac = () => osPlatform() === 'darwin'
const getPlatform = () => {
  switch (osPlatform()) {
    case 'win32':
      return 'win'
    case 'darwin':
      return 'macos'
    case 'linux':
      return 'linux'
    default:
      return osPlatform()
  }
}
const getNormalizedPlatform = (platform:string) => platform !== 'host' ? platform : getPlatform()

const execPath = pwd().valueOf()

const getLinuxInstallationDesktopFilesPath = () => {
  cd()
  const homePath = pwd().valueOf()
  cd(execPath)
  return `${homePath}/.local/share/applications`
}

const getLinuxInstallationDesktopFilesIconFilesPath = (dimension:number, tillDimension:boolean = false) => {
  cd()
  const homePath = pwd().valueOf()
  cd(execPath)
  return `${homePath}/.local/share/icons/hicolor/${dimension}x${dimension}${tillDimension ? '' : '/apps'}`
}

const getWindowsInstallationStartMenuShortcutFilesPath = () => {
  cd()
  const homePath = pwd().valueOf()
  cd(execPath)
  return `${homePath}/AppData/Roaming/Microsoft/Windows/Start Menu/Programs`
}

const getMacOSApplicationsPath = () => {
  cd()
  const homePath = pwd().valueOf()
  cd(execPath)
  return `${homePath}/Applications`
}

const filenameSafe = (str:string) => str.replace(/[^a-z0-9]/gi, '_').toLowerCase()
const filenameSafeDisplayName = (str:string) => str.replace(/[^a-z0-9 ]/gi, '_')

const getProperPageIcon = (url:string):Promise<PageIcon.Icon> => new Promise((resolve, reject) => {
  pageIcon(url)
    .then((icon) => {
      if (icon === undefined) {
        return reject('icon fetch failed')
      }
      if (icon.ext.toLowerCase() !== '.png') {
        return reject('icon not png')
      }
      resolve(icon)
    })
    .catch(() => {
      return reject('size calculation failed')
    })
})

const getIconFiles = (
  url:string,
  log:Function,
  isIcoNeeded = true,
  isIcnsNeeded = true,
  {
    tempPngOutPath = null,
    tempIcoOutPath = null,
    tempIcnsOutPath = null,
    pngOutPath = null,
    icoOutPath = null,
    icnsOutPath = null,
  }:{
    tempPngOutPath:string|null,
    tempIcoOutPath:string|null,
    tempIcnsOutPath:string|null,
    pngOutPath:string|null,
    icoOutPath:string|null,
    icnsOutPath:string|null,
  },
) => new Promise((resolve, reject) => {
  log('Looking for appropriate icon image...')
  if (tempPngOutPath=== null || tempIcoOutPath === null || tempIcnsOutPath === null) {
    return reject('tempPngOutPath, tempIcoOutPath or tempIcnsOutPath not supplied')
  }
  if (pngOutPath === null) {
    return reject('pngOutPath not supplied')
  }
  getProperPageIcon(url)
    .then((icon) => {
      fetch(icon.source)
        .then(response => response.buffer())
        .then((pngBuf) => {
          writeFile(
            tempPngOutPath,
            pngBuf,
            (err) => {
              if (err) {
                reject('writing png file failed')
              } else {
                cp(tempPngOutPath, pngOutPath)
                log('Appropriate icon file saved...')
                if (isIcoNeeded) {
                  pngToIco(icon.source)
                    .then((icoBuf:any) => {
                      writeFile(
                        tempIcoOutPath,
                        icoBuf,
                        (err) => {
                          if (err) {
                            reject('writing ico file failed')
                          } else {
                            if (icoOutPath === null) {
                              reject('icoOutPath not supplied')
                            } else {
                              cp(tempIcoOutPath, icoOutPath)
                              log('Ico file generated...')
                              if (isIcnsNeeded) {
                                icnsConvert(pngBuf)
                                  .then((icnsBuf:any) => {
                                    writeFile(
                                      tempIcnsOutPath,
                                      icnsBuf,
                                      (err) => {
                                        if (err) {
                                          reject('writing icns file failed')
                                        } else {
                                          if (icnsOutPath === null) {
                                            reject('icnsOutPath not supplied')
                                          } else {
                                            cp(tempIcnsOutPath, icnsOutPath)
                                            log('Icns file generated...')
                                            resolve()
                                          }
                                        }
                                      },
                                    )
                                  })
                                  .catch((err:any) => reject(err))
                              } else {
                                resolve()
                              }
                            }
                          }
                        },
                      )
                    })
                    .catch((err:any) => reject(err))
                } else {
                  if (isIcnsNeeded) {
                    icnsConvert(pngBuf)
                    .then((icnsBuf:any) => {
                      writeFile(
                        tempIcnsOutPath,
                        icnsBuf,
                        (err) => {
                          if (err) {
                            reject('writing icns file failed')
                          } else {
                            if (icnsOutPath === null) {
                              reject('icnsOutPath not supplied')
                            } else {
                              cp(tempIcnsOutPath, icnsOutPath)
                              log('Icns file generated...')
                              resolve()
                            }
                          }
                        },
                      )
                    })
                    .catch((err:any) => reject(err))
                  } else {
                    resolve()
                  }
                }
              }
            },
          )
        })
        .catch((err:any) => reject(err))
    })
    .catch((err) => {
      log('Ico generation failed, falling back to using favicon.ico...')
      fetch(`${url}/favicon.ico`)
        .then(response => response.buffer())
        .then((icoBuf) => {
          writeFile(
            tempIcoOutPath,
            icoBuf,
            (err) => {
              if (err) {
                reject('writing ico file failed')
              } else {
                if (isIcoNeeded) {
                  if (icoOutPath === null) {
                    return reject('icoOutPath not supplied')
                  } else {
                    cp(tempIcoOutPath, icoOutPath)
                    log('Ico file saved...')
                  }
                }
                ICO.parse(icoBuf, 'image/png')
                  .then((images) => {
                    const largestImage = images.sort((a, b) => b.width - a.width)[0]
                    return sharp(Buffer.from(largestImage.buffer))
                      .resize(iconSizes[iconSizes.length - 1], iconSizes[iconSizes.length - 1])
                      .png()
                      .toBuffer()
                      .then((pngBuf) => {
                        writeFile(
                          tempPngOutPath,
                          pngBuf,
                          (err) => {
                            if (err) {
                              reject('writing png file failed')
                            } else {
                              cp(tempPngOutPath, pngOutPath)
                              log('Png icon file saved...')
                              if (isIcnsNeeded) {
                                icnsConvert(pngBuf)
                                .then((icnsBuf:any) => {
                                  writeFile(
                                    tempIcnsOutPath,
                                    icnsBuf,
                                    (err) => {
                                      if (err) {
                                        reject('writing icns file failed')
                                      } else {
                                        if (icnsOutPath === null) {
                                          reject('icnsOutPath not supplied')
                                        } else {
                                          cp(tempIcnsOutPath, icnsOutPath)
                                          log('Icns file generated...')
                                          resolve()
                                        }
                                      }
                                    },
                                  )
                                })
                                .catch((err:any) => reject(err))
                              } else {
                                resolve()
                              }
                            }
                          },
                        )
                      })
                      .catch((err) => {
                        throw err
                      })
                  })
                  .catch(() => reject('Converting favicon.ico into png failed'))
              }
            },
          )
        })
        .catch(() => reject('Saving favicon.ico failed'))
    })
})