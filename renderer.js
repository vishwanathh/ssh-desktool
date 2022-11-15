const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

/* Set Title feature */
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});

/* Open file dialog feature */
const openButton = document.getElementById('openbtn')
const filePathElement = document.getElementById('filePath')

openButton.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})

/* SSH term launch feature */
const sshButton = document.getElementById('sshbutton');
const terminalElem = document.getElementById('terminal');

sshButton.addEventListener('click', () => {
  const terminal = window.electronAPI.newTerminal();
  console.log(terminal);
  terminal.open(terminalElem)

})

/*
function launchTerminal() {
  alert('button clicked')
 
  

  appcontext.term.open(terminalElem);

  const ptyProc = appcontext.ptyspawn(appcontext.osplatform() === 'win32' ? 'powershell.exe' : versions.shell() || '/bin/bash', [], {
      cols: appcontext.term.cols,
      rows: appcontext.term.rows
  });

  term.on('data', data => {
      ptyProc.write(data);
  });

  appcontext.term.on('resize', size => {
      ptyProc.resize(
          Math.max(size ? size.cols : appcontext.term.cols, 1),
          Math.max(size ? size.rows : appcontext.term.rows, 1)
      );
  });

  ptyProc.on('data', data => {
    appcontext.term.write(data);
  });

} */



