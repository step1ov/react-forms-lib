import React, {Component} from "react";
import PropTypes from 'prop-types';
import BaseInput from "../inputs/base_input";
import CloneData from '../utils/clone_data';
import isHidden from '../utils/is_hidden';
import FormButtons from './buttons';
import FormLanguageSelect from './language';
import {DEFAULT_INPUT_ID_PREFIX} from "../constants";
import {RenderLanguageSelect, RenderLanguageSelectFromGroup,
    RenderForm, RenderCard, RenderModal, RenderTableRow, RenderTable,
    RenderButtons, RenderSaveButton, RenderClearButton, RenderCancelButton, RenderAlert} from './views';
import GetAlerts from "./../utils/get_alerts";

export default class InputForm extends Component
{
    static propTypes = {
        data: PropTypes.object,
        onChange: PropTypes.func,
        onCancel: PropTypes.func,
        onSave: PropTypes.func,
        onValidationFail: PropTypes.func,
        languages: PropTypes.object,
        languagesBottom: PropTypes.bool,
        hideLanguagesTitle: PropTypes.bool,
        card: PropTypes.bool,
        modal: PropTypes.bool,
        table: PropTypes.bool,
        readOnly: PropTypes.bool,
        isOpen: PropTypes.bool,
        title: PropTypes.node,
        transactionsKey: PropTypes.string,

        languageSelectRender: PropTypes.func,
        languageSelectFromGroupRender: PropTypes.func,
        formRender: PropTypes.func,
        cardRender: PropTypes.func,
        modalRender: PropTypes.func,
        tableRowRender: PropTypes.func,
        tableRender: PropTypes.func,
        buttonsRender: PropTypes.func,
        buttonSaveRender: PropTypes.func,
        buttonClearRender: PropTypes.func,
        buttonCancelRender: PropTypes.func,
        alertRender: PropTypes.func,

        languagesTitleText: PropTypes.node,
        defaultLanguageText: PropTypes.node,
        addLanguageText: PropTypes.node,

        saveButtonText: PropTypes.node,
        cancelButtonText: PropTypes.node,
        clearButtonText: PropTypes.node,
        saveButton: PropTypes.bool,
        cancelButton: PropTypes.bool,
        clearButton: PropTypes.bool,
        idPrefix: PropTypes.string,

        formProps: PropTypes.object,
        cardProps: PropTypes.object,
        modalProps: PropTypes.object,
        tableProps: PropTypes.object,

        extraButtons: PropTypes.node,
        alerts: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.node,
            PropTypes.array
        ]),

        inline: PropTypes.bool,
        modalSize: PropTypes.string
    };

    static defaultProps = {
        languagesTitleText: "Translations",
        transactionsKey: "translations",
        saveButtonText: "Save",
        cancelButtonText: "Cancel",
        clearButtonText: "Clear",
        saveButton: true,
        cancelButton: false,
        languageSelectRender: RenderLanguageSelect,
        languageSelectFromGroupRender: RenderLanguageSelectFromGroup,
        formRender: RenderForm,
        cardRender: RenderCard,
        modalRender: RenderModal,
        tableRowRender: RenderTableRow,
        tableRender: RenderTable,
        buttonsRender: RenderButtons,
        buttonSaveRender: RenderSaveButton,
        buttonClearRender: RenderClearButton,
        buttonCancelRender: RenderCancelButton,
        alertRender: RenderAlert,
        idPrefix: DEFAULT_INPUT_ID_PREFIX
    };

    getApi = () =>
    {
        return {
            save: this.handleSave,
            cancel: this.handleCancel,
            validate: this.handleValidate,
            clear: this.handleClear,
            language: {
                change: this.handleLanguageChange,
                add: this.handleLanguageAdd,
                remove: this.handleLanguageRemove
            }
        };
    };

    getValue = (data, elem) =>
    {
        if (data.values)
        {
            if (elem.props.localize && data.selectedLanguage)
            {
                const translations = data.values[this.props.transactionsKey];
                if (translations)
                {
                    const translation = translations[data.selectedLanguage];
                    if (translation)
                    {
                        const value = translation[elem.props.field];
                        if (value !== undefined) return value;
                    }
                }
            }
            else
            {
                const value = data.values[elem.props.field];
                if (value !== undefined && value !== null) return value;
            }
        }
        return elem.type.getDefaultOrInitialValue(elem.props);
    };

    getState = (data, elem) =>
    {
        if (data.states)
        {
            if (elem.props.localize && data.selectedLanguage)
            {
                const translations = data.states[this.props.transactionsKey];
                if (translations)
                {
                    const translation = translations[data.selectedLanguage];
                    if (translation)
                    {
                        const value = translation[elem.props.field];
                        if (value !== undefined) return value;
                    }
                }
            }
            else
            {
                const value = data.states[elem.props.field];
                if (value !== undefined) return value;
            }
        }
        return elem.type.getDefaultOrInitialState(elem.props);
    };

    renderChildren = (children, data) =>
    {
        const showTable = this.props.table && !this.props.isOpen;
        return React.Children.map(children, elem => {
            if (!React.isValidElement(elem))
            {
                return elem;
            }

            const props = Object.assign({}, elem.props);

            if (!BaseInput.isPrototypeOf(elem.type))
            {
                return showTable ?
                    this.renderChildren(elem.props.children, data) :
                    React.cloneElement(elem, props, this.renderChildren(elem.props.children, data));
            }

            props.inputFormApi = this.state.api;
            props.values = data.values;
            const value = this.getValue(data, elem);
            const state = this.getState(data, elem);

            props.value = props.convertBack ? props.convertBack(value) : value;

            props.state = state;
            props.onValueChange = this.handleInputValueChange;

            if (!isHidden(value, props))
            {
                if (props.localize)
                {
                    props.languageKey = data.selectedLanguage;
                    if (data.selectedLanguage)
                    {
                        props.languageName = this.props.languages[data.selectedLanguage];
                    }
                }

                if (data.validation && data.validation[props.field] !== undefined)
                {
                    const validation = data.validation[props.field];
                    if (validation.valid === true)
                    {
                        props.valid = true;
                        delete props.invalid;
                    }
                    else if (validation.valid === false)
                    {
                        props.invalid = true;
                        delete props.valid;
                    }
                    if (validation.message !== undefined)
                    {
                        props.formFeedback = validation.message;
                    }
                }

                if (props.idPrefix === DEFAULT_INPUT_ID_PREFIX && this.props.idPrefix !== DEFAULT_INPUT_ID_PREFIX)
                {
                    props.idPrefix = this.props.idPrefix;
                }

                if (showTable)
                {
                    props.renderValue = props.formatter ?
                        props.formatter(props.value, props.values, props) :
                        elem.type.getRenderValue(props);
                    return this.props.tableRowRender(props);
                }
                return React.cloneElement(elem, props, this.renderChildren(elem.props.children));
            }
        });
    };

    handleInputValueChange = (result, props) =>
    {
        const data = CloneData(this.props);
        const value = props.convert ? props.convert(result.value) : result.value;
        const state = result.state;
        if (props.localize && data.selectedLanguage)
        {
            this.validateDataLanguage(data, data.selectedLanguage);
            data.values[this.props.transactionsKey][data.selectedLanguage][props.field] = value;
            if (state !== undefined)
            {
                data.states[this.props.transactionsKey][data.selectedLanguage][props.field] = state;
            }
        }
        else
        {
            data.values[props.field] = value;
            if (state !== undefined)
            {
                data.states[props.field] = state;
            }
        }
        this.props.onChange(data, value, state, props);
    };

    handleValidate = () =>
    {
        return this.handleValidateData(CloneData(this.props));
    };

    handleValidateData = (data) =>
    {
        data.valid = this.handleValidateChildren(this.props.children, data) === 0;
        this.props.onChange(data);
        if (!data.valid && this.props.onValidationFail)
        {
            this.props.onValidationFail(data, this.props);
        }
        return data.valid;
    };

    handleValidateChildren = (children, data) =>
    {
        let invalidCounter = 0;
        React.Children.forEach(children, elem => {
            if (!React.isValidElement(elem)) return;
            if (!BaseInput.isPrototypeOf(elem.type))
            {
                invalidCounter += this.handleValidateChildren(elem.props.children, data);
                return;
            }
            const props = Object.assign({}, elem.props);
            const value = this.getValue(data, elem);
            if (isHidden(value, props)) return;

            if (elem.props.validate)
            {
                const result = props.validate(value, props);
                let valid = true;
                if (typeof result === 'object')
                {
                    valid = result.state === 'success' || result.state === 'warning';
                    data.validation[props.field] = Object.assign({ valid }, result);
                }
                else
                {
                    valid = !!result;
                    data.validation[props.field] = { valid };
                }
                if (!valid) invalidCounter++;
            }
        });
        return invalidCounter;
    };

    handleClear = () =>
    {
        const data = CloneData(this.props);
        data.values = {};
        data.states = {};
        this.props.onChange(data);
    };

    handleSave = () =>
    {
        const data = CloneData(this.props);
        if (this.handleValidateData(data))
        {
            this.props.onSave(data, this.props);
        }
    };

    handleCancel = () =>
    {
        this.props.onCancel(CloneData(this.props), this.props);
    };

    renderContent = () =>
    {
        return this.renderChildren(this.props.children, CloneData(this.props))
    };

    handleLanguageChange = (key) =>
    {
        const data = CloneData(this.props);
        data.selectedLanguage = key;
        this.props.onChange(data);
    };

    validateDataLanguage = (data, key) =>
    {
        if (!data.values[this.props.transactionsKey]) data.values[this.props.transactionsKey] = {};
        if (!data.values[this.props.transactionsKey][key]) data.values[this.props.transactionsKey][key] = {};
    };

    handleLanguageAdd = (key) =>
    {
        const data = CloneData(this.props);
        this.validateDataLanguage(data, key);
        data.selectedLanguage = key;
        this.props.onChange(data);
    };

    handleLanguageRemove = (key, activeKeys) =>
    {
        const data = CloneData(this.props);
        if (data.values[this.props.transactionsKey])
        {
            delete data.values[this.props.transactionsKey][key];
        }
        if (data.selectedLanguage === key)
        {
            data.selectedLanguage = null;
            let found = false;
            activeKeys.some(elem => {

                if (elem !== key)
                {
                    data.selectedLanguage = elem;
                    if (found) return true;
                }
                else
                {
                    found = true;
                }
                return false;
            });
        }
        this.props.onChange(data);
    };

    state = { api: this.getApi() };

    render ()
    {
        const renderButtons = <FormButtons {...this.props} api={this.state.api} />;
        const showTable = this.props.table && !this.props.isOpen;
        const renderLanguageSelect = <FormLanguageSelect {...this.props} api={this.state.api} allowAdd={!showTable} />;

        const props = Object.assign(
            {
                renderFormContent: this.renderContent,
                renderFormBody: showTable ? () => this.props.tableRender(props) : this.renderContent,
                renderLanguageSelectTop: () => !this.props.languagesBottom && renderLanguageSelect,
                renderLanguageSelectBottom: () => this.props.languagesBottom && renderLanguageSelect,
                renderFormButtons: () => showTable ? null : renderButtons,
                api: this.state.api,
                onFormSubmit: e => {e.preventDefault(); this.state.api.save()},
                renderAlerts: () => GetAlerts(this.props.alerts).map((elem, index) => {
                    elem.index = index;
                    return this.props.alertRender(elem);
                }),
            },
            this.props
        );

        if (this.props.card)
        {
            return this.props.cardRender(props);
        }
        else if (this.props.modal)
        {
            return this.props.modalRender(props);
        }

        return this.props.formRender(props);
    }
}