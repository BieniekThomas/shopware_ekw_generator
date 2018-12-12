// Filesystem by Node.js
const fs = require('fs');

// write your EKW-Name here
var ekwName = "täst";
var description = "";

const handleEkwName = (ekwName) => {
	// Stuff happens here
    ekwName = ekwName.toLowerCase();
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

var correctEkwName = handleEkwName(ekwName);

fs.mkdirSync(correctEkwName);