const https = require('https');
const baseUrl = 'https://api.yelp.com/';
//Assuming that, i have to make only one type of request, so hardcoding headers
const headers = {
    'Authorization': 'Bearer pSxxXBpunBnBT0mIoP_m6VTEy32nmGTOG8xO5_9ehd8uIPpSgZvaSTxqmVoNdR_OxuXI2u5JLB5gltsjBUxat5sy4ci96wvRmWJT_Bmw473B48rMEeZQml2lcPBeX3Yx'
}

//The requests we need to make are both GET requests, so making this function only
const makeHttpGetRequest = function (url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: headers }, response => {
            let jsonResponse = '';
            response.on('data', chunk => {
                jsonResponse += chunk;
            });
            response.on('error', err => {
                reject(err);
            });
            response.on('end', () => {
                //request completed
                //parsing json in try catch
                try {
                    const parsedResponse = JSON.parse(jsonResponse);
                    resolve(parsedResponse);
                } catch (err) {
                    reject(err);
                }
            });
        });
    });
}

module.exports = {
    baseUrl,
    makeHttpGetRequest
}
