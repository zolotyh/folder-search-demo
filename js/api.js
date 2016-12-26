var getKey = require('./getKey.js');

function API(key) {
    this.key = getKey();
};


API.prototype.getFoldersList = function () {
    var url = this.getBaseUrl() + '/folders';
    return fetch(url, this.getGetRequestParams()).then(function (data) {
        return data.json()
    });
};


API.prototype.getGetRequestParams = function () {
    return {
        headers: {
            'authorization': 'bearer ' + this.key

        }
    }
};

API.prototype.getBaseUrl = function () {
    return 'https://www.wrike.com/api/v3';
};

module.exports = API;
