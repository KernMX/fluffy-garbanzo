var decoder = {
	decode_main: function(inputString) {
		var zlibHeader = "7a990d405d2c6fb93aa8fbb0ec1a3b23";
		var output = '';
		if (inputString.substring(0, 32) == zlibHeader) {
			console.log('encode type: zlib');
			$('#saveGameType').val('zlib');
			output = decoder.decode_zlib(inputString);
		}
		else {
			console.log('encode type: base64');
			$('#saveGameType').val('base64');
			output = decoder.decode_base64(inputString);
		}
		return output;
	},

	decode_base64: function(inputString) {
		var output = '';
		if (inputString.indexOf(ANTI_CHEAT_CODE) > 0) {
	        inputString = inputString.split(ANTI_CHEAT_CODE)[0];
	        var temp = "";
	        for (var i = 0; i < inputString.length; i += 2)
	            temp += inputString[i];
	        output = JSON.parse(atob(temp));
	    }
	    else {
	    	output = JSON.parse(inputString);
	    }
	    return output;
	},

	decode_zlib: function(inputString) {
		pako = window.pako;
		_loc1 = inputString.substring(32);
		_loc2 = atob(_loc1);
		binArray = new Uint8Array(decoder.stringToBinaryArray(_loc2));
		output = JSON.parse(pako.inflate(binArray, {to: 'string'}));
		return output;
	},

	stringToBinaryArray: function(str) {
		var binary = [];
		for (var i = 0; i < str.length; ++i) {
			binary.push(str.charCodeAt(i));
		}
		return binary;
	},
};