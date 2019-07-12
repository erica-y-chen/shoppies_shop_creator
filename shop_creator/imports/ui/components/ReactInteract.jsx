import React, { Component, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'

import interact from 'interactjs/dist/interact.min.js'

export default class Interactable extends Component {

    static defaultProps = {
        draggable: false,
        resizable: false,
        draggableOptions: {},
        resizableOptions: {}
    }

    render() {
        return cloneElement(this.props.children, {
            ref: node => this.node = node,
        })
    }

    componentDidMount() {
        this.interact = interact(findDOMNode(this.node))
        this.setInteractions()
    }
    /* Causes events to be doubly registered, which is problematic */
    /* componentWillReceiveProps() {
        this.interact = interact(findDOMNode(this.node))
        this.setInteractions()
    }*/

    // I removed the conditional here, so we're assuming all layers
    // have all three behaviors: drag, rotate, and resize
    setInteractions() {
        this.interact
            .draggable(this.props.draggableOptions)
            .resizable(this.props.resizableOptions)
    }
}
// Author Credit: https://github.comc/lukehansell