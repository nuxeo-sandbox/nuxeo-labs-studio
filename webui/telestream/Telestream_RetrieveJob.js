var VantageShare = "\\\\cob-hds-1.ldschurch.org\\compression\\nuxeotest\\data\\";
var NuxeoShare = "/mnt/Fayette/nuxeotest/data/";
var WPS = "\\";

function attachOutput(ctx, input, file) {
    ctx.Location = normalizeFilename(file);
    var dest = ctx.WorkflowVariables.Destination;
    if (!dest) {
        dest = 'renditions';
    }
    Log(input, {
        'level': "warn",
        'message': "Attaching output: " + ctx.Location + " (" + file + ") to " + input + " as " + dest
    });
    // Attach as new blob from file
    RunScript(
        input, {
            'script': 'Context.Transcoded = org.nuxeo.ecm.core.api.Blobs.createBlob(new java.io.File(Context.Location));'
        }
    );
    var blob = ctx.Transcoded;

    if (dest === 'files') {
        Blob.AttachOnDocument(
            blob, {
                'document': input,
                'save': true,
                'xpath': 'files:files'
            }
        );
    } else if (dest === 'renditions') {
        RunScript(
            input, {
                'script': 'Context.TranscodedVideo = org.nuxeo.ecm.platform.video.TranscodedVideo.fromBlobAndInfo(Context.Transcoded.getFilename(), Context.Transcoded, org.nuxeo.ecm.platform.video.VideoHelper.getVideoInfo(Context.Transcoded));'
            }
        );
        Log(input, {
            'level': "warn",
            'message': "Attaching transcoded: " + ctx.TranscodedVideo
        });
        Log(input, {
            'level': "warn",
            'message': "Attaching transcoded: " + JSON.stringify(ctx.TranscodedVideo.toMap())
        });
        Document.AddItemToListProperty(
            input, {
                'complexJsonProperties': JSON.stringify(ctx.TranscodedVideo.toMap()),
                'xpath': 'vid:transcodedVideos',
                'save': true
            }
        );
    } else if (dest === 'none') {
        Log(input, {
            'level': "warn",
            'message': "No destination selected for: " + file
        });
    } else {
        // New doc
        var title = input.name + " (" + ctx.WorkflowVariables.Configuration + ")";
        var parentDoc = Document.GetParent(input, {});
        var newDoc = Document.Create(
            parentDoc, {
                'type': 'Video',
                'name': title,
                'properties': 'dc:title=' + title + '\ndc:description=' + ctx.WorkflowVariables.Configuration
            }
        );
        Blob.AttachOnDocument(
            blob, {
                'document': newDoc,
                'save': true,
                'xpath': 'file:content'
            }
        );
    }
}

function normalizeFilename(path) {
    var pointer = path;
    if (path.startsWith(VantageShare)) {
        pointer = path.substring(VantageShare.length);
        pointer = NuxeoShare + pointer.split(WPS).join("/");
    }
    return pointer;
}

function run(input, params) {
    var doc;
    // If called by workflow...
    if (input.length) {
        doc = input[0];
    } else {
        doc = input;
    }
    var urlBase = Env["telestream.url"] === null ? "http://localhost:8678" : Env["telestream.url"];
    var url = urlBase + "/Rest/Jobs/" + ctx.WorkflowVariables.JobID + "/Outputs";
    Console.warn("Job outputs URL: " + url);
    var headers = {
        "Content-Type": "application/json"
    };
    var jobResult, resultStringBlob, resultTxt, resultObj, msg;
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
        jobResult = resultObj.result;
        Log(input, {
            'level': "warn",
            'message': "Job result: " + JSON.stringify(jobResult)
        });
        if (jobResult.Medias && jobResult.Medias.length) {
            for (var j = 0; j < jobResult.Medias.length; j++) {
                var output = jobResult.Medias[j];
                if (output.Files && output.Files.length) {
                    for (var f = 0; f < output.Files.length; f++) {
                        attachOutput(ctx, doc, output.Files[f]);
                    }
                }
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
    return input;
}