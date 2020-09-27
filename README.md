# simplrr_assignment
A simple problem solution >>

Description >> In this solution, I am extracting top 10 Ice-cream shops and customer reviews, located in Redwood city.
               I tried my best not to use any 3rd party library.
Steps followed >

1. Create new node project.
2. Write helper file for common codes.
3. In main(index.js) file, write functions to break code into managable parts
4. For getting reviews, made use of Promise.All() for parallel requests, but yelp api has a limitation on requests per second, So for this, used for loop, to make requests in batches of 5 requests.
5. fillnally after getting responses from apis, created objects as per required response. [For this purpose, i have written seprate functions].

