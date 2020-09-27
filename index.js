const helper = require('./helper');
//Assuming that, i have to make only one type of request, with fixed filters, so hardcoding url
const businessSearchUrl = `${helper.baseUrl}v3/businesses/search?location=Redwood%20City&sort_by=rating&limit=10`;

//this function will return the final response
const getTopTenIceCreamShops = async function () {
    let finalResults = [];
    try {
        //first getting top 10 businesses.
        const result = await helper.makeHttpGetRequest(businessSearchUrl);
        if (result && result.businesses && result.businesses.length) {
            //for each business id, getting its reviews. [this api have a limit for request per second, so making requests one by one
            //(i could have used Promise.all, but to keep the code straight, i am calling apis one by one)]
            for (business of result.businesses) {
                const reviewUrl = `https://api.yelp.com/v3/businesses/${business.businessId}/reviews`;
                const reviewData = await helper.makeHttpGetRequest(reviewUrl);
            }
        } else {
            throw new Error('No data found');
        }
    } catch (err) {
        console.log(err);
        return null;
    }

}
