let selectedAbsolute = null;
/**
 *  <section id="..."> <-- this is the specific row we are modifying
 *      <div>
 * 		    <input>
 *  		<div>
 *  			<hr>
 *  			<div>
 *  				<label>
 *  				<div>
 *  					<div>
 *  						<ul>
 *  						<section> <-- occasionalUlsGrandparent
 *                              <div>
 *                                  <ul> <-- ulOccasional
 */
//let occasionalUlsGrandparent = null;  // <section> element
let idModifiedRow = null;
const handleLiElements = (lis, muts, observr) => {
    // https://stackoverflow.com/a/56511770:
    setTimeout(() => {
        let selectedTemp = null;
        try {
            // lis misses about half of the actual li's. So here's a workaround:
            let ulOccasional = lis[0].parentElement;
            idModifiedRow = ulOccasional.parentElement
                                        .parentElement
                                        .parentElement
                                        .parentElement
                                        .parentElement
                                        .parentElement
                                        .parentElement
                                        .parentElement.id;
            let lisAll = ulOccasional.children;
            // Dict of counters:
            let counters = {};
            if (lisAll.length>0) { //if (lisAll.length>0) {observr.disconnect();}
                lisAllasArray = [...lisAll];
                // Keep track of which li elmt is selected:
                lisAllasArray.forEach(l => {
                    try {
                        if (l.ariaSelected) {
                            selectedTemp=l.children.item(1).innerHTML;
                        } //=counters[boxLabel]};
                    } catch (exception_var) {};
                });
                if (lisAll[0].childNodes.length==1) {  // if li element has 1 child
                // Write ocurrence numbers next to box labels:
                    lisAllasArray.forEach(l => {
                        let boxLabel = l.children.item(0).ariaLabel;
                        if (!(boxLabel in counters)) {
                            counters[boxLabel] = 0;
                        }
                        counters[boxLabel]++;
                        let textnode = document.createElement('span');
                        textnode.innerHTML = " - occur. "+counters[boxLabel];
                        textnode.style.color = "GREY";
                        textnode.style.fontStyle = "italic";
                        l.appendChild(textnode);
                    });
                }
                //console.log(selected);
                selectedAbsolute = selectedTemp; // PERFECT spot to update "selectedAbsolute"
            }  // else { amAllowed = true; }
        }
        catch (exception_var) {}  // when there are no li's
        // Now, to print stuff in the ("permanent") ul element:
        try {
            // Go down to the children of children...
            let ulPerm = document.getElementById(idModifiedRow).children.item(0)
                                                                .children.item(1)
                                                                .children.item(1)
                                                                .children.item(1)
                                                                .children.item(0)
                                                                .children.item(0);
            
            let uriOfContainer = ulPerm.children.item(0).id.split("_").at(-1);
            let textnode2 = document.createElement('span');
            textnode2.innerHTML = selectedAbsolute+" (uri: "+uriOfContainer+")";
            textnode2.style.color = "GREY";
            textnode2.style.fontStyle = "italic";
            if (ulPerm.children.item(0).children.item(2).childNodes.length==2) {
                ulPerm.children.item(0).children.item(2).appendChild(textnode2);
            }
        }
        catch (exception_var) {}
    }, 0);
}

// callback executed when canvas was found
const handleSectionElmt = (elmtID) => {
    if (elmtID=='#archival_object_instances_') {
        observer2.observe(document, {
            attributes: true,
            childList: true,
            subtree: true
        });
    } else if (elmtID=='#resource_instances_') {
        observer3.observe(document, {
            attributes: true,
            childList: true,
            subtree: true
        });
    }
}

// set up the mutation observer
var observer1 = new MutationObserver(function (mutations, me) {
    // `mutations` is an array of mutations that occurred
    // `me` is the MutationObserver instance
    var instancesSection = document.querySelector('#archival_object_instances_'); //document.getElementById('archival_object_instances_');
    var instancesSection2 = document.querySelector('#resource_instances_');  // covers the case of a Record Group
    if (instancesSection) {
        handleSectionElmt('#archival_object_instances_');
        me.disconnect(); // stop observing
        return;
    } else if (instancesSection2) {
        handleSectionElmt('#resource_instances_');
        me.disconnect(); // stop observing
        return;
    }
});

const observer2 = new MutationObserver(function (mutations, me) {
    try {
        const lis = document.getElementById('archival_object_instances_').getElementsByClassName('token-input-dropdown-item');
        if (lis) {
            handleLiElements(lis, mutations, me);
            return;
        }
    } catch (e) {
        me.disconnect();
        observer1.observe(document, {
            childList: true,
            subtree: true
        });
    }
});

const observer3 = new MutationObserver(function (mutations, me) {
    try {
        const lis = document.getElementById('resource_instances_').getElementsByClassName('token-input-dropdown-item');
        if (lis) {
            handleLiElements(lis, mutations, me);
            return;
        }
    } catch (e) {
        me.disconnect();
        observer1.observe(document, {
            childList: true,
            subtree: true
        });
    }
});

// start observing
observer1.observe(document, {
    childList: true,
    subtree: true
});
