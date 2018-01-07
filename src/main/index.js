import {globalShortcut, app, BrowserWindow, ipcMain, dialog } from 'electron'
import storage from 'electron-json-storage'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    // frame: false
  })
  mainWindow.setFullScreen(true);
  globalShortcut.register('ESC', () => {
      mainWindow.setFullScreen(false);
  })

  mainWindow.loadURL(winURL)
  //快捷键
  globalShortcut.register('CommandOrControl+E',()=>{
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, function (files) {
      // if (files) event.sender.send('selected-directory', files)
      if(files && files.length >0){
        storage.set('configPath',files[0])
        event.sender.send('setConfigPath',files[0])
      }
    }) 
  })
  
  //check config
  ipcMain.on('getConfigPath',(event)=>{
    storage.get('configPath',(err,path)=>{
      if(err) return console.log(err)
      if(path && path.length){
        event.sender.send('setConfigPath',path)
      }else{
        dialog.showOpenDialog({
          properties: ['openDirectory']
        }, function (files) {
          // if (files) event.sender.send('selected-directory', files)
          if(files && files.length> 0){
            storage.set('configPath',files[0])
            event.sender.send('setConfigPath',files[0])
          }
        })
      }
    })
  })
  // console.log('-=====checkconfig')
  // storage.get('configPath',(err,path)=>{
  //   if(err) return console.error(err)

  //   if(path && path.length) {

  //   }else{
  //     //select config
  //     ipcMain.send('configPath','test')
  //   }
  // })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
