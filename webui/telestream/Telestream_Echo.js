/*
 * Perform the REST call
 */
function run(input, params) {
    var urlBase = Env["telestream.url"] === null ? "http://localhost:8678" : Env["telestream.url"];
    var url = urlBase + params.Endpoint;
    Console.warn("URL: " + url);
    var headers = {
        "Content-Type": "application/json"
    };
    var jobStatus, resultStringBlob, resultTxt, resultObj, msg;
    // Invoke REST Call
    resultStringBlob = HTTPlabs.Call(input, {
        'method': params.Method ? params.Method : "GET",
        'url': url,
        'headersAsJSON': JSON.stringify(headers)
    });
    // If we are here, the call itself was successful, lets get the results as an object
    resultTxt = resultStringBlob.getString();
    resultObj = JSON.parse(resultTxt);
    if (resultObj.value) {
        return JSON.stringify(resultObj.value);
    } else {
        return resultTxt;
    }
}