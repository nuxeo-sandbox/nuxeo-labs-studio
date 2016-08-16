# About **content-view-count**

This example adds a count of the total number of results to all Content Views.

## Installation

Install `content-view-count-widget.xhtml` in the `Resources` section of the Nuxeo Studio project as a `Widget` template.

Install `content-view-count.xml` as an XML Extension.

## Notes & Limitations

It is possible for the [Paginable.getResultsCount()](http://community.nuxeo.com/api/nuxeo/8.3/javadoc/org/nuxeo/ecm/automation/core/util/Paginable.html#getResultsCount--) method to return negative values. Generally this happens if the underlying system (e.g. SQL database) cannot determine the total result count (usually for optimization reasons). For this reason the widget template hides the count if it is less than or equal to 0.

## Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

## Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Netflix, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris.

More information is available at [www.nuxeo.com](http://www.nuxeo.com).
