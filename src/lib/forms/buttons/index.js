import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class FormButtons extends Component
{
    static propTypes = {
        buttonsRender: PropTypes.func,
        buttonSaveRender: PropTypes.func,
        buttonClearRender: PropTypes.func,
        buttonCancelRender: PropTypes.func,

        saveButtonText: PropTypes.node,
        cancelButtonText: PropTypes.node,
        clearButtonText: PropTypes.node,
        saveButton: PropTypes.bool,
        cancelButton: PropTypes.bool,
        clearButton: PropTypes.bool,

        api: PropTypes.object
    };

    renderSaveButton = () =>
    {
        return (!this.props.saveButton) ? null : this.props.buttonSaveRender(this.props);
    };

    renderClearButton = () =>
    {
        if (!this.props.clearButton) return null;
        const props = Object.assign(
            {
                onClearClick: (e) => {
                    e.preventDefault();
                    this.props.api.clear();
                }
            },
            this.props
        );
        return this.props.buttonClearRender(props);
    };

    renderCancelButton = () =>
    {
        if (!this.props.cancelButton) return null;
        const props = Object.assign(
            {
                onCancelClick: (e) => {
                    e.preventDefault();
                    this.props.api.cancel();
                }
            },
            this.props
        );
        return this.props.buttonCancelRender(props);
    };

    render = () =>
    {
        const props = Object.assign(
            {
                renderSaveButton: this.renderSaveButton,
                renderClearButton: this.renderClearButton,
                renderCancelButton: this.renderCancelButton
            },
            this.props
        );
        return this.props.buttonsRender(props);
    };
};