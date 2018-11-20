# About **nuxeo-labs-studio**

This repository contains the necessary files and instructions too add certain features to your [Nuxeo](http://www.nuxo.com) application via [Nuxeo Studio](http://www.nuxeo.com/products/studio/) for use with WebUI.

## Contributing

Each new module should be created in a new folder. You should include a readme with your module to explain how it works. You should update this file with a one sentence explanation of the module.

## Sub-Module Organization

Module | Description
--- | ---
`retention` | Helpers to get you started with [nuxeo-retention](https://github.com/nuxeo-sandbox/nuxeo-retention)
`sfdc-webui` | Simple changes to display Salesforce metadata when using [nuxeo-salesforce](https://doc.nuxeo.com/n/QMl)
`toggleable-form` | Toggable `paper-card` that displays the Metadata or Edit layout of the passed document, as appropriate
`trk-metrics` | A somewhat generic module for analytics; generate a bunch of data and visualize it
`workflow-status` | Workflow status listing
`ssn` | Display Social Security Number (or not)

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
