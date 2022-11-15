const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const os = require('os');
const pty = require('node-pty');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 1500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (canceled) {
      return
    } else {
      return filePaths[0]
    }
  };

  function launchTerminal() {
    console.log('Inside launchTerminal()')

    return new Terminal({
      fontFamily: 'Fira Code, Iosevka, monospace',
      fontSize: 12,
      experimentalCharAtlas: 'dynamic'
    });
/*
    const ptyProc = pty.spawn(os.platform() === 'win32' ? 'powershell.exe' : process.env.SHELL || '/bin/bash', [], {
      cols: term.cols,
      rows: term.rows
    });

    term.on('data', data => {
        ptyProc.write(data);
    });

    term.on('resize', size => {
        ptyProc.resize(
            Math.max(size ? size.cols : term.cols, 1),
            Math.max(size ? size.rows : term.rows, 1)
        );
    });

    ptyProc.on('data', data => {
      term.write(data);
    });
*/
  }

  // pattern 1
  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  });

  // pattern 2
  ipcMain.handle('dialog:openFile', handleFileOpen);

  // SSH terminal
  ipcMain.handle('newTerminal', launchTerminal);
  
  win.loadFile('index.html');

};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});