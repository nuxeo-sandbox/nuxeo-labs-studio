# About **email-templates**

Improved email templates for Nuxeo Studio.

## Templates

Preview | id | Theme | Comments
--- | --- | --- | ---
![Light](images/light.png) | workflowTaskAssigned | light | Logo image comes from github
![Dark](images/dark.png) | workflowTaskAssigned | dark | Logo image comes from github

## Installation

Copy the content of the template HTML file to the corresponding object in your Studio configuration (Templates | Mail Templates). If the object does not exist, create a new one with the `id` listed above.

## Tips

* Use `${Runtime.getProperty('nuxeo.url')}` to get your application logo, e.g. `<img src="${Runtime.getProperty('nuxeo.url')}/img/nuxeo_dam_logo.png" />`
* If you're running on localhost, you'll need to point the logo to a static link on the Web as gmail, for example, won't display images from localhost.
* if you want `docUrl` to point to Web UI please see: https://doc.nuxeo.com/nxdoc/how-to-customize-email-templates/#making-the-document-links-in-notification-emails-point-to-the-web-ui

## Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

## Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris.

More information is available at [www.nuxeo.com](http://www.nuxeo.com).
