import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
    RenderActiveItem,
    RenderAddButton,
    RenderAddItem,
    RenderDefaultButton,
    RenderLanguageSelect
} from "../localization/views";

export default class FormLanguageSelect extends Component
{
    static propTypes = {
        data: PropTypes.object,
        languages: PropTypes.object,
        languagesBottom: PropTypes.bool,
        hideLanguagesTitle: PropTypes.bool,
        transactionsKey: PropTypes.string,

        languageSelectRender: PropTypes.func,
        languageSelectFromGroupRender: PropTypes.func,

        languagesTitleText: PropTypes.node,
        defaultLanguageText: PropTypes.node,
        addLanguageText: PropTypes.node,
        allowAdd: PropTypes.bool
    };

    static defaultProps = {
        allowAdd: true
    };

    render = () =>
    {
        if (this.props.languages)
        {
            const activeItems = this.props.data && this.props.data.values &&
            this.props.data.values[this.props.transactionsKey] ?
                this.props.data.values[this.props.transactionsKey] : {};

            const props = {
                items: this.props.languages,
                activeItems,
                title: this.props.languagesTitleText,
                defaultText: this.props.defaultLanguageText,
                addText: this.props.addLanguageText,
                onChange: this.props.api.language.change,
                onAdd: this.props.api.language.add,
                onRemove: this.props.api.language.remove,
                selected: this.props.data && this.props.data.selectedLanguage,
                allowAdd: this.props.allowAdd
            };
            return this.props.hideLanguagesTitle ?
                this.props.languageSelectRender(props) : this.props.languageSelectFromGroupRender(props);
        }
        return null;
    }
}