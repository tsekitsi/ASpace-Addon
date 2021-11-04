/** https://stackoverflow.com/a/61747276 */
// Source: https://gist.github.com/jwilson8767/db379026efcbd932f64382db4b02853e
// MIT Licensed
// Author: jwilson8767

/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * Useful for resolving race conditions.
 *
 * @param selector
 * @returns {Promise}
 */
function elementReady(selector) {
    return new Promise((resolve, reject) => {
        const el = document.querySelector(selector);
        if (el) {resolve(el);}
        new MutationObserver((mutationRecords, observer) => {
            // Query for elements matching the specified selector
            Array.from(document.querySelectorAll(selector)).forEach((element) => {
                resolve(element);
                //Once we have resolved we don't need the observer anymore.
                observer.disconnect();
            });
        }).observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

// To ensure we never miss a dropdown (:= content of a "tray").

// Maintain a set of the "trays" displayed at any given time.
// The list needs to be updated whenever (1) the Edit page is
// loaded, (2) the link "click here to load more records (##)"
// is clicked (class="alert-too-many"), (3) you add container
// instance by clicking the top button (data-instance-type=
// "sub-container"), (4) you add container instance by clicking
// the bottom button (first child of div with class="subrecord-
// add-as-you-go-actions" inside <section> element with id=
// "archival_object_instances_").

// Prints "Hello World!" to the console:
const printHello = () => {
    console.log("Hello World!");
}

/*
// Adds an onchange event listener to each tray:
const addListenerToElements = (elmts) => {
    for (var i = 0; i < elmts.length; i++) {
        elmts[i].addEventListener('change', printHello, false);
    }
}

// Returns a list of trays currently displayed:
const detectTrayElementsIn = (element) => {
    return element.getElementsByClassName("token-input-dropdown");
}
*/

const updateTrayElements = () => {
    // Once the "Instances" section has been rendered:
    elementReady('#archival_object_instances_').then((instancesSection)=>{
        "use strict";

        Array.from(instancesSection.getElementsByClassName("token-input-dropdown")).forEach(function(item) {
            console.log(item);
        });
        /*
        let trays = instancesSection.getElementsByClassName("token-input-dropdown");
        console.log(trays);
        for (let item of trays) {
            console.log(item);
        }
        */
        /*
        instancesSection.querySelectorAll('.token-input-dropdown').forEach(item => {
            console.log("I'm adding a listener!!");
            item.addEventListener('change', event => {
                printHello();
            })
        })
        */
        /*
        let trays = document.getElementsByClassName("token-input-dropdown");
        trays.forEach(function(element) {
            element.addEventListener('change', printHello, false);
        });
        */
    });
}

updateTrayElements();
