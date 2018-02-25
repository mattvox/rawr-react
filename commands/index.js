const fs = require('fs');
const path = require('path');

module.exports = function loadCommands(program) {
  const commands = {};
  const commandsPath = path.dirname(__filename);

  fs.readdirSync(commandsPath).filter(filename => (
    (/\.js$/.test(filename) && filename !== 'index.js')
  ).forEach((file) => {
      const name = file.substr(0, file.lastIndexOf('.'));
      const command = require(path.join(commandsPath, file));
      commands[name] = command(program);
    })
  );

  return commands;
};


	// Loop though command files
	fs.readdirSync(loadPath).filter(function (filename) {
		return (/\.js$/.test(filename) && filename !== 'index.js');
	}).forEach(function (filename) {
		var name = filename.substr(0, filename.lastIndexOf('.'));

		// Require command
		var command = require(path.join(loadPath, filename));

		// Initialize command
		commands[name] = command(program);
	});

	return commands;
};
