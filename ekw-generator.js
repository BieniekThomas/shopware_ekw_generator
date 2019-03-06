// Requirements
var readline = require('readline-sync'); // Readline
const fs = require('fs'); // Filesystem
const appRoot = require('app-root-path'); // get App-Root-Path
const replace = require('replace-in-file'); // Replace Strings in Files

// Own Requirements
const handleEkwName = require('./handler/handleEkwName');
const makeOtherCase = require('./handler/makeOtherCase');

// Inputs
const inputs = {
	ekwName: 'defaultEkwName',
	description: '',
}

// Console Inputs
inputs.ekwName = readline.question('Write your wanted EKW-Name: ');
inputs.description = readline.question('Short description of your Plugin (recommended): ');

// Validate Input
var fixedEkwName = handleEkwName.handleEkwName(inputs.ekwName);
var fixedEkwFileName = makeOtherCase.makeOtherCase(inputs.ekwName);

// create Folders and Files
makeDirectoriesAndFiles(fixedEkwName, fixedEkwFileName);
replaceStrings(fixedEkwName, inputs.description);


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

function replaceStrings(ekwName, description){

	const directoryName = ekwName;

	const plugin_name = makeOtherCase.makeOtherCase(ekwName);
	const element_template = directoryName + '_two';
	const element_name = directoryName + '_three';
	const element_cls = directoryName + '_four';
	const element_desc = description;
	const link = directoryName + '_six';
	const author = directoryName + '_seven';
	const plugin_mod_name = directoryName + '_eight';
	const desc_de = description;
	const desc_en = description + '_eng';

	// replace strings options
	const pluginNameOptions = {
		files: [
			'./_Shopware_Plugins/' + directoryName + '/**/*.php',
			'./_Shopware_Plugins/' + directoryName + '/**/*.xml',
			'./_Shopware_Plugins/' + directoryName + '/**/*.js',
			'./_Shopware_Plugins/' + directoryName + '/**/*.tpl',
			'./_Shopware_Plugins/' + directoryName + '/**/*.less',
		],
		//Replacement to make (string or regex)
		from: [
			/\[::plugin_name::\]/g,
			/\[::element_template::\]/g,
			/\[::element_name::\]/g,
			/\[::element_cls::\]/g,
			/\[::element_desc::\]/g,
			/\[::link::\]/g,
			/\[::author::\]/g,
			/\[::plugin_mod_name::\]/g,
			/\[::desc_de::\]/g,
			/\[::desc_en::\]/g
		],
		to: [
			plugin_name,
			element_template,
			element_name,
			element_cls,
			element_desc,
			link,
			author,
			plugin_mod_name,
			desc_de,
			desc_en
		],
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