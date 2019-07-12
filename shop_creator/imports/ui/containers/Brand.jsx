import React, { Component } from 'react';
import FileStack from '/imports/ui/components/FileStack.jsx'
import { SketchPicker } from 'react-color';
import FontPicker from "font-picker-react";
import Interactable from '/imports/ui/components/ReactInteract.jsx'
import interact from 'interactjs/dist/interact.min.js'


function dragMoveListener (event) {
    console.log('*****************')
    var element = event.target;
    // DRAG //
    if (element.dataset.mode == 'drag') {
        console.log('EVENT: move/drag')
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(element.dataset.x) || 0) + event.dx / 2;
        var y = (parseFloat(element.dataset.y) || 0) + event.dy / 2;

        // translate the element
        element.style.webkitTransform =
            element.style.transform =
                'translate(' + x + 'px, ' + y + 'px) rotate(' + parseFloat(element.dataset.angle) + 'rad)';

        // update the position attributes
        element.dataset.x = x;
        element.dataset.y = y;
    }
    // ROTATE //
    if (element.dataset.mode == 'rotate') {
        console.log('EVENT: move/rotate')
        var center = {
            x: parseFloat(element.dataset.centerX) || 0,
            y: parseFloat(element.dataset.centerY) || 0,
        };
        var angle = parseFloat(element.dataset.angle) - (parseFloat(element.dataset.startDragAngle) - getDragAngle(event));
        console.log("ANGLE TRANSFORM: " + angle);
        // update transform style on dragmove
        element.style.webkitTransform =
            element.style.transform =
                'translate(' + parseFloat(element.dataset.x) + 'px, ' + parseFloat(element.dataset.y) + 'px) rotate(' + angle + 'rad)';
    }
    setTrackingLayer(event);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;


const draggableOptions = {
    onstart: function (event) {
        setCursor(event);
        console.log('EVENT: start drag')
        const element = event.target;
        console.log("IN onstart()...");
        // default mode is drag
        if (!element.dataset.mode) {
            element.dataset.mode = 'drag';
            console.log("SET DEFAULT MODE: " + element.dataset.mode);
        }
        else {
            console.log("MODE IS: " + element.dataset.mode);
        }
        // default angle is zero
        if (!element.dataset.angle) {
            element.dataset.angle = 0;
            console.log("SET DEFAULT ANGLE: " + element.dataset.angle);
        }
        else {
            console.log("ANGLE DATA: " + element.dataset.angle);
        }
        const rect = element.getBoundingClientRect();

        // store the center as the element has css `transform-origin: center center`
        element.dataset.centerX = rect.left + rect.width / 2;
        element.dataset.centerY = rect.top + rect.height / 2;
        if (element.dataset.mode === 'rotate') {
            // get the angle of the element when the drag starts
            element.dataset.startDragAngle = getDragAngle(event);
            console.log("START DRAG ANGLE: " + element.dataset.startDragAngle);
        }
    },
    onend: function (event) {
        console.log('EVENT: end drag')
        const element = event.target;
        console.log("IN onend()...");
        if (element.dataset.mode === 'drag') {
            console.log('ANGLE on END: ' + element.dataset.angle + ' (unchanged)');
            // flip drag/rotate toggle
            element.dataset.mode = 'rotate';
        }
        else {
            // save the angle on end
            element.dataset.endDragAngle = getDragAngle(event);
            console.log('END DRAG ANGLE: ' + element.dataset.endDragAngle);
            var da = (element.dataset.startDragAngle - element.dataset.endDragAngle)
            console.log('DELTA DRAG ANGLE: ' + da);
            element.dataset.angle = parseFloat(element.dataset.angle) - da;
            console.log('ANGLE on END: ' + element.dataset.angle + ' (changed)');
            // flip drag/rotate toggle
            element.dataset.mode = 'drag';
        }
        console.log('MODE on END: ' + element.dataset.mode);
    },
    onmove: window.dragMoveListener,
    inertia: false
}

function getDragAngle(event) {
    var element = event.target;
    var startAngle = parseFloat(element.dataset.angle) || 0;
    var center = {
        x: parseFloat(element.dataset.centerX) || 0,
        y: parseFloat(element.dataset.centerY) || 0,
    };
    var angle = Math.atan2(center.y - event.clientY,
        center.x - event.clientX);

    return angle - startAngle;
}

// Currently unused...because it doesn't work
function setCursor(event) {
    const element = event.target;
    if (element.dataset.mode === 'drag') {
        element.style.cursor = 'move';
    }
    else {
        element.style.cursor = 'alias';
    }
    console.log("CURSOR STYLE: " + element.style.cursor)
}

function setTrackingLayer(event) {
    const element = event.target;
    var trackingLayer = document.getElementById('brandTrackingLayer')
    trackingLayer.style.cssText = document.defaultView.getComputedStyle(element, "").cssText;
    trackingLayer.style.zIndex = 16;
    trackingLayer.style.border = '2px dotted black';
    trackingLayer.style.pointerEvents = 'none';
}

