# About **external-header-menu-widget**

This widget is an action widget template: <http://doc.nuxeo.com/x/X4cPAQ>. It is designed to display a list of links in the header menu (similar to the user menu but with links instead of actions in it).

It must be contributed to the header through the action extension point using the action type template, here is a simple example:


    <extension point="actions" target="org.nuxeo.ecm.platform.actions.ActionService">
        <action id="externalMenuHeader" order="101" type="template">
          <category>MAIN_TABS</category>
          <properties>
            <property name="addForm">false</property>
            <property name="template">/widgets/external-header-menu-widget.xhtml
            </property>
          </properties>
        </action>
    </extension>


## Installation

Install `external-header-menu-widget.xhtml` in the `Resources` section of the Nuxeo Studio project as a `Widget` template.

## Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

## Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris.

More information is available at [www.nuxeo.com](http://www.nuxeo.com).
