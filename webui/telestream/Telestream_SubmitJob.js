// Windows share base: \\cob-hds-1.ldschurch.org\compression\nuxeotest\data\
var VantageShare = "\\\\cob-hds-1.ldschurch.org\\compression\\nuxeotest\\data\\";
var WPS = "\\";
var POP = "ProxyOutputPath";

// TODO: Set POP and fix regexp

function stageBinary(input, blob) {
    ctx.Media = blob;
    RunScript(
        input, {
            'script': 'Context.Binary = org.nuxeo.runtime.api.Framework.getService(org.nuxeo.ecm.core.blob.BlobManager)' +
                '.getBlobProvider("vantage").getBinaryManager().getBinary(Context.Media);' +
                'Context.Binary.getFile().renameTo(new java.io.File(Context.Binary.getFile().getParent(), Context.Media.getFilename()));'
        }
    );
    return ctx.Binary;
}

function addMedia(digest, filename, body) {
    var mediaPath = VantageShare + digest.substring(0, 2) + WPS + digest.substring(2, 4) + WPS + filename;
    body.Medias[0].Files.push(mediaPath);
}

/*
 * Perform the REST call
 */
function run(input, params) {
    var doc;
    // If called by workflow...
    if (input.length) {
        doc = input[0];
    } else {
        doc = input;
    }
    var urlBase = Env["telestream.url"] === null ? "http://localhost:8678" : Env["telestream.url"];
    var url = urlBase + "/Rest/Workflows/" + ctx.WorkflowVariables.Configuration + "/Submit";
    Console.warn("Workflow URL: " + url);
    var headers = {
        "Content-Type": "application/json"
    };
    var body, jobId, resultStringBlob, resultTxt, resultObj, msg;
    // Format body input
    var rawBody = javascript.Telestream_JobInputs(input, {
        'Template': 'true'
    });
    body = JSON.parse(rawBody).result;

    // Prepare media, copy to share
    body.Medias[0].Files = [];
    var binary = stageBinary(input, doc["file:content"]);
    addMedia(binary.getDigest(), doc["file:content"].getFilename(), body);

    // Set input variables
    body.Priority = ctx.WorkflowVariables.Priority;
    body.JobName = ctx.WorkflowVariables.JobName;
    var jobInputs = body.Variables;
    Log(input, {
        'level': "warn",
        'message': "Parameters: " + ctx.WorkflowVariables.Parameters
    });
    for (var v = 0; v < jobInputs.length; v++) {
        var inp = jobInputs[v];
        // Todo: escape Name
        var exp = '^' + inp.Name + '=(.+)$';
        var inv = new RegExp(exp, "m");
        Log(input, {
            'level': "warn",
            'message': "Testing variable: " + exp
        });
        var field = inv.exec(ctx.WorkflowVariables.Parameters);
        Log(input, {
            'level': "warn",
            'message': "Exec: " + JSON.stringify(field)
        });
        if (field && field.length && field.length > 1 && field[1]) {
            inp.Value = field[1];
        }
    }
    // Invoke REST Call
    Console.warn("Submitting:\n" + JSON.stringify(body));
    resultStringBlob = HTTPlabs.Call(input, {
        'method': "POST",
        'url': url,
        'headersAsJSON': JSON.stringify(headers),
        'body': JSON.stringify(body)
    });
    // If we are here, the call itself was successful, lets get the results as an object
    resultTxt = resultStringBlob.getString();
    Console.warn("Got Submission:\n" + resultTxt);
    resultObj = JSON.parse(resultTxt);
    // Check the status. Here, we are expecting 200
    if (resultObj.status >= 200 && resultObj.status < 400) {
        jobId = resultObj.result.JobIdentifier;
        Console.warn("Setting job ID: " + jobId);
        Context.SetWorkflowVar(
            input, {
                'name': 'JobID',
                'value': jobId
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