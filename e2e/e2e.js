// @flow
const {lstatSync, readdirSync, existsSync, readFile, writeFile} = require('fs');
const {join} = require('path');
const {exec} = require('child_process');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const getExamples = source => {
  const componentDirs = getDirectories(source);
  const examples = [];
  componentDirs.forEach(dir => {
    const example = join(dir, 'examples.js');
    if (existsSync(example)) {
      examples.push(example);
    }
  });
  return examples;
};

const updateIndex = exampleFile => {
  const idxFile = join(__dirname, 'index.js');
  readFile(idxFile, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    const result = data.replace(/this_is_getting_replaced/g, exampleFile);

    writeFile(idxFile, result, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  });
};

const createDistIndex = () => {
  exec('npx rollup -c ../rollup.config_e2e.js', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
};

const examples = getExamples(join(__dirname, '../', 'src'));
updateIndex(examples[0]);
createDistIndex();
