import React, { Component } from 'react';
import FileStack from '/imports/ui/components/FileStack.jsx'
import { SketchPicker } from 'react-color';
import FontPicker from "font-picker-react";
import Interactable from '/imports/ui/components/ReactInteract.jsx'
import interact from 'interactjs/dist/interact.min.js'

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
    onmove: function (event) {
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
    },
    inertia: false
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
        // Ensure we have explicit dimensions before resize
        element.style.width = document.defaultView.getComputedStyle(element).getPropertyValue("width");
        element.style.height = document.defaultView.getComputedStyle(element).getPropertyValue("height");
        // Save initial element and bounding rect dimensions for scale factor
        element.dataset.initialWidth = element.style.width;
        element.dataset.initialHeight = element.style.height;
        const rect = element.getBoundingClientRect();
        element.dataset.initialBoundingRectWidth = rect.width;
        element.dataset.initialBoundingRectHeight = rect.height;
        // store the center as the element has css `transform-origin: center center`
        element.dataset.centerX = rect.left + rect.width / 2;
        element.dataset.centerY = rect.top + rect.height / 2;
        // TODO: I'm not sure this is necessary
        element.style.webkitTransform =
            element.style.transform =
                'translate(' + parseFloat(element.dataset.x) + 'px, ' + parseFloat(element.dataset.y) + 'px) rotate(' + element.dataset.angle + 'rad)';
    },
    onmove: function (event) {
        console.log('*****************')
        console.log('EVENT: resizemove')
        var element = event.target,
            x = (parseFloat(element.dataset.x) || 0),
            y = (parseFloat(element.dataset.y) || 0),
            angle = (parseFloat(element.dataset.angle) || 0)
        var initialWidth = parseFloat(element.dataset.initialWidth)
        var initialHeight = parseFloat(element.dataset.initialHeight)
        var initialBRWidth = parseFloat(element.dataset.initialBoundingRectWidth)
        var initialBRHeight = parseFloat(element.dataset.initialBoundingRectHeight)
        var scaleFactor = 1;
        var scaleFactorWidth = event.rect.width / initialBRWidth;
        var scaleFactorHeight = event.rect.height / initialBRHeight;
        // decide which dimension is changing more
        if (Math.abs(1 - scaleFactorWidth) > Math.abs(1 - scaleFactorHeight)) {
            scaleFactor = scaleFactorWidth;
            console.log("CHANGING WIDTH BY: " + scaleFactorWidth);
        }
        else {
            scaleFactor = scaleFactorHeight;
            console.log("CHANGING HEIGHT BY: " + scaleFactorHeight);
        }
        var newWidth = initialWidth * scaleFactor;
        var newHeight = initialHeight * scaleFactor;
        // update the element's style - aspect ratio locked
        element.style.width = newWidth + 'px';
        element.style.height = newHeight + 'px';
        // translate to account for scaling
        x = (initialWidth/2) - (newWidth/2);
        y = (initialHeight/2) - (newHeight/2);
        element.style.fontSize = (parseFloat(element.style.width) / 4) + 'px';
        console.log('ELEMENT WIDTH/HEIGHT: ' + element.style.width + '/' + element.style.height)
        console.log('EVENT WIDTH/HEIGHT: ' + event.rect.width + '/' + event.rect.height)
        console.log('EVENT DELTA RECT:')
        console.log(event.deltaRect)
        console.log('TRANSFORM: ' + element.style.transform)
        element.dataset.x = x;
        element.dataset.y = y;
        element.style.webkitTransform =
            element.style.transform =
                'translate(' + x + 'px, ' + y + 'px) rotate(' + angle + 'rad)';
        setTrackingLayer(event);
    }
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
    setTrackingLayerFor(element)
}

function setTrackingLayerFor(element) {
    var trackingLayer = document.getElementById('brandTrackingLayer')
    // Copy all the generated CSS to the tracking layer
    trackingLayer.style.cssText = document.defaultView.getComputedStyle(element, "").cssText;
    trackingLayer.style.zIndex = 16;
    trackingLayer.style.border = '2px dotted black';
    trackingLayer.style.pointerEvents = 'none';
}

function setActiveLayer(id) {
    var activeLayer = document.getElementById(id);
    // Make all the other layers *not* respond
    // * I need a list of the other layers
    // * For now I can do it manually
    var layers = ["brandNameOverlay", "patternOverlay", "logoOverlay"]
    for (let layerId of layers) {
        document.getElementById(layerId).style.pointerEvents = 'none';
        removeClass(layerId + 'Selector','overlaySelected');
        addClass(layerId + 'SelectorIcon','outline');
    }
    // Make the selected layer respond to pointer events
    activeLayer.style.pointerEvents = 'all';
    // Show visual cues for the selector
    addClass(id + 'Selector','overlaySelected');
    removeClass(id + 'SelectorIcon','outline');
    setTrackingLayerFor(activeLayer);
    Meteor.settings.public.brand.state.activeLayer = activeLayer;
    console.log("ACTIVE LAYER: " + id)
}

