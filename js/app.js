_.templateSettings.interpolate = /{([\s\S]+?)}/g;


var etsy_url = "https://openapi.etsy.com/";
var version = "v2/";
var model = "listings/";
var filter = "active";
var js = ".js";
var api_key = "aavnvygu0h5r52qes74x9zvo";
var complete_api_url = etsy_url + version;

$.getJSON(complete_api_url + model + filter + js + "?" + "api_key=" + api_key + "&callback=?").then(function(data){
    console.log(data);
});


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
}

EtsyClient.prototype.pullAllActiveListings = function() {
    var model = 'listings';
    var filter = 'active';
    return $.getJSON(this.complete_api_url + model + filter + ".js?api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
}

EtsyClient.prototype.getListingInfo = function(id) {
    var model = 'listings';
    return $.getJSON(this.complete_api_url + model + '/' + id + ".js?api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
}