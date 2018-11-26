# Kibana Source Code Analysis

This is a small weekend project analyzing the source code of kibana on a file/LOC basis and visualizing the results in kibana.

## Install

* Check out this repo: `git clone git@github.com:flash1293/kibana_analyze.git`
* Check out kibana besides this repo: `git@github.com:elastic/kibana.git`
* Start a local elasticsearch / kibana instance (you can use `docker-compose up`)
* Collect data `node index.js` (this may take a while)
* Import the dashboards and visualizations from `dashboards.json`
* Look at the data in your kibana instance

![Current State](https://raw.githubusercontent.com/flash1293/kibana_analyze/master/screenshot1.png)
![History](https://raw.githubusercontent.com/flash1293/kibana_analyze/master/screenshot2.png)