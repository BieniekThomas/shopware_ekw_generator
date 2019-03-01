// Requirements
var readline = require('readline-sync'); // Readline
const fs = require('fs'); // Filesystem
const appRoot = require('app-root-path'); // get App-Root-Path
const replace = require('replace-in-file'); // Replace Strings in Files

// Own Requirements
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

// create Folders and Files
makeDirectoriesAndFiles(fixedEkwName, fixedEkwFileName);
replaceStrings(fixedEkwName, fixedEkwFileName);


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

	process.chdir(appRoot.toString());
	const srcRoot = '/shopware_ekw_basic_source-master';

	// write Files
	readAndWrite( srcRoot + '/plugin_php.txt', correctFileName + '.php', correctEkwName, '/');
	readAndWrite( srcRoot + '/plugin_xml.txt', correctFileName + '.xml', correctEkwName, '/');
	readAndWrite( srcRoot + '/componenthandler_pluginHandler_php.txt', 'pluginHandler.php', correctEkwName, '/ComponentHandler');
	readAndWrite( srcRoot + '/resources_services_xml.txt', 'services.xml', correctEkwName, '/Resources');
	readAndWrite( srcRoot + '/resources_views_emotion_components_widgets_emotion_components_plugin_adv_tpl.txt', correctFileName + '.tpl', correctEkwName, '/Resources/views/emotion_components/widgets/emotion/components');
	readAndWrite( srcRoot + '/resources_views_frontend_public_src_less_all_less.txt', 'all.less', correctEkwName, '/Resources/views/frontend/_public/src/less/');
	readAndWrite( srcRoot + '/subscriber_emotion_php.txt', 'Emotion.php', correctEkwName, '/Subscriber');
	console.log('all files written');

	// Done
	return console.log('Writing Files Done');
}

function replaceStrings(correctEkwName, correctFileName){
	// replace strings options
	const pluginNameOptions = {
		files: [
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.php',
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.xml',
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.js',
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.tpl',
			'./_Shopware_Plugins/' + correctEkwName + '/**/*.less',
		],
		//Replacement to make (string or regex)
		from: /\[::plugin_name::\]/g,
		to: correctFileName,
	};

	// replace Strings
	process.chdir(appRoot.toString());
	try {
		const changes = replace.sync(pluginNameOptions);
		console.log('Modified files:', changes.join(', '));
	}
	catch (error) {
		console.error('Error occurred:', error);
	}

	return console.log('replaced Strings');
}