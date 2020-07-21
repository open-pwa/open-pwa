#!/usr/bin/env bash
# Usage: curl -L https://git.io/n-install | bash
#
#                  PM2 Installer Script
#
#   Homepage: http://getpm2.com
#   Issues:   http://github.com/Unitech/pm2
#   Requires: bash, mv, rm, tr, type, curl/wget, base64, sudo (if not root)
#             tar (or unzip on OSX and Windows), gpg (optional verification)
#
# This script safely installs PM2 into your PATH (which may require
# password authorization). Assuming a non-commercial license, use it
# like this:
#
#	$ curl http://getpm2.com | bash
#	 or
#	$ wget -qO- http://getpm2.com | bash
#
# The syntax is:
#
#	bash -s [public key] [private key] [machine name]
#
#
# And the same argument syntax applies.
# In automated environments, you may want to run as root.
# If using curl, we recommend using the -fsSL flags.
#
# This should work on Mac, Linux, and BSD systems, and
# hopefully Windows with Cygwin. Please open an issue if
# you notice any bugs.
#

[[ $- = *i* ]] && echo "Don't source this script!" && return 10

RED="\033[1;31m"
LIGHT_RED="\033[0;31m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
CYAN="\033[1;36m"
WHITE="\033[1;37m"
WHITE_BOLD="\033[1;37m"
NO_COLOUR="\033[0m"

CHECK_MARK="\033[0;32m\xE2\x9C\x94\033[0m"

log_start() {
    echo ''
    printf '\033[1A'
    printf "$CYAN[~]$NO_COLOUR $1" && printf '\r\033[1B'
}

log_end() {
    printf '\033[1A'
    printf '\033[0K'
    echo -e "$GREEN[$CHECK_MARK$GREEN]$NO_COLOUR $1"
}

log_fail() {
    printf '\033[1A'
    printf '\033[0K'
    echo -e "$RED[x$RED]$NO_COLOUR $1"
}

