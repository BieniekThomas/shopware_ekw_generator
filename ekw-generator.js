// Filesystem by Node.js
const fs = require('fs');

// write your EKW-Name here
var ekwName = "test";

const handleEkwName = (ekwName) => {
	console.log('test...');
	console.log(ekwName);
	return ekwName;
}

var correctEkwName = handleEkwName(ekwName);

fs.mkdirSync(correctEkwName);