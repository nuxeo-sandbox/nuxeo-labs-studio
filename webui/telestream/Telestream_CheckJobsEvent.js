var QUERY = "SELECT * FROM RoutingTask WHERE ecm:mixinType = 'HiddenInNavigation' AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND ecm:currentLifeCycleState = 'opened' AND nt:type = 'TelestreamJob-20181204113300899-simple-task'";

function run(input, params) {
    Auth.LoginAs(input, {});
    var docs = Repository.Query(
        null, {
            'query': QUERY
        }
    );
    // Console.warn("docs: " + docs);
    if (docs.length) {
        for (var i = 0; i < docs.length; ++i) {
            var doc = docs[i];
            var wfId = doc["nt:processId"];
            var wfDoc = Repository.GetDocument(
                input, {
                    'value': wfId
                }
            );
            var jobId = wfDoc["var_TelestreamJob:JobID"];
            javascript.Telestream_CheckJobs(wfDoc, {
                'JobID': jobId,
                'WorkflowInstanceID': wfId
            });
        }
    }
    return docs;
}