# About

Module for generating data to be used in a Kibana dashboard, and displayed in the "Analytics" area of Web UI.

This module supports a "story" that the duration of content with completion dates decreases over time, because Nuxeo makes things more efficient. It uses a exponential function, with some jiggle, to create this trend.

Note that while the data is contrived, the metrics and analytics *are* data-driven.  In other words, if the application was filled with "real" data, the analtyics would still work, we just happen to be filling it with artificial data.

# Installation

1. Install TRK_METRICS.xml as an XML Extension
2. Install the scripts in the `automation` folder as Automation Scripts
3. Install the content in the `ui` folder as Resources in Designer (including the subfolders)
4. (optional) Modify `trk_GenerateData_Docs` to suit your use case; by default it creates `File` documents with metrics data, but you can choose a different document type.

# Configuration

## Modeler

* Create a Vocabulary for metrics units
  * id = `trk_metrics_units`
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
  * `due_date` - Date
    * Note: requires standalone ES to be useful

## Designer

* Translation keys:
  * `app.title.admin.trkMetricsButtons` <- title to display when the Metrics Setup screen is displayed

## Kibana

Note: this is not an explanation of how to use Kibana, it's just a list of things that need to be created for the default implementation. Kibana how-tos are documented elsewhere.

* Format fields for human readability
  * Set the `trk:completion_duration` field format to `Duration`, output format to `Human-Readible`, the input format to `Milliseconds`
* Create a query to locate the metrics documents. There are several ways you can do this:
  * Filter for the `Metrics` facet
  * Filter for the duration `trk\:completion_duration > 0`
  * The main thing to keep in mind is that you might want to include "real" documents as well, not just the generated ones
* Create 3-4 Visualizations
  * Pie chart docs by "category" (dc:nature by default)
  * (optional) Stacked Bar chart for Completion Date vs Due Date (was the task completed on time, late, ahead of time?)
    * This one requires standalone ES with a scripted field:
      * `doc['trk:completion_end'].value - doc['project:due_date'].value`
    * X-axis by `terms` on the above field
    * Split series by "category"
  * Area Chart for Completed per week
    * X-axis Date Historgram by `trk:completion_end`
    * Split Series by "category"
  * Bar Chart for Duration
    * Y-axis Average for `trk:completion_duration`
    * X-axis Date Histogram with `trk:completion_end`, interval `Daily`
    * Split series by "category"
* Create a dashboard with your visualizations
* Set the Dashboard URL in Designer in trk-metrics-analytics-layout.html

# Usage

* Admin -> Metrics Setup -> generate data for metrics
* Admin -> Analytics -> the default analytics tab should display your Kibana dashboard

# Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

# Licensing

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

# About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris.

More information is available at [www.nuxeo.com](http://www.nuxeo.com).
