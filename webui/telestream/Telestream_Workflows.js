/*
 * Perform the REST call
 */
function run(input, params) {
    var urlBase = Env["telestream.url"] === null ? "http://localhost:8678" : Env["telestream.url"];
    var url = urlBase + "/Rest/Workflows";
  Console.warn("Retrieving workflows: " + url);
    var headers = {
        "Content-Type": "application/json"
    };
    var vocabularyName = 'TelestreamWorkflows';

    var idx, msg, entries, workflows, resultStringBlob, resultTxt, resultObj;
    // Run pre-process activities
    entries = Directory.Entries(input, {
        'directoryName': vocabularyName
    });
    if (entries) {
        var values = JSON.parse(entries.getString());
        var ids = [];
        for (idx = 0; idx < values.length; idx++) {
            ids.push(values[idx].id);
        }
        Directory.DeleteEntries(input, {
            'directoryName': vocabularyName,
            'entries': JSON.stringify(ids)
        });
    }
    // Invoke REST Call
    resultStringBlob = HTTPlabs.Call(input, {
        'method': "GET",
        'url': url,
        'headersAsJSON': JSON.stringify(headers)
    });
    // If we are here, the call itself was succesful, lets get the results as an object
    resultTxt = resultStringBlob.getString();
    resultObj = JSON.parse(resultTxt);
    // Check the status. Here, we are expecting 200
    if (resultObj.status >= 200 && resultObj.status < 400) {
        workflows = resultObj.result.Workflows;
        var items = [];
        for (idx = 0; idx < workflows.length; idx++) {
            items.push({
                "id": workflows[idx].Identifier,
                "label": workflows[idx].Name
            });
        }
        return Directory.CreateEntries(
            input, {
                'directoryName': vocabularyName,
                'entries': JSON.stringify(items)
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
}