# About **nuxeo-labs-studio**

This module contains the necessary files and instructions too add certain features to your [Nuxeo](http://www.nuxo.com) application via [Nuxeo Studio](http://www.nuxeo.com/products/studio/) for use with JSF-based UI.

## Contributing

Each new module should be created in a new folder. You should include a readme with your module to explain how it works. You should update this file with a one sentence explanation of the module.

## Sub-Module Organization

Module | Description
--- | ---
`alert-count-widget` | A widget that uses [OperationActionBean](http://explorer.nuxeo.com/nuxeo/site/distribution/cap-8.3/viewSeamComponent/seam:operationActionBean) to display the result of Automation in JSF.
`content-view-count` | A widget to display the total number of items in a Content View
`content-view-thumbnail-size-slider` | A slider widget to resize thumbnails in Content View
`currency-*-format-widget`s | Widgets to format currency for display in JSF.
`external-header-menu-widget` | A widget designed to display a list of links in the header menu, similar to the user menu, but with links instead of actions in it.
`external-link-widget` | Widget template for a text field, will display the value as a link in view mode, simple input text in edit mode
`flash-preview-widget` | Enables to display a flash file (.swf)
`home-tab-analytics` | Data Visualization example to add an analytics dashboard to the `HOME` tab
`iframe-widget` | A generic iframe widget that can be used to display content from outside Nuxeo.
`json-pretty-print` | Custom widget to display JSON text with pretty printing and colorization
`listing-icon-both-types` | Display both the document-type and binary-type icon in a list view
`pdf-preview-widget` | A widget that uses the [pdf.js](https://mozilla.github.io/pdf.js/) preview widget to display document previews

## Building

There is nothing to build. Each module generally has a custom template or XML Extension that you may add via Nuxeo Studio.

## Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.


## Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)


## About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris.

More information is available at [www.nuxeo.com](http://www.nuxeo.com).
