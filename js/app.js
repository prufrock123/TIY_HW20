_.templateSettings.interpolate = /{([\s\S]+?)}/g;

// The code below correctly gets all the active listings from Etsy.
// var etsy_url = "https://openapi.etsy.com/";
// var version = "v2/";
// var model = "listings/";
// var filter = "active";
// var js = ".js";
// var api_key = "aavnvygu0h5r52qes74x9zvo";
// var complete_api_url = etsy_url + version;

// $.getJSON(complete_api_url + model + filter + js + "?" + "api_key=" + api_key + "&callback=?").then(function(data){
//     console.log(data);
// });


// so when we create a new EtsyClient instance, we will be passing an options object
// as its argument. Something like:
// var example = new EtsyClient({version: v2/, api_key: blah, complete_api_url: blah})
function EtsyClient(options) {
    if (!options.api_key) {
        throw new Error("Yo dawg, I heard you like APIs. Y U NO APIKEY!?!?");
    }
    this.etsy_url = "https://openapi.etsy.com/";
    this.version = options.api_version || "v2/";
    this.api_key = options.api_key;
    this.complete_api_url = this.etsy_url + this.version;

    // this.getAllActiveListings();
    this.init();
}

// Get data functions
// Get all active listings. Also added an includes to get the images FUCKYAAAAA.
EtsyClient.prototype.getAllActiveListings = function() {
    var model = 'listings/'; // the forward slash was missing from the notes code.
    var filter = 'active';
    return $.getJSON(this.complete_api_url + model + filter + ".js?includes=Images(url_75x75)&api_key=" + this.api_key + "&callback=?").then(function(data) {
        // console.log(data);
        return data;
    });
};



// Get HTML templates function
EtsyClient.prototype.loadTemplateFile = function(templateName) {
    return $.get('templates/' + templateName + '.html')
        .then(function(htmlString) {
            return htmlString;
        });
};


// Add data to HTML functions
// Add all active listings on page
EtsyClient.prototype.addAllActiveListingsToPage = function(html, data) {
    // console.log(data);
    // console.log(html);
    document.querySelector('#all_listings').innerHTML =
        data.results.map(function(element) {
            return _.template(html, element);
        }).join("");
};

// Add single listing to page
EtsyClient.prototype.addSingleListingToPage = function(html, data) {
    // console.log(data);
    document.querySelector('#home').innerHTML =
        data.results.map(function(element) {
            return _.template(html, element);
        }).join("");
};



EtsyClient.prototype.init = function() {
    var self = this;
    $.when(
        this.getAllActiveListings(),
        this.loadTemplateFile('allListings')
    ).then(function(allActiveListings, allListingsHtml) {
        self.addAllActiveListingsToPage(allListingsHtml, allActiveListings);
    });
};

//---------------------------
// jQuery singlepage
	// EtsyClient.prototype.singleProduct = function(listingId) {
	//     var self = this;
	//     $.when(
	//         this.getListingInfo(listingId),
	//         this.loadTemplateFile('singleListing')
	//     ).then(function(singleListing, singleListingHtml) {
	//         self.addSingleListingToPage(singleListingHtml, singleListing);
	//     });
	// };
	// ---------------------------
	// // Add single listing to page
	// EtsyClient.prototype.addSingleListingToPage = function(html, data) {
	//     // console.log(data);
	//     document.querySelector('#home').innerHTML =
	//         data.results.map(function(element) {
	//             return _.template(html, element);
	//         }).join("");
	// };
	// ---------------------------
	// // Get individual listing
	// EtsyClient.prototype.getListingInfo = function(etsyId) {
	//     var model = 'listings/'; // the forward slash was missing from the notes code.
	//     var filter = etsyId;
	//     return $.getJSON("https://openapi.etsy.com/v2/" + model + filter + ".js?api_key=" + "ab2ph0vvjrfql5ppli3pucmw" + "&callback=?").then(function(data) {
	//         console.log(data);
	//         return data;
	//     });
	// };
//---------------------------

window.onload = app;

function app() {
    var etsy = new EtsyClient({
        api_key: "ab2ph0vvjrfql5ppli3pucmw"
    });
    $("body").on("click", ".etsyItem", function() {
        etsy.singleProduct(this.getAttribute("listingid"));
    });
}

// var etsyId = $(".etsyItem").click(function(){$(this).listing_id;});
