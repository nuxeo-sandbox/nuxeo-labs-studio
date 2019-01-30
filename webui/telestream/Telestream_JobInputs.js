var VantageShare = "\\\\cob-hds-1.ldschurch.org\\compression\\nuxeotest\\data\\";
var WPS = "\\";
var POP = "ProxyOutputPath";
var BaseFilename = "BaseFilename";

/*
 * Perform the REST call
 */
function run(input, params) {
    var urlBase = Env["telestream.url"] === null ? "http://localhost:8678" : Env["telestream.url"];
    var url = urlBase + "/Rest/Workflows/" + ctx.WorkflowVariables.Configuration + "/JobInputs";
    Console.warn("Job inputs URL: " + url);
    var headers = {
        "Content-Type": "application/json"
    };
    var jobInputs, resultStringBlob, resultTxt, resultObj, msg;
    // Invoke REST Call
    resultStringBlob = HTTPlabs.Call(input, {
        'method': "GET",
        'url': url,
        'headersAsJSON': JSON.stringify(headers)
    });
    // If we are here, the call itself was successful, lets get the results as an object
    resultTxt = resultStringBlob.getString();
    if (params.Template === 'true') {
        return resultTxt;
    }
    resultObj = JSON.parse(resultTxt);
    // Check the status. Here, we are expecting 200
    if (resultObj.status >= 200 && resultObj.status < 400) {
        jobInputs = resultObj.result.Variables;
        var paramTemp = "";
        for (var v = 0; v < jobInputs.length; v++) {
            var inp = jobInputs[v];
            paramTemp += inp.Name + "=";
            if (inp.Value) {
                paramTemp += inp.Value;
            } else if (inp.Name === POP) {
                paramTemp += VantageShare;
            } else if (inp.Name === BaseFilename) {
                paramTemp += "Vantage_" + new Date().getTime();
            }
            paramTemp += "\n";
        }
        Context.SetWorkflowVar(
            input, {
                'name': 'Parameters',
                'value': paramTemp
            }
        );
    } else {
        // The server returned an error
        msg = "Status: " + resultObj.status;
        msg += ", message: " + resultObj.statusMessage;
        msg += ", error: " + resultObj.error;
        Log(input, {
            'level': "warn",
            'message': "Telestream error occurred: " + msg
        });
    }
    return input;
}