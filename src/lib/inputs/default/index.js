import BaseInput from './../base_input';
import {RenderLabel, RenderInput, RenderFormGroup, RenderFormFeedback,
    RenderFormText, RenderLabelCheckbox, RenderFormGroupCheckbox} from "./views";
import PropTypes from "prop-types";
import TYPES from './types';

export default class InputDefault extends BaseInput
{
    static propTypes = Object.assign(
        {
            rows: PropTypes.number,
            multiple: PropTypes.bool,
            type: PropTypes.string.isRequired,
            passwordMask: PropTypes.func,
            tableChecked: PropTypes.node,
            tableUnchecked: PropTypes.node
        },
        // eslint-disable-next-line
        BaseInput.propTypes
    );

    static defaultProps = Object.assign(
        {
            type: "text",
            passwordMask: (value) => "●".repeat(value.length),
            tableChecked: "Yes",
            tableUnchecked: "No"
        },
        BaseInput.defaultProps
    );

    componentDidMount()
    {
        this.constructor.checkType(this.props.type);
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.type !== prevProps.type)
        {
            this.constructor.checkType(this.props.type);
        }
    }

    static checkType(type)
    {
        if (TYPES[type] !== null)
        {
            console.error(`Unsupported input type "${type}"`)
        }
    }

    static renderLabel(props)
    {
        return !props.hideLabel && (props.type === "checkbox" ? RenderLabelCheckbox(props) : RenderLabel(props));
    }

    static renderInput(props)
    {
        return RenderInput(props);
    }

    static renderFormGroup(props)
    {
        if (props.type === "checkbox")
        {
            const localProps = Object.assign({}, props, { value: props.field, checked: props.value });
            return RenderFormGroupCheckbox(localProps);
        }
        else if (props.type === "radio")
        {
            const localProps = Object.assign({}, props, {
                value: props.radioValue,
                checked: props.value.toString() === props.radioValue.toString()
            });
            return RenderFormGroupCheckbox(localProps);
        }
        return RenderFormGroup(props);
    }

    static renderFormFeedback(props)
    {
        return !!props.formFeedback && RenderFormFeedback(props);
    }

    static renderFormText(props)
    {
        return !!props.formText && RenderFormText(props);
    }

    static getInitialValue(props)
    {
        switch (props.type)
        {
            case "checkbox":
            case "radio":
                return false;
            case "select":
                return props.multiple ? [] : 0;
            default:
                return "";
        }
    }

    static getRenderValue(props)
    {
        switch (props.type)
        {
            case "checkbox":
                return props.value ? props.tableChecked : props.tableUnchecked;
            case "radio":
                //TODO
                return super.getRenderValue(props);
            case "select":
                if (props.state)
                {
                    return Array.isArray(props.state) ?
                        props.state.reduce((prev, curr) => [prev, ', ', curr]) :
                        props.state;
                }
                break;
            case "password":
                return props.passwordMask(props.value);
        }
        return super.getRenderValue(props);
    }

    static getValue(e, extraData, props)
    {
        const values = [];
        const states = [];
        switch (props.type)
        {
            case "checkbox":
                return { value: e.target.checked };
            case "radio":
                return { value: e.currentTarget.value };
            case "select":
                if (!props.multiple)
                {
                    const option = e.target.options[e.target.options.selectedIndex];
                    const result = { value: e.target.value };
                    if (option) result.state = option.label;
                    return result;
                }
                Object.keys(e.target.options).forEach(key => {
                    const option = e.target.options[key];
                    if (option.selected)
                    {
                        values.push(option.value);
                        states.push(option.label);
                    }
                });
                return { value: values, state: states };
            default:
                return super.getValue(e, extraData, props);
        }
    }
}