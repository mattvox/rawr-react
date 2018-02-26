const program = require('commander');

const root = __dirname;

require('./commands/create')(program);
require('./commands/add')(program, root);

program
  .version('0.1.0')
  .description('Rawr easily and quickly bootstraps new React projects from customized templates');

program.parse(process.argv);
