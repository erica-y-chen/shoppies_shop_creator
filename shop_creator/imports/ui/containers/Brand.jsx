import React, { Component } from 'react';
import FileStack from '/imports/ui/components/FileStack.jsx'
import { SketchPicker } from 'react-color';
import FontPicker from "font-picker-react";
import interact from 'interactjs/dist/interact.min.js'

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

    // Make the DIV element draggable:

    dragElement = (elmnt) => {
        interact(elmnt).draggable({
            onmove(event) {
                console.log(event.pageX,
                    event.pageY)
            }
        })
    }

    oldDragElement = (elmnt) => {
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

    propagateText = (source, destination) => {
        var dest = destination;
        source.onkeyup = () => {
            dest.innerHTML = source.value;
        }
    }

    componentDidMount() {
        this.dragElement(document.getElementById("patternOverlay"));
        this.dragElement(document.getElementById("logoOverlay"));
        this.dragElement(document.getElementById("brandNameOverlay"));
        this.propagateText(document.getElementById("brandName"), document.getElementById("brandNameOverlay"));
    }

    render() {
        return (
            <div>
                <div id="brand">
                    <img id="brandTemplate" className="template" src="images/brand/template/LipstickStock.png" />
                    <img id="patternOverlay" className="overlay" />
                    <img id="logoOverlay" className="overlay" />
                    <img id="brandMask" className="mask" src="images/brand/mask/LipstickMask.png" />
                    <div id="brandNameOverlay" className="apply-font" style={{color: this.state.brandNameColor}}>SAYBLE</div>
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
