let amAllowed = true;
let selectedAbsolute = null;

const handleLiElements = (lis, muts, observr) => {
    // https://stackoverflow.com/a/56511770:
    setTimeout(() => {
        let selectedTemp = null;
        try {
            let ul = [...lis][0].parentElement;
            let lisAll = [...ul.children];
            // Dict of counters:
            let counters = {};
            if (lisAll.length>0) { //if (lisAll.length>0) {observr.disconnect();}
                // Keep track of which li elmt is selected:
                lisAll.forEach(l => {
                    boxLabel = l.children.item(0).ariaLabel;
                    try {
                        if (l.ariaSelected) {selectedTemp=boxLabel};
                    } catch (exception_var) {};
                });
                if (!(muts.type === 'attributes')) {  // "attribute" mutations gets triggered all the time so... avoid!
                    // Write ocurrence numbers next to box labels:
                    if (amAllowed) {
                        lisAll.forEach(l => {
                            boxLabel = l.children.item(0).ariaLabel;
                            if (!(boxLabel in counters)) {
                                counters[boxLabel] = 0;
                            }
                            counters[boxLabel]++;
                            let textnode = document.createTextNode(" -- ocur. "+counters[boxLabel]);  // Create a text node
                            l.appendChild(textnode);
                        });
                        amAllowed = false;
                    }
                    //console.log(selected);
                    selectedAbsolute = selectedTemp; // PERFECT spot to update "selectedAbsolute"
                }
            }  // else { amAllowed = true; }
        }
        catch (exception_var) {  // when there are no li's
            amAllowed = true;
        }
    }, 0);
}

// callback executed when canvas was found
const handleSectionElmt = (elmt) => {
    observer2.observe(document, {
        attributes: true,
        childList: true,
        subtree: true
    });
}

// set up the mutation observer
var observer1 = new MutationObserver(function (mutations, me) {
    // `mutations` is an array of mutations that occurred
    // `me` is the MutationObserver instance
    var instancesSection = document.querySelector('#archival_object_instances_'); //document.getElementById('archival_object_instances_');
    if (instancesSection) {
        handleSectionElmt(instancesSection);
        me.disconnect(); // stop observing
        return;
    }
});

const observer2 = new MutationObserver(function (mutations, me) {
    const lis = document.querySelector('#archival_object_instances_').getElementsByClassName('token-input-dropdown-item');
    if (lis) {
        handleLiElements(lis, mutations, me);
        return;
    }
});

// start observing
observer1.observe(document, {
    childList: true,
    subtree: true
});