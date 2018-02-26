const fs = require('fs');

const CURRENT_DIR = process.cwd();

module.exports = function createCommand(program, root) {
  return program
    .command('add <name>')
    .alias('-a')
    .option('-p, --pure', 'A pure, functional component')
    .description('Create a new React component')
    .action((name, options) => (
      createComponent(name, options, root)
    ));
};

function createComponent(name, options, root) {
  const componentsPath = `${root}/templates/components/`;
  const componentPath = (
    `${componentsPath}/${options.pure ? 'Functional-Component' : 'Component'}.js`
  );

  const contents = fs.readFileSync(componentPath, 'utf8');

  const newContents = contents.replace(/RawrComponent/g, `${name}`);


  const writePath = `${CURRENT_DIR}/components/${name}.js`;

  const doesComponentsFolderExist = fs.statSync(`${CURRENT_DIR}/components`);

  if (doesComponentsFolderExist) {
    console.log('exists?', doesComponentsFolderExist);
  }

  else {
    console.log('does not exist');
  }

  console.log(contents, writePath);
  fs.writeFileSync(writePath, newContents, 'utf8');
}
