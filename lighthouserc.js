"use strict";

let env = 'dev';

if (process.env.PR_NUMBER && !isNaN(parseInt(process.env.PR_NUMBER))) {
    env = `pr-${process.env.PR_NUMBER}`;
} else {
    console.log("PR_NUMBER is not defined or is not a number");
}

module.exports = {
    ci: {
        collect: {
            url: [
                `https://${env}-drupal-govcon.pantheonsite.io`,
            ],
            settings: {
                chromeFlags: '--no-sandbox --ignore-certificate-errors --disable-dev-shm-usage',
                preset: 'perf',
                onlyCategories: [
                    'performance',
                    'accessibility',
                    'best-practices',
                    'seo',
                ],
                skipAudits: ['color-contrast']
            },
            numberOfRuns: 3
        },
        assert: {
            assertions: {
                'categories:performance': [
                    'error',
                    { minScore: 0.75, aggregationMethod: 'median-run' },
                ],
                'categories:accessibility': [
                    'error',
                    { minScore: 1, aggregationMethod: 'median-run' },
                ],
                'categories:best-practices': [
                    'error',
                    { minScore: 0.9, aggregationMethod: 'pessimistic' },
                ],
                'categories:seo': [
                    'error',
                    { minScore: 0.6, aggregationMethod: 'pessimistic' },
                ],
                'errors-in-console': ['error', {}],
            },
        },
    },
};

if (process.env.GITHUB_ACTIONS) {
    module.exports.ci.upload = {
        target: 'temporary-public-storage',
    };
}