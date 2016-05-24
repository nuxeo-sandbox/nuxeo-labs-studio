# About **home-tab-analytics**

This example adds a Data Visualization analytics dashboard to the `HOME` tab in Nuxeo. It consists of a layout template for the dashboard and an XML Extension to place it in the HOME tab.

The dashboard uses [Polymer](https://www.polymer-project.org/1.0/) Web components, including some of Nuxeo's own components from [nuxeo-elements](https://doc.nuxeo.com/display/NXDOC/Nuxeo+Elements) and [nuxeo-dataviz-elements](https://doc.nuxeo.com/display/NXDOC/Data+Visualization).

It should be noted that this is not a complete Polymer project. This dashboard takes advantage of the fact that many Web components are already installed in the platform (via [Admin Center Analytics](https://github.com/nuxeo/nuxeo/tree/master/nuxeo-features/nuxeo-admin-center/nuxeo-admin-center-analytics)). This is done in order to avoid the complexity of creating a full Polymer project, as well as to avoid creating a Nuxeo plug-in. As such the dashboard is a single page that contains all CSS, HTML, and JavaScript necessary to perform its function.

On the other hand if you need to use dependencies that are not part of the Nuxeo platform in order to create your Polymer application, or your application requires large amounts of content, you may find that maintaining the content manually, as in this example, is exceedingly difficult. In that case it is better to create a full Polymer project and Nuxeo plug-in.

## Installation

Install `datascience-analytics-dashboard.html` in the `Resources` section of the Nuxeo Studio project as a `Layout` template.

Install `xml-extension.xml` as an XML Extension.

Note that the dashboard expects certain document types and configuration so it may need to be adapted to your project (see below for details).

## Model

The dashboard expects the following document types to be available:

* Report
* Dataset
* Datasource
* Notebook

The dashboard expects the following lifecycle states to be available:

* accepted
* rejected

It can be adapted of course. Modify the `nuxeo-repository-data` elements as needed to fetch the data you want.

## Development

Development is best accomplished in the following fashion:

* Add the files to Studio
* Deploy the Studio project
* Make changes to the files in `nuxeo.war` until a milestone is achieved; thus you can simply refresh the browser to test the changes
* Copy the modifications back to Studio

In this way it's very easy to test and make changes quickly. Note that if you redeploy the Studio project, or restart the server, any local changes in `nuxeo.war` will be lost.

## Notes & Limitations

The dashboard is a single page that contains all CSS, HTML, and JavaScript necessary to perform its function. Thus it is at risk of becoming a monolithic, hard-to-maintain single file. For a simple dashboard like this the convenience of being able to add the layout via Nuxeo Studio outweighs the disadvantages of having a single file to maintain.

[Google recommends](https://www.polymer-project.org/1.0/docs/devguide/registering-elements#main-document-definitions) that the main document in a Polymer application **not** define elements. As such the dashboard in this example somewhat limited in what it can do with the Web components that it contains. Styling works as expected, as well as binding. The main limitation is that the dashboard cannot take advantage of [behaviors](https://www.polymer-project.org/1.0/docs/devguide/behaviors) and [observers](https://www.polymer-project.org/1.0/docs/devguide/properties#change-callbacks). In particular the dashboard has implemented the functions from [nuxeo-chart-data-behavior](https://github.com/nuxeo/nuxeo/blob/master/nuxeo-features/nuxeo-admin-center/nuxeo-admin-center-analytics/src/main/elements/nuxeo-chart-data-behavior/nuxeo-chart-data-behavior.html) in order to be able to use [nuxeo-chart-elements](https://github.com/nuxeo/chart-elements). Had the dashboard been a Web component, it could have inherited the behavior and therefore taken advantage of improvements or bug fixes in `nuxeo-chart-data-behavior` over time.

## Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

## Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Netflix, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris.

More information is available at [www.nuxeo.com](http://www.nuxeo.com).
