// Inputs
var ekwName = "PluginName";
var description = "";

// Filesystem by Node.js
const fs = require('fs');

// Imports and requires
const handleEkwName = require('./handleEkwName');
const makeOtherCase = require('./makeOtherCase');

// Input Part //
// Validate Input
var correctEkwName = handleEkwName.handleEkwName(ekwName);

// Generate FileName
var fileEkwName = makeOtherCase.makeOtherCase(correctEkwName);


// Folder Part //
// make plugin-containing folder Synchronously
fs.mkdirSync('Shopware_Plugins/' + correctEkwName, { recursive: true });

// Direct to Inital Folder
process.chdir('Shopware_Plugins/' + correctEkwName);

// Generate FolderStructure Synchronously -> mkdir is async
fs.mkdirSync('ComponentHandler/');
fs.mkdirSync('Bootstrap/');
fs.mkdirSync('Resources/views/emotion_components/widgets/emotion/components/', { recursive: true });
fs.mkdirSync('Resources/views/frontend/_public/src/less/', { recursive: true });
fs.mkdirSync('Subscriber/');

// Direct to Bootstrap
process.chdir('Bootstrap/');
fs.writeFile( fileEkwName + '.php', fileEkwName + '.php Content', function (err) {
	if (err) throw err;
  	console.log('EmotionElementInstaller.php Saved!');
});

process.chdir('../ComponentHandler');
fs.writeFile( fileEkwName + 'Handler.php', fileEkwName + '.php Content', function (err) {
	if (err) throw err;
  	console.log('EmotionElementInstaller.php Saved!');
});

