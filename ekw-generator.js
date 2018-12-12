// Inputs
var ekwName = "teffst";
var description = "";

// Filesystem by Node.js
const fs = require('fs');

// Imports and requires
const handleEkwName = require('./handleEkwName');

var correctEkwName = handleEkwName.handleEkwName(ekwName);

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

// Direct to Bootstrap
fs.writeFile('EmotionElementInstaller.php', 'EmotionElementInstaller.php Content', function (err) {
	if (err) throw err;
  	console.log('EmotionElementInstaller.php Saved!');
});

