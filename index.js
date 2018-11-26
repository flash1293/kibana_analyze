const find = require("find");
const path = require("path");
const fs    = require("fs");
const sloc  = require("sloc");
const git = require("simple-git/promise")("../kibana");
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

const fileExtensions = ['.js', '.ts', '.jsx', '.tsx', '.html', '.css'];

function analyzeCode(code) {
    return {
        referencesAngularUiModule: code.indexOf("import { uiModules }") > -1,
        definesAngularDirective: code.indexOf(".directive('") > -1,
        definesAngularService: code.indexOf(".service('") > -1,
        definesAngularController: code.indexOf(".controller('") > -1,
        bridgesReactComponent: code.indexOf("reactDirective") > -1,
    };
}

function findFiles(dir) {
    return new Promise((resolve) => {
        find.file(dir, files => {
            resolve(files);
        });
    });
}


async function analyze() {
    const files = await findFiles("../kibana");
    return files.filter((file) => fileExtensions.indexOf(path.extname(file)) !== -1).map(file => {
        const code = fs.readFileSync(file, { encoding: "utf8" });
        const dirs = file.split(path.sep).slice(2);
        const filename = dirs.pop();
        const ext = path.extname(filename);
        const attributes = {
            ...(sloc(code, ext.substr(1))),
            ...analyzeCode(code),
            isTestFile: dirs.includes("__tests__") || filename.indexOf(".test.") > -1,
            ext,
            filename
        };
        dirs.forEach((dir, i) => {
            attributes["dir" + i] = dir;
        });

        return attributes;
    });
}

(async function() {
    await client.deleteByQuery({
        index: 'kibana_src',
        body: {
            query: {
                "match_all" : {}
            }
        }
    });
    const tags = await git.tags();
    for (tag of tags.all.slice(tags.all.length - 80)) {
        await git.checkout(tag);
        console.log(`Tag ${tag}`);
        const files = await analyze();
        const elasticBody = [];
        files.forEach(file => {
            elasticBody.push({ index:  { _index: 'kibana_src', _type: 'file' } });
            elasticBody.push({ ...file, tag });
        });
        await client.bulk({
            body: elasticBody
        });
    }
})();