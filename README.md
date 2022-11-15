# ssh-desktool
desktop app for ssh audits tracking


Pre-requisites:
node.js and npm


cd {your-app-dir}
npm init

npm install electron --save-dev

npm run start

# other deps for packaging
npm install --save-dev @electron-forge/cli
npx electron-forge import


# Create Distribution
npm run make


** highly recommended for you to code sign your Electron app. Code signing is an important part of shipping desktop applications, and is mandatory for the auto-update step in the final part of the tutorial.

# For SSH terminal functions
npm install express node-pty socket.io
