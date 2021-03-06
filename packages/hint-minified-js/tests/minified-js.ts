import generateHTMLPage from 'hint/dist/src/lib/utils/misc/generate-html-page';
import { HintTest } from '@hint/utils-tests-helpers/dist/src/hint-test-type';
import { getHintPath } from 'hint/dist/src/lib/utils/hint-helpers';
import * as hintRunner from '@hint/utils-tests-helpers/dist/src/hint-runner';

const generateScriptTag = (script) => {
    return `<script>${script}</script>`;
};

const hintPath = getHintPath(__filename);

const expectedMessageFromHint = 'JavaScript content could be minified';
const unminifiedJs= `
// This method does something
var highlightCodeBlocks = function () {
    var codeBlocks = document.querySelectorAll('code');

    for (var i = 0; i < codeBlocks.length; i++) {
        hljs.highlightBlock(codeBlocks[i]);
    }
};

// This method does something else
var updateExpandAllButton = function (element, closeAll) {
    var expanded = typeof closecloseAll !== 'undefined' ? closeAll : childRulesExpanded(element);

    if (expanded) {
        element.innerHTML = ' close all';
        element.classList.remove('closed');
        element.classList.add('expanded');
    } else {
        element.innerHTML = ' expand all';
        element.classList.remove('expanded');
        element.classList.add('closed');
    }
};
`;

const minifiedJs = `!function(){"use strict";Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;if(!document.documentElement.contains(this))return null;do{if(t.matches(e))return t;t=t.parentElement}while(null!==t);return null});var e,s=function(e,t){var n;("undefined"!=typeof closecloseAll?t:(n=e.closest(".rule-result"),Array.prototype.slice.apply(n.querySelectorAll(".rule-result--details")).some(function(e){return"true"===e.getAttribute("aria-expanded")})))?(e.innerHTML="- close all",e.classList.remove("closed"),e.classList.add("expanded")):(e.innerHTML="+ expand all",e.classList.remove("expanded"),e.classList.add("closed"))},r=function(e,t){var n=e.closest(".rule-result--details"),l=void 0!==t?t:"true"===n.getAttribute("aria-expanded"),o=e.getAttribute("data-rule"),r=n.closest(".rule-result").querySelector(".button-expand-all");l?(n.setAttribute("aria-expanded","false"),e.innerHTML="open details",e.setAttribute("title","show "+o+"'s result details")):(n.setAttribute("aria-expanded","true"),e.innerHTML="close details",e.setAttribute("title","close "+o+"'s result details")),s(r)},t=function(e){var t=e.target;-1!==t.className.indexOf("button--details")&&r(t),-1!==t.className.indexOf("button-expand-all")&&function(e){for(var t=e.closest(".rule-result"),n=Array.prototype.slice.apply(t.querySelectorAll(".button--details")),l=e.classList.contains("expanded"),o=0;o<n.length;o++)r(n[o],!!l);s(e,!l)}(t)},n=document.querySelector(".permalink-copy");n&&n.addEventListener("click",function(){!function(e){var t="hidden-clipboard",n=document.getElementById(t);if(!n){var l=document.createElement("textarea");l.id=t,l.style.position="fixed",l.style.top=0,l.style.left=0,l.style.width="1px",l.style.height="1px",l.style.padding=0,l.style.border="none",l.style.outline="none",l.style.boxShadow="none",l.style.background="transparent",document.querySelector("body").appendChild(l),n=document.getElementById(t)}n.value=e,n.select(),document.execCommand("copy")}(document.querySelector(".scan-overview__body__permalink").textContent.trim())}),window.addEventListener("popstate",function(){var e,t;e="/scanner/",(t=window.location.href).length-e.length===t.indexOf(e)&&(window.location.href=window.location.href)},!1),(e=document.getElementById("results-container"))&&e.addEventListener("click",t,!1),function(){for(var e=document.querySelectorAll("code"),t=0;t<e.length;t++)hljs.highlightBlock(e[t])}()}();`;
const tests: Array<HintTest> = [
    {
        name: 'Minified content should pass',
        serverConfig: generateHTMLPage(generateScriptTag(minifiedJs))
    },
    {
        name: 'Unminified content should fail',
        reports: [{ message: expectedMessageFromHint }],
        serverConfig: generateHTMLPage(generateScriptTag(unminifiedJs))
    }
];
const testsWithHighThreshold: Array<HintTest> = [
    {
        name: 'Unminified content should pass with high threshold configured',
        serverConfig: generateHTMLPage(generateScriptTag(unminifiedJs))
    }
];

hintRunner.testHint(hintPath, tests, { parsers: ['javascript']});

/*
 * Verify the rule is respecting the threshold value passed via config
 * When the threshold is 100, rule will always pass as the improvemenIndex
 * we calculate will be always less than 100
 */
hintRunner.testHint(hintPath, testsWithHighThreshold, { hintOptions: { threshold: 100 }, parsers: ['javascript']});
