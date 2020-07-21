import { platform as osPlatform, type as platformType, release as platformRelease } from 'o
const guranteeSemverFormat = (version) => {
    if (version.split('.').length === 2) {
        version += '.0'
    }
    return version
}

const isLessThanWin8 =() => (platformType() === 'Windows_NT' && semver.satisfies(guranteeSemverFormat(platformRelease()), '<6.2.9200'))

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