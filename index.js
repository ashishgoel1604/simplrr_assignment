const helper = require('./helper');
//Assuming that, i have to make only one type of request, with fixed filters, so hardcoding url
const businessSearchUrl = `${helper.baseUrl}v3/businesses/search?location=Redwood%20City&sort_by=rating&limit=10`;

const getAddress = function (location) {
    if (location) {
        let address = location.address1 ? location.address1 : (location.address2 ? location.address2 : (location.address3 ? location.address3 : 'NA')) + location.city ? `, ${location.city}` : '';
        return address;
    } else {
        return 'NA';
    }
}

//this function will return array of final response objects by merging two arrays different arrays of api response
const createResponseObjects = function (businesses, reviews) {
    const results = [];
    //we can use any length, bcz both will have same length
    for (let i = 0; i < businesses.length; i++) {
        const business = businesses[i];
        const review = reviews[i];
        const firstReview = review.reviews[0];
        const output = {
            businessName: business.name,
            businessAddress: getAddress(business.location),
            customerReview: firstReview.text,
            customer: firstReview.user.name,
            rating: business.rating
        };
        results.push(output);
    }
    return results;
}

//this function will return the final response
const getTopTenIceCreamShops = async function () {
    let finalResults = [];
    try {
        //first getting top 10 businesses.
        const result = await helper.makeHttpGetRequest(businessSearchUrl);
        if (result && result.businesses && result.businesses.length) {
            //Now for each business id, getting its reviews. [this api have a limit for request per second, 
            //so making requests in parts
            const promises = [];
            const selectedBusinesses = [];
            for (let i = 0; i < result.businesses.length; i++) {
                const reviewUrl = `https://api.yelp.com/v3/businesses/${result.businesses[i].id}/reviews`;
                promises.push(helper.makeHttpGetRequest(reviewUrl));
                selectedBusinesses.push(result.businesses[i]);
                if (promises.length === 5 || i === result.businesses.length - 1) {
                    const reviewsData = await Promise.all(promises);// it maintains the order
                    const resultsPart = createResponseObjects(selectedBusinesses, reviewsData);
                    finalResults = [...finalResults, ...resultsPart];
                    selectedBusinesses.length = 0;
                    promises.length = 0;
                }
            }
            console.log(JSON.stringify(finalResults));
            return finalResults;
        } else {
            throw new Error('No data found');
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

getTopTenIceCreamShops();
