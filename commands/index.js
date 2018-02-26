/*
*****************************************************************
Performs loading of commands dynamically. Unsure if dynamic imports
will create a problem with testing in the future. Feedback/more research
required.
*****************************************************************
*/

// eslint-disable global-require
// eslint-disable import/no-dynamic-require

// const fs = require('fs');
// const path = require('path');
//
// module.exports = function loadCommands(program) {
//   const commands = {};
//   const commandsPath = path.dirname(__filename);
//
//   fs.readdirSync(commandsPath).filter(filename => (
//     (/\.js$/.test(filename) && filename !== 'index.js')
//   )).forEach((file) => {
//     const name = file.substr(0, file.lastIndexOf('.'));
//     const command = require(path.join(commandsPath, file));
//     commands[name] = command(program);
//   });
//
//   return commands;
// };
