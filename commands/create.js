const fs = require('fs');
const { execSync } = require('child_process');

const CURRENT_DIR = process.cwd();
const DEFAULT_TEMPLATE_PATH = 'git@github.com:mattvox/rawr-template-redux.git';

module.exports = function createCommand(program) {
  return program
    .command('create <name> [source]')
    .alias('-c')
    .description('Create a new React project from template')
    .action((name, source = DEFAULT_TEMPLATE_PATH) => {
      const path = `${CURRENT_DIR}/${name}`;

      validateName(name)
        ? createApp(source, path, name)
        : console.log('Project name may only include letters, numbers, underscores and hashes.');
    });
};

function validateName(name) {
  return /^([A-Za-z\-_\d])+$/.test(name);
}

function createApp(source, path, name) {
  cloneTemplate(source, name)
    .then(removeFilesNotNeededFromTemplate(path))
    .catch(reason => console.log(reason.message));
}

function cloneTemplate(source, name) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(name)) {
      reject(new Error('Folder already exists'));
    }

    else {
      try {
        execSync(`git clone ${source} ${name}`, { stdio: [0, 1, 2] });
        resolve(console.log('Repo cloned successfully!'));
      }

      catch (error) {
        reject(new Error('An error occurred', error));
      }
    }
  });
}

function removeFilesNotNeededFromTemplate(path) {
  const filesToRemove = ['.git', 'yarn.lock', 'package-lock.json'];

  filesToRemove.forEach(file => (
    fs.existsSync(`${path}/${file}`)
      && execSync(`rm -rf ${path}/${file}`, { stdio: [0, 1, 2] })
  ));
}
