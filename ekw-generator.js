// Filesystem by Node.js
const fs = require('fs');

var ekwName = "test";

const handleEkwName = (ekwName) => {
	console.log('test...');
	console.log(ekwName);
}

var correctEkwName = handleEkwName(ekwName);

fs.mkdirSync("correctEkwName");