# Kibana Source Code Analysis

This is a small weekend project analyzing the source code of kibana on a file/LOC basis and visualizing the results in kibana.

## Run it

* Check out this repo: `git clone git@github.com:flash1293/kibana_analyze.git`
* Check out kibana besides this repo: `git@github.com:elastic/kibana.git`
* Start a local elasticsearch / kibana instance (you can use `docker-compose up`)
* Install dependencies (`yarn install`)
* Collect data `node index.js` (this may take a while)
* Import the dashboards and visualizations from `dashboards.json`
* Look at the data in your kibana instance

### Current State (Latest Tag)
![Current State](https://raw.githubusercontent.com/flash1293/kibana_analyze/master/screenshot1.png)
### History
![History](https://raw.githubusercontent.com/flash1293/kibana_analyze/master/screenshot2.png)
### React Implementations of Directives
![React Implementations of Angular Directives](https://raw.githubusercontent.com/flash1293/kibana_analyze/master/screenshot3.png)

## Data

The script checks out the last 80 tags of the repo and collects for each tag the following values for each file:
* Lines of code (separated by comment, code, mixed, ...) as provided by the `sloc` lib
* Filename
* Path of directories (`dir0`, `dir1`, ... `dirN`)
* File extension
* Whether it is a unit test file
* Whether it references the AngularJs ui module
* Whether it defines an angular directive, controller or service
* Whether it uses `ngReact`
* Git tag

Running `index.js` prunes the index and collects everything again.

## Improvement TODOs

* [ ] Incremental index build
* [ ] Collect for each commit (or each n commits of master)
* [ ] Separate collection for code changes instead of files at a given time (the current data doesn't reflect whether existing LOCs has been changed)
* [ ] More robust React/Angular detection
* [ ] More robust unit test detection
* [ ] Scripted fields for ratio code metrics like todos per total LOC
* [ ] Fix alphabetical tag ordering bug (maybe just skip alpha and beta versions?)
* [ ] Index since the beginning of time
* [ ] Collect additional metrics (# of classes in TS/JS, style rules in CSS, ...)
* [ ] Collect amount of services/directives/controller for each file
* [ ] Merge with information about code coverage / linting errors
