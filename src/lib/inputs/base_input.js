import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DEFAULT_INPUT_ID_PREFIX} from '../constants';

export default class BaseInput extends Component
{
    static propTypes = {
        field: PropTypes.string.isRequired,
        title: PropTypes.node,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.any,
        state: PropTypes.any,
        onValueChange: PropTypes.func,
        valid: PropTypes.bool,
        invalid: PropTypes.bool,
        labelProps: PropTypes.object,
        inputProps: PropTypes.object,
        formGroupProps: PropTypes.object,
        idPrefix: PropTypes.string,
        formText: PropTypes.any,
        formFeedback: PropTypes.any,
        hidden: PropTypes.oneOfType([ PropTypes.bool, PropTypes.func ]),
        defaultValue: PropTypes.any,
        defaultState: PropTypes.any,
        convert: PropTypes.func,
        convertBack: PropTypes.func,
        formatter: PropTypes.func,
        required: PropTypes.bool,
        inputOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        max: PropTypes.number,
        min: PropTypes.number,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        pattern: PropTypes.string,
        size: PropTypes.number,
        step: PropTypes.number,
        plaintext: PropTypes.bool,
        localize: PropTypes.bool,
        languageKey: PropTypes.string,
        languageName: PropTypes.string,
        inputFormApi: PropTypes.object,
        hideLabel: PropTypes.bool,
        radioValue: PropTypes.any
    };

    static defaultProps = {
        idPrefix: DEFAULT_INPUT_ID_PREFIX,
    };

    static getDefaultOrInitialValue(props)
    {
        return props.defaultValue !== undefined ? props.defaultValue : this.getInitialValue(props);
    }

    static getDefaultOrInitialState(props)
    {
        return props.defaultState !== undefined ? props.defaultState : this.getInitialState(props);
    }

    static getInitialValue(props)
    {
        console.error("Method getInitialValue should be overwritten in BaseInput inheritor");
    }

    static getInitialState(props)
    {
        return undefined;
    }

    static renderLabel(props)
    {
        console.error(`Method renderLabel should be overwritten in BaseInput inheritor for input "${props.name}"`);
    };

    static renderInput(props)
    {
        console.error(`Method renderInput should be overwritten in BaseInput inheritor for input "${props.name}"`);
    };

    static renderFormGroup(props)
    {
        console.error(`Method renderFormGroup should be overwritten in BaseInput inheritor for input "${props.name}"`);
    };

    static renderFormFeedback(props)
    {
        console.error(`Method renderFormFeedback should be overwritten in BaseInput inheritor for input "${props.name}"`);
    };

    static renderFormText(props)
    {
        console.error(`Method renderFormText should be overwritten in BaseInput inheritor for input "${props.name}"`);
    };

    static getRenderValue(props)
    {
        if (props.formatter) return props.formatter(props.value, props.values, props);
        return props.value;
    };

    static getValue(e, extraData, props)
    {
        return { value: e.target.value };
    }

    static handleChange(e, extraData, props)
    {
        props.onValueChange(this.getValue(e, extraData, props), props);
    };

    static getProps(props)
    {
        return Object.assign({}, props,
            {
                id: props.idPrefix + props.field + props.radioValue,
                name: props.name ? props.name : props.field,
                onChange: (e, extraData) => this.handleChange(e, extraData, props)
            });
    }

    render()
    {
        const props = this.constructor.getProps(this.props);
        return props.inputOnly ? this.constructor.renderInput(props) : this.constructor.renderFormGroup(props);
    }
}