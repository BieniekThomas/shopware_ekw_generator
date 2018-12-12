// Functions
const handleUpperCases = (ekwName) => {
    var i=0;
    var character = '';
    while(i < ekwName.length-1)
    {
        i++;
        character = ekwName.charAt(i);
        if(i > 0)
        {
            if(character == character.toUpperCase())
            {
                ekwName = ekwName.slice(0,i) + "_" + character.toLowerCase() + ekwName.slice((i+1),ekwName.length);
                i++;
            }
        }
    }
    return ekwName;
}

module.exports = {
    makeOtherCase: function (ekwName) {
        ekwName = handleUpperCases(ekwName);
        return ekwName;
    }
};