const replaceVariables = (ekwName, ekwClassName, fileAsTxt) => {
	// do something
	return 	"a very long string: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ad consequatur dolore. Ullam iure repudiandae ea corporis doloremque autem quae dolore accusamus, nam dignissimos, maxime animi eligendi blanditiis magnam, ipsum! ";
}

module.exports = {
  	replaceVariables: function (ekwName, ekwClassName, fileAsTxt) {
    	outputString = replaceVariables(ekwName, ekwClassName, fileAsTxt);
    	return outputString;
  	}
};