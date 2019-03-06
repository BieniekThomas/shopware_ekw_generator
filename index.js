// Requirements
var readline = require('readline-sync'); 		// Readline

// Own Requirements
const handleEkwName = require('./handler/handleEkwName');
const makeOtherCase = require('./handler/makeOtherCase');
const makeDirectoriesAndFiles = require('./handler/makeDirectoriesAndFiles');
const replaceStrings = require('./handler/replaceStrings');

// Inputs
const inputs = {
	ekwName: 'defaultEkwName',
	description: '',
	author: '',
}

// Console Inputs
inputs.ekwName = readline.question('Write your wanted EKW-Name: ');
inputs.description = readline.question('Short description of your Plugin (recommended): ');
inputs.author = readline.question('Who is the Author of this Template: ')

// Validate Input
var fixedEkwName = handleEkwName.handleEkwName(inputs.ekwName);
var fixedEkwFileName = makeOtherCase.makeOtherCase(inputs.ekwName);

function ekwGenerator(fixedEkwName, fixedEkwFileName, description){
	makeDirectoriesAndFiles(fixedEkwName, fixedEkwFileName);
	replaceStrings(fixedEkwName, description);
}

ekwGenerator(fixedEkwName, fixedEkwFileName, inputs.description);

module.exports = ekwGenerator;