:warning: **This repository is substituted by the new [Nuxeo Studio Community Cookbook](https://github.com/nuxeo/nuxeo-studio-community-cookbook) repository since August 2019.** Consequently, do not put your contributions in this repository.

# About **nuxeo-labs-studio**

This repository contains the necessary files and instructions too add certain features to your [Nuxeo](http://www.nuxo.com) application via [Nuxeo Studio](http://www.nuxeo.com/products/studio/). Some modules are for JSF, some are for WebUI, and others (at the root level) are unrelated to the UI.

## Contributing

Each new module should be created in a new folder. You should include a readme with your module to explain how it works. You should update this file with a one sentence explanation of the module.

## Sub-Module Organization

Module | Description
--- | ---
`convert-date-timestamp` | Javascript to convert a Nuxeo Date into a timestamp that is suitable for NXQL.
`email-templates` | Improved email templates for Nuxeo Studio
`jsf` | older modules specific to JSF
`nuxeo-vision-mappers` | Mappers for Nuxeo Vision plugin
`video-conversions` | A comprehensive list of video conversions
`web-ui` | modules specific to WebUI

## Building

There is nothing to build. Each module generally has a custom template or XML Extension that you may add via Nuxeo Studio.

# Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

# License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

# About Nuxeo

Nuxeo Platform is an open source Content Services platform, written in Java. Data can be stored in both SQL & NoSQL databases.

The development of the Nuxeo Platform is mostly done by Nuxeo employees with an open development model.

The source code, documentation, roadmap, issue tracker, testing, benchmarks are all public.

Typically, Nuxeo users build different types of information management solutions for [document management](https://www.nuxeo.com/solutions/document-management/), [case management](https://www.nuxeo.com/solutions/case-management/), and [digital asset management](https://www.nuxeo.com/solutions/dam-digital-asset-management/), use cases. It uses schema-flexible metadata & content models that allows content to be repurposed to fulfill future use cases.

More information is available at [www.nuxeo.com](https://www.nuxeo.com).
