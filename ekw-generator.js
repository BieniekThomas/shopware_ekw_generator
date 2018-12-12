// Inputs
var ekwName = "PluginName";
var description = "";

// Filesystem by Node.js
const fs = require('fs');

// Imports and requires
const handleEkwName = require('./handleEkwName');
const makeOtherCase = require('./makeOtherCase');


var correctEkwName = handleEkwName.handleEkwName(ekwName);
correctEkwName = makeOtherCase.makeOtherCase(ekwName);

// make plugin-containing folder
fs.mkdirSync('Shopware_Plugins/'+correctEkwName, { recursive: true });

// Direct to Inital Folder
process.chdir('Shopware_Plugins/'+correctEkwName);

// Generate FolderStructure
// Bootstrap-Folder
fs.mkdir('Bootstrap/', (err) => {
  	if (err) throw err;
  	console.log('Bootstrap Folder Saved!');
});

fs.mkdir('Resources/', (err) => {
  	if (err) throw err;
  	console.log('Resources Folder Saved!');
});

fs.mkdir('Subscriber/', (err) => {
  	if (err) throw err;
  	console.log('Subscriber Folder Saved!');
});

// Direct to Bootstrap
/*process.chdir('Bootstrap/');*/
fs.writeFile('EmotionElementInstaller.php', 'EmotionElementInstaller.php Content', function (err) {
	if (err) throw err;
  	console.log('EmotionElementInstaller.php Saved!');
});

