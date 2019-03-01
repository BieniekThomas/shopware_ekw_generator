// Requirements
var readline = require('readline-sync'); // Readline
const fs = require('fs'); // Filesystem
const appRoot = require('app-root-path');
const replace = require('replace-in-file');

const handleEkwName = require('./handler/handleEkwName');

const makeOtherCase = require('./handler/makeOtherCase');

// Inputs
let ekwName = 'yourEkwName';
let description = '';

// Console Inputs
ekwName = readline.question('Write your wanted EKW-Name: ');
description = readline.question('Short description of your Plugin (recommended): ');

// Validate Input
var fixedEkwName = handleEkwName.handleEkwName(ekwName);
var fixedEkwFileName = makeOtherCase.makeOtherCase(ekwName);

// create Files
makeDirectoriesAndFiles(fixedEkwName, fixedEkwFileName);

function readAndWrite (inputPath, outputName, correctEkwName ,outputPath) {
	process.chdir(appRoot.toString());
	var data = fs.readFileSync('.' + inputPath);
	process.chdir('./_Shopware_Plugins/' + correctEkwName + outputPath);
	fs.writeFileSync( outputName, data.toString());
}

function makeDirectoriesAndFiles (correctEkwName, correctFileName) {
	// Create Directories
	fs.mkdirSync('_Shopware_Plugins/' + correctEkwName, { recursive: true });
	process.chdir('_Shopware_Plugins/' + correctEkwName);
	// Generate FolderStructure Synchronously
	fs.mkdirSync('ComponentHandler/');
	fs.mkdirSync('Resources/views/emotion_components/widgets/emotion/components/', { recursive: true });
	fs.mkdirSync('Resources/views/frontend/_public/src/less/', { recursive: true });
	fs.mkdirSync('Subscriber/');

	console.log('Directories created');

	process.chdir('../../');
	const srcRoot = '/shopware_ekw_basic_source-master';

	// write Files
	readAndWrite( srcRoot + '/plugin_php.txt', correctFileName + '.php', correctEkwName, '/');
	readAndWrite( srcRoot + '/plugin_xml.txt', correctFileName + '.xml', correctEkwName, '/');
	readAndWrite( srcRoot + '/componenthandler_pluginHandler_php.txt', 'pluginHandler.php', correctEkwName, '/ComponentHandler');

	
	//replace options
	const str = '[::plugin_name::]';
	console.log('str', str);
	const regex = new RegExp('/\[::plugin_name::\]/g');
	console.log('regex', regex)
	const pluginNameOptions = {
		files: [
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.php',
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.xml',
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.js',
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.tpl',
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.less',
		],
		//Replacement to make (string or regex)
		from: /plugin_name/g,
		to: correctEkwName,
	};
	process.chdir(appRoot.toString());
	try {
		const changes = replace.sync(pluginNameOptions);
		console.log('Modified files:', changes.join(', '));
	}
	catch (error) {
		console.error('Error occurred:', error);
	}

	// Done
	return console.log('its done');
}