/*
// Extract text from the image and store it in dc:source.
// Extract labels from the image and store it in tagging.
*/
function run(input, params) {

  var blob, texts, textValue, annotations, previousValue, i, max;

  previousValue = input["dc:source"];
  textValue = null;
  
  blob = Picture.GetView(input, {
    'viewName': 'OriginalJpeg'
  });

  if (blob !== null) {
    blob = VisionOp(blob, {
      'features': ['TEXT_DETECTION', 'LABEL_DETECTION'],
      'maxResults': 5,
      'outputVariable': 'annotations'
    });

    annotations = ctx.annotations;

    if (hasLength(annotations)) {

      // Extract text from the image and store it in dc:source.
      texts = annotations[0].getOcrText();
      if (hasLength(texts)) {
        textValue = "";
        max = texts.length;
        for (i = 0; i < max; i++) {
          textValue += texts[i].getText() + "\n";
        }
      }

      // Extract labels from the image and store it in tagging.
      var labels = annotations[0].getClassificationLabels();
      if (labels !== undefined && labels !== null && labels.length > 0) {
        var tags = [];
        for (i = 0; i < labels.length; i++) {
          tags.push(labels[i].getText().replace(/\s/g, '+'));
        }
        input = Services.TagDocument(input, {
          'tags': tags
        });
      }
    }

    if (isBlank(previousValue) && isBlank(textValue)) {
      // nothing
    } else if (previousValue !== textValue) {
      input = Document.SetProperty(input, {
        'xpath': 'dc:source',
        'save': true,
        'value': textValue
      });
    }
  }

  return input;

}

function isBlank(aStr) {
  return typeof aStr === "undefined" || aStr === null || aStr === "";
}

function hasLength(anObj) {
  return typeof anObj !== "undefined" && anObj !== null && anObj.length;
}
