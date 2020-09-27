const helper = require('./helper');
//Assuming that, i have to make only one type of request, with fixed filters, so hardcoding url
const businessSearchUrl = `${helper.baseUrl}v3/businesses/search?location=Redwood%20City&sort_by=rating&limit=10`;

//this function will return the final response
const getTopTenIceCreamShops = async function () {
    let finalResults = [];
    //first getting top 10 businesses.
    const result = await helper.makeHttpGetRequest(businessSearchUrl);
    
}
