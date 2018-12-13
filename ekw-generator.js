// Inputs
var ekwName = "PluginName";
var description = "";

// Filesystem by Node.js
const fs = require('fs');

// Imports and requires
const handleEkwName = require('./handleEkwName');
const makeOtherCase = require('./makeOtherCase');

var correctEkwName = handleEkwName.handleEkwName(ekwName);
var fileEkwName = handleEkwName.handleEkwName(ekwName);
fileEkwName = makeOtherCase.makeOtherCase(fileEkwName);

// make plugin-containing folder
fs.mkdirSync('Shopware_Plugins/'+correctEkwName, { recursive: true });

// Direct to Inital Folder
process.chdir('Shopware_Plugins/'+correctEkwName);

// Generate FolderStructure Synchronously -> mkdir is async
fs.mkdirSync('Bootstrap/');
fs.mkdirSync('Resources/views/emotion_components/widgets/emotion/components/', { recursive: true });
fs.mkdirSync('Resources/views/frontend/_public/src/less/', { recursive: true });
fs.mkdirSync('Subscriber/');

// Direct to Bootstrap
process.chdir('Bootstrap/');
fs.writeFile('EmotionElementInstaller.php', 'EmotionElementInstaller.php Content', function (err) {
	if (err) throw err;
  	console.log('EmotionElementInstaller.php Saved!');
});

