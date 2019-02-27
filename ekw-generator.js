// Requirements
var readline = require('readline-sync'); // Readline
const fs = require('fs'); // Filesystem

const handleEkwName = require('./handler/handleEkwName');
const replace = require('replace-in-file');
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

replace(pluginNameOptions)
	.then(changedFiles => {
    	console.log('Modified files:', changedFiles.join(', '));
  	})
  	.catch(error => {
    	console.error('Error occurred:', error);
	});


// replace options
const pluginNameOptions = {
	files: [
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.php',
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.js',
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.xml',
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.tpl',
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.less',
	],
	//Replacement to make (string or regex) 
	from: /[::plugin_name::]/g,
	to: ekwName,
};

const classNameOptions = {
	files: [
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.php',
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.js',
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.xml',
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.tpl',
		'_Shopware_Plugins/' + fixedEkwName + '/**/*.less',
	],
	//Replacement to make (string or regex) 
	from: /[::plugin_name::]/g,
	to: ekwName,
};


function makeDirectoriesAndFiles (correctEkwName, correctFileName) {
	// Create Directories
	fs.mkdirSync('_Shopware_Plugins/' + correctEkwName, { recursive: true });
	process.chdir('_Shopware_Plugins/' + correctEkwName);

		// Generate FolderStructure Synchronously
		fs.mkdirSync('ComponentHandler/');
		fs.mkdirSync('Bootstrap/');
		fs.mkdirSync('Resources/views/emotion_components/widgets/emotion/components/', { recursive: true });
		fs.mkdirSync('Resources/views/frontend/_public/src/less/', { recursive: true });
		fs.mkdirSync('Subscriber/');
	
	console.log('Directories created');

	process.chdir('Bootstrap/');
	fs.writeFile( correctFileName + '.php', outputFile, function (err) {
		if (err) throw err;
		console.log('EmotionElementInstaller.php Saved!');
	});

	// Direct to ComponentHandler
	process.chdir('../ComponentHandler');
	fs.writeFile( correctFileName + 'Handler.php', correctFileName + '.php Content', function (err) {
		if (err) throw err;
		console.log('ComponentHandler.php Saved!');
	});

	return console.log('its done');
}

