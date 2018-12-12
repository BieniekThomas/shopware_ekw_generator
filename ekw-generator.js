// Filesystem by Node.js
const fs = require('fs');

// write your EKW-Name here
var ekwName = "teffst";
var description = "";

// Other Functions
const getRidOfUmlaute = (ekwName) => {
  	ekwName = ekwName.replace(/ä/g, 'ae');
  	ekwName = ekwName.replace(/ö/g, 'oe');
  	ekwName = ekwName.replace(/ü/g, 'ue');
  	ekwName = ekwName.replace(/ß/g, 'ss');
  	ekwName = ekwName.replace(/ /g, '-');
  	ekwName = ekwName.replace(/\./g, '');
  	ekwName = ekwName.replace(/,/g, '');
  	ekwName = ekwName.replace(/\(/g, '');
  	ekwName = ekwName.replace(/\)/g, '');
  	return ekwName;
}

const handleEkwName = (ekwName) => {
	// Stuff happens here
    ekwName = getRidOfUmlaute(ekwName);
	return ekwName;
}

var correctEkwName = handleEkwName(ekwName);

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

