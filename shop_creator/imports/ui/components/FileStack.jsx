import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import filestack from 'filestack-js/build/browser/filestack.min.js';
import PropTypes from 'prop-types';
class FileStack extends Component {
    static defaultProps = {
        action: 'pick',
        componentDisplayMode: {
            type: 'button',
            customText: 'Pick file',
            customClass: 'ui button',
        },
        actionOptions: {},
        onSuccess: result => console.log(result),
        onError: error => console.error(error),
        clientOptions: {},
        file: null,
        source: null,
        customRender: null,
    };

    static propTypes = {
        action: PropTypes.oneOf(['transform', 'retrieve', 'metadata', 'storeUrl', 'upload', 'remove', 'pick', 'removeMetadata', 'preview', 'logout']),
        componentDisplayMode: PropTypes.shape({
            type: PropTypes.oneOf(['immediate', 'button', 'link']),
            customText: PropTypes.string,
            customClass: PropTypes.string,
        }),
        actionOptions: PropTypes.objectOf(PropTypes.any),
        onSuccess: PropTypes.func,
        onError: PropTypes.func,
        clientOptions: PropTypes.shape({
            cname: PropTypes.string,
            security: PropTypes.objectOf(PropTypes.any),
            sessionCache: PropTypes.bool,
        }),
        file: PropTypes.objectOf(PropTypes.any),
        source: PropTypes.string,
        customRender: PropTypes.func,
    };

    constructor(props) {
        super(props);
        const {
            clientOptions,
            actionOptions,
            action,
            } = this.props;
        const client = filestack.init(Meteor.settings.public.fileStackAPIKey, clientOptions);
        this.state = {
            client,
            picker: action === 'pick' ? client.picker({ ...actionOptions, onUploadDone: this.onFinished }) : null,
        };

        this.onFinished = this.onFinished.bind(this);
        this.onFail = this.onFail.bind(this);
    }

    componentWillMount () {
        const {
            componentDisplayMode,
            customRender,
            } = this.props;
        if (componentDisplayMode.type === 'immediate' && !customRender) {
            this.completeAction()
                .then(this.onFinished)
                .catch(this.onFail);
        }
    }

    componentDidMount () {
        console.log("FileStack component mounted.");
    }

    componentWillUnmount() {
        const {
            action,
            } = this.props;
        const {
            picker,
            } = this.state;
        if (action === 'pick') {
            picker.close();
        }
    }

    /**
     * Initial function called when component button or link clicked
     * @param {object} event - A click event object
     */
    onClickPick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.completeAction()
            .then(this.onFinished)
            .catch(this.onFail);
    };

    /**
     * Function which will be executed after succesful completed action
     * @param {object} result - A promise result object
     */
    onFinished = (result) => {
        const { onSuccess } = this.props;
        if (typeof onSuccess === 'function' && result) {
            onSuccess(result);
        }
    };

    /**
     * Function which will be executed while some error occurs during the action
     * @param {object} error - A Promise error object
     */
    onFail = (error) => {
        const { onError } = this.props;
        if (typeof onError === 'function') {
            onError(error);
        } else {
            console.error(error);
        }
    };

    /**
     * Complete executing of provided action
     */
    completeAction = () => {
        const {
            client,
            picker,
            } = this.state;
        const {
            actionOptions,
            action,
            clientOptions: { security },
            file,
            source,
            } = this.props;

        switch (action) {
            case 'transform': return new Promise((resolve, reject) => {
                try {
                    resolve(client.transform(source, actionOptions));
                } catch (err) {
                    reject(err);
                }
            });
            case 'retrieve': return client.retrieve(source, actionOptions, security);
            case 'metadata': return client.metadata(source, actionOptions, security);
            case 'storeUrl': return client.storeURL(source, actionOptions, security);
            case 'upload': return client.upload(file, actionOptions);
            case 'remove': return client.remove(source, security);
            case 'removeMetadata': return client.removeMetadata(source, security);
            case 'preview': return client.preview(source, actionOptions);
            case 'logout': return client.logout(actionOptions);
            default: return picker.open();
        }
    };

    render () {
        const {
            customRender: CustomRender, componentDisplayMode: { type, customText, customClass },
            } = this.props;
        if (CustomRender) {
            return (
                <CustomRender onPick={this.onClickPick} />
            );
        } else if (type === 'immediate') {
            return (null);
        } else {
            const tagMap = {
                button: 'button',
                link: 'a',
            };
            const Tag = tagMap[type];

            return (
                <Tag
                    name="filestack"
                    ref="test"
                    onClick={this.onClickPick}
                    className={customClass}
                >
                    {customText}
                </Tag>
            );
        }
    }
}

export default FileStack;