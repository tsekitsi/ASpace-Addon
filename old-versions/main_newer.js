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

let amAllowed = true;

const printHello = () => {
    console.log("Hello World!");
}

const handleLiElements = (lis, observr) => {
    // https://stackoverflow.com/a/56511770:
    setTimeout(() => {
        try {
            let ul = [...lis][0].parentElement;
            let lisAll = [...ul.children];
            // Dict of counters:
            counters = {};
            if (lisAll.length>0) { //if (lisAll.length>0) {observr.disconnect();}
                if (amAllowed) {
                    lisAll.forEach(l => {
                        boxLabel = l.children.item(0).ariaLabel;
                        if (!(boxLabel in counters)) {
                            counters[boxLabel] = 0;
                        }
                        counters[boxLabel]++;
                        let textnode = document.createTextNode(" -- ocur. "+counters[boxLabel]);  // Create a text node
                        l.appendChild(textnode);
                        l.addEventListener("focus", printHello);
                    });
                    amAllowed = false;
                }
            } else {
                amAllowed = true;
            }
        }
        catch (exception_var) {
            amAllowed = true;
        }
        
    }, 0);
    /**
    // https://stackoverflow.com/a/56511770:
    setTimeout(() => {
        [...lis].forEach(e => { // li => {
            /////console.log(e);
            //console.log(e.getElementsByTagName("ul"));
            ///console.log(li.children.item(0).ariaLabel);
            
            setTimeout(() => {
                let ulElmt = e.getElementsByTagName("ul").item(0).children;
                let ul = e.getElementsByTagName("ul").item(0);
                ul.onclick = function(event) {
                    console.log("YAY!");
                };
                // Dict of counters:
                counters = {};
                // First pass thru li items:
                let lis = [...ulElmt];
                lis.forEach(l => {
                    boxLabel = l.children.item(0).ariaLabel;
                    if (!(boxLabel in counters)) {
                        counters[boxLabel] = 0;
                    }
                    counters[boxLabel]++;
                    let textnode = document.createTextNode(counters[boxLabel]);  // Create a text node
                    l.appendChild(textnode);
                    //l.children.item(0).ariaLabel += " " + counters[boxLabel];
                    //l.style.color = 'GREEN';
                    //l.children.item(0).addEventListener("click", printHello);
                    //console.log(l.children.item(0).ariaLabel);
                });
                console.log(counters);
            }, 0);
            
        });
    }, 0);
    */
}

// callback executed when canvas was found
const handleSectionElmt = (elmt) => {
    observer2.observe(document, {
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
        ///console.log('id\'d elmt mutated!');
        me.disconnect(); // stop observing
        return;
    }
});

const observer2 = new MutationObserver(function (mutations, me) {
    const lis = document.querySelector('#archival_object_instances_').getElementsByClassName('token-input-dropdown-item');
    if (lis) {
        handleLiElements(lis, me);
        //handleLiElements(document.querySelector('#archival_object_instances_').getElementsByClassName('token-input-dropdown'));
        ///console.log('class elmt mutated!');
        //me.disconnect();
        return;
    }
});

// start observing
observer1.observe(document, {
    childList: true,
    subtree: true
});