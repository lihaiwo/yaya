/* defines keybindings that aren't in the menu (so they aren't defined by menu.js). For items in the menu, also handles ipc messages */

ipc.on('inspectPage', function () {
  getWebview(tabs.getSelected()).openDevTools()
})