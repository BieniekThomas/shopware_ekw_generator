// Inputs
var readline = require('readline-sync')
var ekwName = readline.question('What should your EKW should be named: ');
var description = "";

// Filesystem by Node.js
const fs = require('fs');

// Imports and requires
const handleEkwName = require('./handler/handleEkwName');
const makeOtherCase = require('./handler/makeOtherCase');
const writeFiles = require('./handler/replaceVariables');

var contents = [
	componentHandler = fs.readFileSync('./src/_ComponentHandler.txt', 'utf8'),
]

console.log('ComponentHandler-Inhalt:', contents.componentHandler);
console.log('EKWNAME: ', ekwName);

// Input Part //
// Validate Input
var correctEkwName = handleEkwName.handleEkwName(ekwName);

// Generate FileName
var fileEkwName = makeOtherCase.makeOtherCase(correctEkwName);


// Folder Part //
fs.mkdirSync('_Shopware_Plugins/' + correctEkwName, { recursive: true });


// Direct to Inital Folder
process.chdir('_Shopware_Plugins/' + correctEkwName);

	// Generate FolderStructure Synchronously -> mkdir is async
	fs.mkdirSync('ComponentHandler/');
	fs.mkdirSync('Bootstrap/');
	fs.mkdirSync('Resources/views/emotion_components/widgets/emotion/components/', { recursive: true });
	fs.mkdirSync('Resources/views/frontend/_public/src/less/', { recursive: true });
	fs.mkdirSync('Subscriber/');

// Direct to Bootstrap
process.chdir('Bootstrap/');

	// This is not working
	var outputFile = writeFiles.replaceVariables(correctEkwName, description, '_initialEmotionPhp.txt');

	fs.writeFile( fileEkwName + '.php', outputFile, function (err) {
		if (err) throw err;
	  	console.log('EmotionElementInstaller.php Saved!');
	});

// Direct to ComponentHandler
process.chdir('../ComponentHandler');

	fs.writeFile( fileEkwName + 'Handler.php', fileEkwName + '.php Content', function (err) {
		if (err) throw err;
	  	console.log('ComponentHandler.php Saved!');
	});

