import React, { Component } from 'react';
import FileStack from '/imports/ui/components/FileStack.jsx'

/* <img className="brand template" src="images/brand/template/PrimerTube.png" /> */
export default class Brand extends Component {
    // Make the DIV element draggable:

    dragElement = (elmnt) => {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    componentDidMount() {
        this.dragElement(document.getElementById("patternOverlay"));
        this.dragElement(document.getElementById("logoOverlay"));
    }

    render() {
        return (
            <div>
                <div id="brand">
                    <img id="brandTemplate" className="template" src="images/brand/template/LipstickStock.png" />
                    <img id="patternOverlay" className="overlay" />
                    <img id="logoOverlay" className="overlay" />
                    <img id="brandMask" className="mask" src="images/brand/mask/LipstickMask.png" />
                </div>
                <FileStack
                    apiKeyMethod={'getFileStackAPIKey'}
                    fieldName={'productPattern'}
                    componentDisplayMode={{
                        type: 'button',
                            customText: 'Upload Pattern',
                            customClass: 'ui button'
                    }}
                    onSuccess={(res, fieldName) => {
                      document.getElementById(fieldName + 'Thumbnail').src = res.filesUploaded[0].url;
                      document.getElementById('patternOverlay').src = res.filesUploaded[0].url;
                    }}
                />
                <FileStack
                    apiKeyMethod={'getFileStackAPIKey'}
                    fieldName={'productLogo'}
                    componentDisplayMode={{
                        type: 'button',
                            customText: 'Upload Logo',
                            customClass: 'ui button'
                    }}
                    onSuccess={(res, fieldName) => {
                      document.getElementById(fieldName + 'Thumbnail').src = res.filesUploaded[0].url;
                      document.getElementById('logoOverlay').src = res.filesUploaded[0].url;
                    }}
                />
            </div>
        );
    }
}
