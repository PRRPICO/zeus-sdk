var { execPromise } = require('../helpers/_exec');
var { loadModels } = require('./models');

const scaffold = async (name, zeusargs) => {
  var args = [];
  var optionals = {};
  var templates = await loadModels('templates');
  var template = templates.find(t => t.name == name);
  if (!template) { throw new Error(`template not found ${name}`); }
  var keyArgs = template.args;
  var keyArg;
  for (var i = 0; i < keyArgs.length; i++) {
    keyArg = keyArgs[i];
    if (zeusargs[keyArg]) { args.push(zeusargs[keyArg]); }
  }
  keyArgs = template.optionals;
  for (var i = 0; i < keyArgs.length; i++) {
    keyArg = keyArgs[i];
    if (zeusargs[keyArg]) { optionals[keyArg] = zeusargs[keyArg]; }
  }
  await execPromise(`node_modules/.bin/yo ./templates/${name}/generators/app ${args.join(' ')} ${Object.keys(optionals).map(a => `--${a} ${args[a]}`).join(' ')}`);
};

module.exports = { scaffold };
