# About

Module for generating data to be used in a Kibana dashboard, and displayed in the "Analytics" are of Web UI.

# Configuration

* Create a Vocabulary for metrics units
  * `trk_metrics_units`
  * *id/label - order*
  * ms - 0
  * secs - 1
  * mins - 2
  * hours - 3
  * days - 4

* Create a schema for metrics data
  * id = `trk_metrics`
  * prefix = `trk`
  * `completion_duration` - Integer
  * `completion_end` - Date
  * `completion_start` - Date
  * `completion_units` - Directory bound to `trk_metrics_units` - default `ms`

## Installation

1. Install TRK_METRICS.xml as an XML Extension
2. Install the scripts in the `automation` folder as Automation Scripts
3. Install the content in the `ui` folder as Resources in Designer
4. Modify `trk_GenerateData_Docs` to suit your use case
5. Modify `trk-metrics-analytics-layout.html` with the URL of your Kibana dashboard

## Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

## Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris.

More information is available at [www.nuxeo.com](http://www.nuxeo.com).
