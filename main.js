const electron = require('electron')
const fs = require('fs')
const path = require('path')
const app = electron.app // Module to control application life.
const BrowserWindow = electron.BrowserWindow // Module to create native browser window.

var userDataPath = app.getPath('userData')

const browserPage = 'file://' + __dirname + '/index.html'

var mainWindow = null
var appIsReady = false

var saveWindowBounds = function () {
  if (mainWindow) {

    fs.writeFile(path.join(userDataPath, 'windowBounds.json'), JSON.stringify(mainWindow.getBounds()))
  }
}

function sendIPCToWindow(window, action, data) {
  // if there are no windows, create a new one
  if (!mainWindow) {
    createWindow(function () {
      mainWindow.webContents.send(action, data || {})
    })
  } else {
    mainWindow.webContents.send(action, data || {})
  }
}

function openTabInWindow (url) {
  sendIPCToWindow(mainWindow, 'addTab', {
    url: url
  })
}

function createWindow (cb) {
  var saveBounds = fs.readFile(path.join(userDataPath, 'windowBounds.json'), 'utf-8', function (e, data) {
    if (e || !data) { // there was an error, probably because the file doesn't exist
      var size = electron.screen.getPrimaryDisplay().workAreaSize
      var bounds = {
        x: 0,
        y: 0,
        width: size.width,
        height: size.height
      }
    } else {
      var bounds = JSON.parse(data)
    }

// maximizes the window frame in windows 10
// fixes https://github.com/minbrowser/min/issues/214
// should be removed once https://github.com/electron/electron/issues/4045 is fixed
    if (process.platform === 'win32') {
      if ((bounds.x === 0 && bounds.y === 0) || (bounds.x === -8 && bounds.y === -8)) {
        var screenSize = electron.screen.getPrimaryDisplay().workAreaSize
        if ((screenSize.width === bounds.width || bounds.width - screenSize.width === 16) && (screenSize.height === bounds.height || bounds.height - screenSize.height === 16)) {
          var shouldMaximize = true
        }
      }
    }

    createWindowWithBounds(bounds, shouldMaximize)

    if (cb) {
      cb()
    }
  })
}

function createWindowWithBounds (bounds, shouldMaximize) {
  mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    minWidth: 320,
    minHeight: 500,
    titleBarStyle: 'hidden-inset',
    icon: __dirname + '/icons/icon256.png'
  })

  // and load the index.html of the app.
  mainWindow.loadURL(browserPage)

  if (shouldMaximize) {
    mainWindow.maximize()
  }

  // save the window size for the next launch of the app
  mainWindow.on('close', function () {
    saveWindowBounds()
  })

  // 处理窗口关闭
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  return mainWindow
}

// Electron初始化完成
app.on('ready', function (){
  appIsReady = true

  createWindow(function () {

  })

  createAppMenu()
  createDockMenu()
})

// 处理退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/**
 * Emitted when the application is activated, which usually happens when clicks on the applications's dock icon
 * https://github.com/electron/electron/blob/master/docs/api/app.md#event-activate-os-x
 *
 * Opens a new tab when all tabs are closed, and min is still open by clicking on the application dock icon
 */
app.on('activate', ( /* e, hasVisibleWindows */) => {
  if (!mainWindow && appIsReady) { // sometimes, the event will be triggered before the app is ready, and creating new windows will fail
    createWindow()
  }
})

function createAppMenu () {
  // create the menu. based on example from http://electron.atom.io/docs/v0.34.0/api/menu/
  var Menu = electron.Menu
  var MenuItem = electron.MenuItem

  var template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Tab',
          accelerator: 'CmdOrCtrl+t',
          click: function (item, window) {
            sendIPCToWindow(window, 'addTab')
          }
        },
        {
          label: 'New Private Tab',
          accelerator: 'shift+CmdOrCtrl+p',
          click: function (item, window) {
            sendIPCToWindow(window, 'addPrivateTab')
          }
        },
        {
          label: 'New Task',
          accelerator: 'CmdOrCtrl+n',
          click: function (item, window) {
            sendIPCToWindow(window, 'addTask')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Save Page As',
          accelerator: 'CmdOrCtrl+s',
          click: function (item, window) {
            sendIPCToWindow(window, 'saveCurrentPage')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Print',
          accelerator: 'CmdOrCtrl+p',
          click: function (item, window) {
            sendIPCToWindow(window, 'print')
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
        {
          type: 'separator'
        },
        {
          label: 'Find',
          accelerator: 'CmdOrCtrl+F',
          click: function (item, window) {
            sendIPCToWindow(window, 'findInPage')
          }
        }
      ]
    },
    /* these items are added by os x */
    {
      label: 'View',
      submenu: [
        {
          label: 'Zoom in',
          accelerator: 'CmdOrCtrl+=',
          click: function (item, window) {
            sendIPCToWindow(window, 'zoomIn')
          }
        }
      ]
    },
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Reload Browser',
          accelerator: undefined,
          click: function (item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        {
          label: 'Inspect browser',
          click: function (item, focusedWindow) {
            if (focusedWindow) focusedWindow.toggleDevTools()
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Inspect page',
          accelerator: (function () {
            if (process.platform == 'darwin')
              return 'Cmd+Alt+I'
            else
              return 'Ctrl+Shift+I'
          })(),
          click: function (item, window) {
            sendIPCToWindow(window, 'inspectPage')
          }
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Keyboard Shortcuts',
          click: function () {
            openTabInWindow('https://github.com/minbrowser/min/wiki#keyboard-shortcuts')
          }
        },
        {
          label: 'Report a Bug',
          click: function () {
            openTabInWindow('https://github.com/minbrowser/min/issues/new')
          }
        },
        {
          label: 'Take a Tour',
          click: function () {
            openTabInWindow('https://minbrowser.github.io/min/tour/')
          }
        },
        {
          label: 'View on GitHub',
          click: function () {
            openTabInWindow('https://github.com/minbrowser/min')
          }
        }
      ]
    }
  ]

  // preferences item on linux and windows

  if (process.platform !== 'darwin') {
    template[1].submenu.push({
      type: 'separator'
    })

    template[1].submenu.push({
      label: 'Preferences',
      accelerator: 'CmdOrCtrl+,',
      click: function (item, window) {
        sendIPCToWindow(window, 'addTab', {
          url: 'file://' + __dirname + '/pages/settings/index.html'
        })
      }
    })
  }

  var menu = new Menu()

  menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function createDockMenu () {
  // create the menu. based on example from https://github.com/electron/electron/blob/master/docs/tutorial/desktop-environment-integration.md#custom-dock-menu-macos
  if (process.platform === 'darwin') {

  }
}