const resizableOptions = {
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },
    inertia: false,
    margin: 5,
    onstart: function (event) {
        console.log('EVENT: start resize')
        console.log(event.rect)
        console.log(event.target);
        var element = event.target;
        element.style.webkitTransform =
            element.style.transform =
                'translate(' + parseFloat(element.dataset.x) + 'px, ' + parseFloat(element.dataset.y) + 'px) rotate(' + element.dataset.angle + 'rad)';
        console.log('ELEMENT STYLE WIDTH: ' + element.style.width)
        console.log('EVENT RECT WIDTH: ' + event.rect.width)
        console.log('TRANSFORM: ' + element.style.transform)
    },
    onmove: function (event) {
        console.log('*****************')
        console.log('EVENT: resizemove')
        function cos(a) {
            return Math.cos(a);
        }
        function sin(a) {
            return Math.sin(a);
        }
        var element = event.target,
            x = (parseFloat(element.dataset.x) || 0),
            y = (parseFloat(element.dataset.y) || 0),
            bx = event.rect.width,
            by = event.rect.height,
            angle = (parseFloat(element.dataset.angle) || 0),
            t = Math.abs(angle);
        // consider switching bx and by based on what quadrant we're in
        // update the element's style
        element.style.width = (1/(Math.pow(cos(t),2)-Math.pow(sin(t),2))) * (bx * cos(t) - by * sin(t)) + 'px'
        element.style.height = (1/(Math.pow(cos(t),2)-Math.pow(sin(t),2))) * (by * cos(t) - bx * sin(t)) + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;
        element.style.fontSize = (parseFloat(element.style.width) / 4) + 'px';
        console.log('ELEMENT STYLE WIDTH: ' + element.style.width)
        console.log('EVENT RECT WIDTH: ' + event.rect.width)
        console.log('TRANSFORM: ' + element.style.transform)
        element.dataset.x = x;
        element.dataset.y = y;
        element.style.webkitTransform =
            element.style.transform =
                'translate(' + x + 'px, ' + y + 'px) rotate(' + angle + 'rad)';
        setTrackingLayer(event);
    }
}

/* <img className="brand template" src="images/brand/template/PrimerTube.png" /> */
export default class Brand extends Component {
    // Brand Name Color Picker
    state = {
        activeFontFamily: "Open Sans",
        brandNameColor: "#ffa545",
        brandNameColorPicker: {
            toggleState: false,
            display: 'none'
        },
        brandNameFontPicker: {
            apiKey: Meteor.settings.public.googleWebFontsAPIKey
        }
    };

    constructor(props) {
        super(props);
        const brandObj = this
        Meteor.call('getGoogleWebFontsAPIKey', (err, apiKey) => {
            brandObj.setState({
                brandNameFontPicker: {
                    apiKey: apiKey
                }
            })
        });
    }

    handleChangeComplete = (color) => {
        this.setState({ brandNameColor: color.hex });
        console.log(this);
    };

    toggleColorPickerDisplay = () => {
        if (!this.state.brandNameColorPicker.toggleState) {
            this.setState({
                brandNameColorPicker: {
                    toggleState: true,
                    display: 'block'
                }
            })
        }
        else {
            this.setState({
                brandNameColorPicker: {
                    toggleState: false,
                    display: 'none'
                }
            })
        }
    }

    propagateText = (source, destination) => {
        var dest = destination;
        source.onkeyup = () => {
            dest.innerHTML = source.value;
        }
    }

    componentDidMount() {
        this.propagateText(document.getElementById("brandName"), document.getElementById("brandNameOverlay"));
    }
    render() {
        return (
            <div>
                <div id="brand">
                    <img id="brandTemplate" className="template" src="images/brand/template/LipstickStock.png" />
                    <Interactable
                        draggable draggableOptions={draggableOptions}
                        resizable resizableOptions={resizableOptions}>
                        <img id="patternOverlay" className="overlay activeLayer" onMouseOver={setTrackingLayer}/>
                    </Interactable>
                    <Interactable
                        draggable draggableOptions={draggableOptions}
                        resizable resizableOptions={resizableOptions}>
                        <img id="logoOverlay" className="overlay activeLayer" onMouseOver={setTrackingLayer}/>
                    </Interactable>
                    <Interactable
                        draggable draggableOptions={draggableOptions}
                        resizable resizableOptions={resizableOptions}>
                        <div id="brandNameOverlay" className="apply-font activeLayer"
                             data-angle="1.573"
                             onMouseOver={setTrackingLayer}
                             style={{
                             color: this.state.brandNameColor,
                             touchAction: 'none'}}>SAYBLE
                        </div>
                    </Interactable>
                    <div id="brandTrackingLayer" className="overlay"></div>
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
                <div className="field">
                    <div className="ui form input">
                        <div id="fontPickerWrapper">
                            <FontPicker
                                apiKey={this.state.brandNameFontPicker.apiKey}
                                variants={['regular', 'italic', '700', '700italic']}
                                sort="popularity"
                                limit={100}
                                activeFontFamily={this.state.activeFontFamily}
                                onChange={nextFont =>
                                    this.setState({
                                        activeFontFamily: nextFont.family,
                                    })
                                }
                            />
                        </div>
                        <input type="button" id="brandNameColorSwatch" onClick={ this.toggleColorPickerDisplay } style={{backgroundColor: this.state.brandNameColor}} />
                        <input id="brandName" placeholder="My Brand"/>
                    </div>
                    <div id="brandNameColorPicker" style={{display: this.state.brandNameColorPicker.display}}>
                        <SketchPicker color={ this.state.brandNameColor } onChange={ this.handleChangeComplete } />
                    </div>
                </div>
            </div>
        );
    }
}