function removeClass(id, cssClass) {
    document.getElementById(id).classList.remove(cssClass);
}

function addClass(id, cssClass) {
    document.getElementById(id).classList.add(cssClass);
}

/* <img className="brand template" src="images/brand/template/PrimerTube.png" /> */
export default class Brand extends Component {
    // Brand Name Color Picker
    state = {
        activeLayer: {
            id: ''
        },
        activeFontFamily: "Roboto",
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
        source.onkeyup = () => {
            for (let d of destination) {
                document.getElementById(d).innerHTML = source.value;
            }
        }
    }

    componentDidMount() {
        Meteor.settings.public.brand = this;
        this.propagateText(document.getElementById("brandName"), ["brandNameOverlay"]);
        document.getElementById('brandNameOverlaySelector').onclick = () => {
            setActiveLayer('brandNameOverlay');
        }
        document.getElementById('brandNameOverlaySelector').onmouseover = () => {
            addClass('brandNameOverlaySelector','overlaySelected');
            removeClass('brandNameOverlaySelectorIcon','outline');
        }
        document.getElementById('brandNameOverlaySelector').onmouseout = () => {
            if (!(Meteor.settings.public.brand.state.activeLayer.id === 'brandNameOverlay')) {
                removeClass('brandNameOverlaySelector', 'overlaySelected');
                addClass('brandNameOverlaySelectorIcon', 'outline');
            }
        }
        document.getElementById('patternOverlaySelector').onclick = () => {
            setActiveLayer('patternOverlay');
        }
        document.getElementById('patternOverlaySelector').onmouseover = () => {
            addClass('patternOverlaySelector','overlaySelected');
            removeClass('patternOverlaySelectorIcon','outline');
        }
        document.getElementById('patternOverlaySelector').onmouseout = () => {
            if (!(Meteor.settings.public.brand.state.activeLayer.id === 'patternOverlay')) {
                removeClass('patternOverlaySelector', 'overlaySelected');
                addClass('patternOverlaySelectorIcon', 'outline');
            }
        }
        document.getElementById('logoOverlaySelector').onclick = () => {
            setActiveLayer('logoOverlay');
        }
        document.getElementById('logoOverlaySelector').onmouseover = () => {
            addClass('logoOverlaySelector','overlaySelected');
            removeClass('logoOverlaySelectorIcon','outline');
        }
        document.getElementById('logoOverlaySelector').onmouseout = () => {
            if (!(Meteor.settings.public.brand.state.activeLayer.id === 'logoOverlay')) {
                removeClass('logoOverlaySelector', 'overlaySelected');
                addClass('logoOverlaySelectorIcon', 'outline');
            }
        }
    }
    render() {
        return (
            <div>
                <div id="layers">
                    <ul>
                        <li id="editor">
                            <div id="brand">
                                <img id="brandTemplate" className="template" src="images/brand/template/LipstickStock.png" />
                                <Interactable
                                    draggable draggableOptions={draggableOptions}
                                    resizable resizableOptions={resizableOptions}>
                                    <img id="patternOverlay" className="overlay" onMouseOver={setTrackingLayer}/>
                                </Interactable>
                                <Interactable
                                    draggable draggableOptions={draggableOptions}
                                    resizable resizableOptions={resizableOptions}>
                                    <img id="logoOverlay" className="overlay" onMouseOver={setTrackingLayer}/>
                                </Interactable>
                                <Interactable
                                    draggable draggableOptions={draggableOptions}
                                    resizable resizableOptions={resizableOptions}>
                                    <div id="brandNameOverlay" className="overlay apply-font"
                                         data-angle="1.573"
                                         onMouseOver={setTrackingLayer}
                                         style={{color: this.state.brandNameColor}}>SAYBLE
                                    </div>
                                </Interactable>
                                <div id="brandTrackingLayer" className="overlay"></div>
                                <img id="brandMask" className="mask" src="images/brand/mask/LipstickMask.png" />
                            </div>
                        </li>
                        <li id="brandNameOverlaySelector">
                            <i id="brandNameOverlaySelectorIcon" aria-hidden="true" className="edit outline icon" />
                            <div className="field">
                                <div className="ui form input">
                                    <div id="fontPickerWrapper">
                                        <FontPicker
                                            apiKey={this.state.brandNameFontPicker.apiKey}
                                            variants={['regular', 'italic', '700', '700italic']}
                                            sort="popularity"
                                            limit={100}
                                            activeFontFamily={this.state.activeFontFamily}
                                            onChange={
                                                nextFont =>
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
                        </li>
                        <li id="patternOverlaySelector">
                            <i id="patternOverlaySelectorIcon" aria-hidden="true" className="edit outline icon" />
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
                        </li>
                        <li id="logoOverlaySelector">
                            <i id="logoOverlaySelectorIcon" aria-hidden="true" className="edit outline icon" />
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
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
