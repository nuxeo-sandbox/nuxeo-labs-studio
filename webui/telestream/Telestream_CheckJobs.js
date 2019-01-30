/*
 * Perform the REST call
 */
function run(input, params) {
    var urlBase = Env["telestream.url"] === null ? "http://localhost:8678" : Env["telestream.url"];
    var url = urlBase + "/Rest/Jobs/" + params.JobID;
    Console.warn("Job URL: " + url);
    var headers = {
        "Content-Type": "application/json"
    };
    var jobStatus, resultStringBlob, resultTxt, resultObj, msg;
    // Invoke REST Call
    resultStringBlob = HTTPlabs.Call(input, {
        'method': "GET",
        'url': url,
        'headersAsJSON': JSON.stringify(headers)
    });
    // If we are here, the call itself was successful, lets get the results as an object
    resultTxt = resultStringBlob.getString();
    resultObj = JSON.parse(resultTxt);
    // Check the status. Here, we are expecting 200
    if (resultObj.status >= 200 && resultObj.status < 400) {
        jobStatus = resultObj.result.Job;
        // Resume only on these states:
        // WorkflowVariables["JobState"] == 4 || WorkflowVariables["JobState"] == 5 || WorkflowVariables["JobState"] == 7
        if (jobStatus.State !== 0) {
            Console.warn("Setting state: " + jobStatus.State + " for " + params.WorkflowInstanceID);
            Context.SetWorkflowVar(
                null, {
                    'name': 'JobState',
                    'value': jobStatus.State,
                    'workflowInstanceId': params.WorkflowInstanceID
                }
            );
            if (jobStatus.State === 4 || jobStatus.State === 5 || jobStatus.State === 7) {
                Workflow.ResumeNode(null, {
                    'nodeId': 'TelestreamJob-20181204113300899-simple-task',
                    'workflowInstanceId': params.WorkflowInstanceID
                });
            }
        }
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