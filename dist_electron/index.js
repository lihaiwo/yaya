/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {}
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__ (moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if (installedModules[moduleId]) {
      /******/ 			return installedModules[moduleId].exports
      /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
      /******/ 			i: moduleId,
      /******/ 			l: false,
      /******/ 			exports: {}
      /******/ 		}
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports
    /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function (exports, name, getter) {
    /******/ 		if (!__webpack_require__.o(exports, name)) {
      /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter })
      /******/ 		}
    /******/ 	}
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function (exports) {
    /******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
      /******/ 		}
    /******/ 		Object.defineProperty(exports, '__esModule', { value: true })
    /******/ 	}
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function (value, mode) {
    /******/ 		if (mode & 1) value = __webpack_require__(value)
    /******/ 		if (mode & 8) return value
    /******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value
    /******/ 		var ns = Object.create(null)
    /******/ 		__webpack_require__.r(ns)
    /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value })
    /******/ 		if (mode & 2 && typeof value !== 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key] }.bind(null, key))
    /******/ 		return ns
    /******/ 	}
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function (module) {
    /******/ 		var getter = module && module.__esModule
    /******/ 			? function getDefault () { return module['default'] }
    /******/ 			: function getModuleExports () { return module }
    /******/ 		__webpack_require__.d(getter, 'a', getter)
    /******/ 		return getter
    /******/ 	}
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property) }
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = ''
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 0)
/******/ })
/************************************************************************/
/******/ ({

/***/ './src/main/main.js':
  /*! **************************!*\
  !*** ./src/main/main.js ***!
  \**************************/
  /*! no static exports found */
  /***/ function (module, exports, __webpack_require__) {
    eval("\n// Modules to control application life and create native browser window\nconst {app, Menu, BrowserWindow} = __webpack_require__(/*! electron */ \"electron\")\nconst template = __webpack_require__(/*! ./menu */ \"./src/main/menu.js\")\n\nif (process.platform === 'darwin') {\n  template.unshift({\n    label: app.getName(),\n    submenu: [\n      { role: 'about' },\n      { type: 'separator' },\n      { role: 'services' },\n      { type: 'separator' },\n      { role: 'hide' },\n      { role: 'hideothers' },\n      { role: 'unhide' },\n      { type: 'separator' },\n      { role: 'quit' }\n    ]\n  })\n}\nconst menu = Menu.buildFromTemplate(template)\nMenu.setApplicationMenu(menu)\n\n// Keep a global reference of the window object, if you don't, the window will\n// be closed automatically when the JavaScript object is garbage collected.\nlet mainWindow\n\nfunction createWindow () {\n  // Create the browser window.\n  mainWindow = new BrowserWindow({\n    width: 800,\n    height: 600,\n    webPreferences: {\n      nodeIntegration: true\n    }\n  })\n\n  if (true) {\n    // Load the url of the dev server if in development mode\n    mainWindow.loadURL(\"http://localhost:8080\")\n    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()\n  } else {}\n\n  // Open the DevTools.\n  mainWindow.webContents.openDevTools()\n\n  // Emitted when the window is closed.\n  mainWindow.on('closed', function () {\n    // Dereference the window object, usually you would store windows\n    // in an array if your app supports multi windows, this is the time\n    // when you should delete the corresponding element.\n    mainWindow = null\n  })\n}\n\n// This method will be called when Electron has finished\n// initialization and is ready to create browser windows.\n// Some APIs can only be used after this event occurs.\napp.on('ready', createWindow)\n\n// Quit when all windows are closed.\napp.on('window-all-closed', function () {\n  // On macOS it is common for applications and their menu bar\n  // to stay active until the user quits explicitly with Cmd + Q\n  if (process.platform !== 'darwin') app.quit()\n})\n\napp.on('activate', function () {\n  // On macOS it's common to re-create a window in the app when the\n  // dock icon is clicked and there are no other windows open.\n  if (mainWindow === null) createWindow()\n})\n\n// In this file you can include the rest of your app's specific main process\n// code. You can also put them in separate files and require them here.\n\n//# sourceURL=webpack:///./src/main/main.js?")
    /***/ },

  /***/ './src/main/menu.js':
  /*! **************************!*\
  !*** ./src/main/menu.js ***!
  \**************************/
  /*! no static exports found */
  /***/ function (module, exports) {
    eval("module.exports = [\n  {\n    label: '工具',\n    submenu: [\n      { label:'打开调试工具',role: 'toggledevtools' },\n      { label:'刷新',role: 'reload' },\n    ]\n  },\n]\n\n//# sourceURL=webpack:///./src/main/menu.js?")
    /***/ },

  /***/ 0:
  /*! ********************************!*\
  !*** multi ./src/main/main.js ***!
  \********************************/
  /*! no static exports found */
  /***/ function (module, exports, __webpack_require__) {
    eval('module.exports = __webpack_require__(/*! /Users/lihaiwo/Documents/test/electron/yaya/src/main/main.js */"./src/main/main.js");\n\n\n//# sourceURL=webpack:///multi_./src/main/main.js?')
    /***/ },

  /***/ 'electron':
  /*! ***************************!*\
  !*** external "electron" ***!
  \***************************/
  /*! no static exports found */
  /***/ function (module, exports) {
    eval('module.exports = require("electron");\n\n//# sourceURL=webpack:///external_%22electron%22?')
    /***/ }

/******/ })
