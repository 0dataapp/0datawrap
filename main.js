const uIsRemoteStorage = function (inputData) {
	if (typeof inputData !== 'function') {
		return false;
	}

	return Object.keys(inputData).includes('Authorize');
};

const mod = {

	ZDRStorage (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (!uIsRemoteStorage(inputData.ZDRParamLibrary)) {
			throw new Error('ZDRErrorInputNotValid');
		}

		return {};
	},

};

Object.assign(exports, mod);
