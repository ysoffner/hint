/* eslint sort-keys: 0, no-undefined: 0 */

import generateHTMLPage from 'hint/dist/src/lib/utils/misc/generate-html-page';
import { getHintPath } from 'hint/dist/src/lib/utils/hint-helpers';
import { HintTest } from '@hint/utils-tests-helpers/dist/src/hint-test-type';
import * as hintRunner from '@hint/utils-tests-helpers/dist/src/hint-runner';

const htmlWithManifestSpecified = generateHTMLPage(`<link rel="manifest" href="site.webmanifest">`);

const tests: Array<HintTest> = [
    {
        name: `Manifest is not specified`,
        reports: [{ message: 'Web app manifest not specified' }],
        serverConfig: generateHTMLPage('<link rel="stylesheet" href="style.css">')
    },
    {
        name: `Manifest is specified multiple times`,
        reports: [{ message: 'A web app manifest file was already specified' }],
        serverConfig: {
            '/': generateHTMLPage(`<link rel="manifest" href="site1.webmanifest"><link rel="manifest" href="site2.webmanifest">`),
            '/site1.webmanifest': '',
            '/site2.webmanifest': ''
        }
    },
    {
        name: `Manifest is specified with no 'href'`,
        reports: [{ message: `Should have non-empty 'href'` }],
        serverConfig: generateHTMLPage('<link rel="manifest">')
    },
    {
        name: `Manifest is specified with empty 'href'`,
        reports: [{ message: `Should have non-empty 'href'` }],
        serverConfig: generateHTMLPage('<link rel="manifest" href="">')
    },
    {
        name: `Manifest is specified as a full URL`,
        serverConfig: {
            '/': generateHTMLPage('<link rel="manifest" href="http://localhost/site.webmanifest">'),
            '/site.webmanifest': ''
        }
    },
    {
        name: `Manifest is specified as only the file extension`,
        serverConfig: {
            '/': generateHTMLPage('<link rel="manifest" href="http://localhost/.webmanifest">'),
            '/.webmanifest': ''
        }
    },
    {
        name: `Manifest is specified and the file exists`,
        serverConfig: {
            '/': htmlWithManifestSpecified,
            '/site.webmanifest': ''
        }
    },
    {
        name: `Manifest is specified and request for file fails`,
        reports: [{ message: 'File could not be fetched' }],
        serverConfig: {
            '/': htmlWithManifestSpecified,
            '/site.webmanifest': null
        }
    },
    {
        name: `Manifest is specified and request for file fails with status code 404`,
        reports: [{ message: `File could not be fetched (status code: 404)` }],
        serverConfig: {
            '/': htmlWithManifestSpecified,
            '/site.webmanifest': { status: 404 }
        }
    },
    {
        name: `Manifest is specified and request for file fails with status code 500`,
        reports: [{ message: `File could not be fetched (status code: 500)` }],
        serverConfig: {
            '/': htmlWithManifestSpecified,
            '/site.webmanifest': { status: 500 }
        }
    }
];

hintRunner.testHint(getHintPath(__filename), tests, { parsers: ['manifest'] });
