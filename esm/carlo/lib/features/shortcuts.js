export function install(hostWindow) {
  const ctrlOrCmdCodes = new Set(
      ['KeyD', 'KeyE', 'KeyD', 'KeyG', 'KeyN', 'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS',
       'KeyT', 'KeyW', 'KeyY', 'Tab', 'PageUp', 'PageDown', 'F4']);
  const cmdCodes = new Set(['BracketLeft', 'BracketRight', 'Comma']);
  const cmdOptionCodes = new Set(['ArrowLeft', 'ArrowRight', 'KeyB']);
  const ctrlShiftCodes = new Set(['KeyQ', 'KeyW']);
  const altCodes = new Set(['Home', 'ArrowLeft', 'ArrowRight', 'F4']);

  function preventDefaultShortcuts(event) {
    let prevent = false;
    if (navigator.userAgent.match(/Mac OS X/)) {
      if (event.metaKey) {
        if (event.keyCode > 48 && event.keyCode <= 57) // 1-9
          prevent = true;
        if (ctrlOrCmdCodes.has(event.code) || cmdCodes.has(event.code))
          prevent = true;
        if (event.shiftKey && cmdOptionCodes.has(event.code))
          prevent = true;
        if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
          if (!event.contentEditable && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA')
            prevent = true;
        }
      }
    } else {
      if (event.code === 'F4')
        prevent = true;
      if (event.ctrlKey) {
        if (event.keyCode > 48 && event.keyCode <= 57) // 1-9
          prevent = true;
        if (ctrlOrCmdCodes.has(event.code))
          prevent = true;
        if (event.shiftKey && ctrlShiftCodes.has(event.code))
          prevent = true;
      }
      if (event.altKey && altCodes.has(event.code))
        prevent = true;
    }

    if (prevent)
      event.preventDefault();
  }

  document.addEventListener('keydown', preventDefaultShortcuts, false);
  document.addEventListener('keydown', event => {
    if ((event.key === 'q' || event.key === 'Q') && (event.metaKey || event.ctrlKey)) {
      hostWindow.closeBrowser();
      event.preventDefault();
    }
  });
};