install_pm2()
{
    echo -e "$WHITE_BOLD> Welcome to the PM2 auto installer"
    echo""
    trap 'echo -e "Aborted, error $? in command: $BASH_COMMAND"; trap ERR; exit 1' ERR
    pm2_io_public="$1"
    pm2_io_secret="$2"
    pm2_io_machine_name="$3"

    if [ "$3" == "" ]; then
        pm2_io_machine_name="$HOSTNAME"
    fi

    install_path="/usr/share"
    bin_path="/usr/bin"
    pm2_os="unsupported"
    pm2_arch="unknown"
    pm2_arm=""
    current_user=$USER
    current_user_home=$HOME

    # Valid license declaration is required
    # if [[ "$pm2_license" != "personal" && "$pm2_license" != "commercial" ]]; then
    #   echo "You must specify a personal or commercial license; see getpm2.com for instructions."
    #   return 9
    # fi

    log_start "Checking System"
    # Termux on Android has $PREFIX set which already ends with /usr
    if [[ -n "$ANDROID_ROOT" && -n "$PREFIX" ]]; then
        install_path="$PREFIX/bin"
    fi
    # Fall back to /opt if necessary
    if [[ ! -d $install_path ]]; then
        install_path="/opt"
    fi

    # Fall back to /usr/bin if necessary
    if [[ ! -d $bin_path ]]; then
        bin_path="/usr/bin"
    fi

    # Not every platform has or needs sudo (https://termux.com/linux.html)
    ((EUID)) && [[ -z "$ANDROID_ROOT" ]] && sudo_cmd="sudo"

    #########################
    # Which OS and version? #
    #########################

    pm2_bin="pm2"
    pm2_dl_ext=".tar.gz"

    # NOTE: `uname -m` is more accurate and universal than `arch`
    # See https://en.wikipedia.org/wiki/Uname
    unamem="$(uname -m)"
    if [[ $unamem == *aarch64* ]]; then
        pm2_arch="arm64"
    elif [[ $unamem == *64* ]]; then
        pm2_arch="amd64"
    elif [[ $unamem == *ppc* ]]; then
        pm2_arch="ppc64le"
    elif [[ $unamem == *s390* ]]; then
        pm2_arch="s390x"
    elif [[ $unamem == *armv7l* ]]; then
        pm2_arch="armv7l"
    else
        if ! [ -x "$(command -v npm)" ]; then
            log_fail "Aborted, unsupported or unknown architecture: $unamem"
            log_fail "Try to install pm2 with"
            log_fail "$ npm install pm2@latest -g"
            exit 1
        fi

        log_fail "Architecture unsupported: $unamem"
        log_fail "Installing via NPM"
        npm install pm2@latest -g
        pm2 ls
        return 2
    fi

    # elif [[ $unamem == *armv6l* ]]; then
    #   pm2_arch="armv6l"
    # elif [[ $unamem == *armv5* ]]; then
    #   pm2_arch="armv5"

    unameu="$(tr '[:lower:]' '[:upper:]' <<<$(uname))"
    if [[ $unameu == *DARWIN* ]]; then
        install_path="/usr/local"
        bin_path="/usr/local/bin"
        pm2_os="darwin"
        vers=$(sw_vers)
        version=${vers##*ProductVersion:}
        IFS='.' read OSX_MAJOR OSX_MINOR _ <<<"$version"

        # Major
        if ((OSX_MAJOR < 10)); then
            log_fail "Aborted, unsupported OS X version (9-)"
            return 3
        fi
        if ((OSX_MAJOR > 10)); then
            log_fail "Aborted, unsupported OS X version (11+)"
            return 4
        fi

        # Minor
        if ((OSX_MINOR < 5)); then
            log_fail "Aborted, unsupported OS X version (10.5-)"
            return 5
        fi
    elif [[ $unameu == *LINUX* ]]; then
        pm2_os="linux"
    elif [[ $unameu == *FREEBSD* ]]; then
        pm2_os="freebsd"
    elif [[ $unameu == *OPENBSD* ]]; then
        pm2_os="openbsd"
    elif [[ $unameu == *WIN* || $unameu == MSYS* ]]; then
        # Should catch cygwin
        sudo_cmd=""
        pm2_os="windows"
        pm2_dl_ext=".zip"
        pm2_bin=$pm2_bin.exe
    else
        log_fail "Aborted, unsupported or unknown os: $uname"
        return 6
    fi

    log_end "Detected sys=$pm2_os arch=$pm2_arch"
    ########################
    # Download and extract #
    ########################

    pm2_file="pm2_${pm2_os}_${pm2_arch}${pm2_arm}_custom${pm2_dl_ext}"
    qs="license=${pm2_license}&plugins=${pm2_plugins}&access_codes=${pm2_access_codes}"

    pm2_url="http://getpm2.com/latest/${pm2_os}/${pm2_arch}.tar.gz"

    # Use $PREFIX for compatibility with Termux on Android
    dl="$PREFIX/tmp/$pm2_file"
    #rm -rf -- "$dl"

    log_start "Downloading PM2 for ${pm2_os}/${pm2_arch}${pm2_arm}..."

    if type -p curl >/dev/null 2>&1; then
        curl -fSL --progress-bar "$pm2_url" -u "$PM2_ACCOUNT_ID:$PM2_API_KEY" -o "$dl"
        ((gpg)) && curl -fsSL "$pm2_asc" -u "$PM2_ACCOUNT_ID:$PM2_API_KEY" -o "$dl.asc"
    elif type -p wget >/dev/null 2>&1; then
        wget --header "Authorization: Basic $(echo -ne "$PM2_ACCOUNT_ID:$PM2_API_KEY" | base64)" "$pm2_url" -O "$dl"
        ((gpg)) && wget --quiet --header "Authorization: Basic $(echo -ne "$PM2_ACCOUNT_ID:$PM2_API_KEY" | base64)" "$pm2_asc" -O "$dl.asc"
    else
        log_fail "Aborted, could not find curl or wget"
        return 7
    fi

    log_end "Downloaded"

    log_start "Extracting from $pm2_file to $PREFIX/tmp"
    case "$pm2_file" in
        *.zip)    unzip -o "$dl" "$pm2_bin" -d "$PREFIX/tmp/" ;;
        *.tar.gz) tar -xzf "$dl" -C "$PREFIX/tmp/" --strip 1 ;;
    esac
    log_end "Source files extracted"

    if [ -d "$install_path/$pm2_bin" ]; then
        log_start "Backuping previous PM2 version"
        $sudo_cmd rm -rf /tmp/backup
        $sudo_cmd mv "$install_path/$pm2_bin" "/tmp/backup"
        $sudo_cmd rm -rf "$install_path/$pm2_bin"
        log_end "Backup done"
    fi

    log_start "Installing (may require password)"
    $sudo_cmd cp -r "$PREFIX/tmp/$pm2_bin" "$install_path/$pm2_bin"
    $sudo_cmd rm -f "$bin_path/$pm2_bin"
    $sudo_cmd ln -fs "$install_path/$pm2_bin/pm2" "$bin_path/$pm2_bin"
    log_end "Installed"

    # check installation
    log_start "Installed version:"
    $pm2_bin -version

    log_start "Configuring to start PM2 at boot"
    $sudo_cmd pm2 startup -u $current_user --hp $current_user_home -s
    log_end "Now initalized to startup at machine boot"
    log_start "Updating in memory PM2"
    $pm2_bin update -s
    log_end "In-memory PM2 updated to current version"
    $pm2_bin ls

    # On start/stop/delete, auto dump process list
    $pm2_bin set pm2:autosave true

    if [[ "$pm2_io_public" != "" && "$pm2_io_secret" != "" ]]; then
        log_start "Connection to specified bucket on pm2.io...."
        $pm2_bin link $pm2_io_secret $pm2_io_public $pm2_io_machine_name
        log_end "This machine is now linked to remote dashboard https://app.pm2.io/#/r/$pm2_io_public"
    fi

    echo "PM2 Successfully installed"

    trap ERR
    return 0
}

gpg_verify_signature()
{
	  local fpr=${1:?fingerprint expected}
	  local sigpath=${2:?path expected}
	  local datapath=${3:-}
	  local tmpkeyring=$(mktemp)
	  trap 'rm -rf $tmpkeyring' RETURN
	  gpg -q --batch --export $fpr >$tmpkeyring
	  gpg -q --batch --verify --no-default-keyring --keyring $tmpkeyring -- $sigpath $datapath
}


install_pm2 "$@"