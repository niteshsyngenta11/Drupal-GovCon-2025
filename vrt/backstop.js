require('dotenv').config();

let env = "";

const referenceUrl = process.env.BASE_SITE || "https://dev-drupal-govcon.pantheonsite.io"

if (process.env.PR_NUMBER) {
    env = `pr-${process.env.PR_NUMBER}`;
}

const url = process.env.SITE_TO_TEST || (env ? `https://${env}-drupal-govcon.pantheonsite.io` : "https://dev-drupal-govcon.pantheonsite.io");
const subfolder = env || '';
const path = `backstop_data/${subfolder}`;

const pages = {
    "Homepage": "/"
}

let scenarios = [];

for (let [key, value] of Object.entries(pages)) {
    scenarios.push({
        label: key,
        url: url + value,
        referenceUrl: referenceUrl + value,
        hideSelectors: [],
        removeSelectors: [],
        selectorExpansion: true,
        selectors: [],
        readySelector: "",
        readyEvent: "",
        delay: 8000,
        expect: 0,
        misMatchThreshold: 1,
        postInteractionWait: 0,
        hideSelectors: [
            "#block-digc-local-tasks"
        ],
    })
}

module.exports = {
    "id": "govcon-backstop",
    "viewports": [
        {
            "label": "phone",
            "width": 460,
            "height": 580
        },
        {
            "label": "desktop",
            "width": 1920,
            "height": 1024
        }
    ],
    "onBeforeScript": "puppet/onBefore.js",
    "onReadyScript": "puppet/onReady.js",
    "scenarios": scenarios,
    "paths": {
        "bitmaps_reference": path + "/bitmaps_reference",
        "bitmaps_test": path + "/bitmaps_test",
        "engine_scripts": "backstop_data/engine_scripts",
        "html_report": path + "/html_report",
        "ci_report": path + "/ci_report"
    },
    "report": [
        "browser",
        "CI"
    ],
    "engine": "puppeteer",
    "engineOptions": {
        "args": [
            "--no-sandbox"
        ]
    },
    "asyncCaptureLimit": 10,
    "asyncCompareLimit": 50,
    "debug": false,
    "debugWindow": false
}
