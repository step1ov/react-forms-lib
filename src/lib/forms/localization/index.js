import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RenderLanguageSelect, RenderDefaultButton, RenderActiveItem, RenderAddButton, RenderAddItem} from './views';

export default class LanguageSelect extends Component
{
    static propTypes = {
        items: PropTypes.object.isRequired,
        activeItems: PropTypes.object,
        selected: PropTypes.string,
        onChange: PropTypes.func,
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        size: PropTypes.string,
        defaultText: PropTypes.node,
        addText: PropTypes.node,
        languageSelectRender: PropTypes.func,
        defaultButtonRender: PropTypes.func,
        activeItemRender: PropTypes.func,
        addButtonRender: PropTypes.func,
        addItemRender: PropTypes.func,
        allowAdd: PropTypes.bool
    };

    static defaultProps = {
        defaultText: "Default",
        addText: "+",
        size: "sm",
        languageSelectRender: RenderLanguageSelect,
        defaultButtonRender: RenderDefaultButton,
        activeItemRender: RenderActiveItem,
        addButtonRender: RenderAddButton,
        addItemRender: RenderAddItem,
        allowAdd: true
    };

    state = {
        dropdownOpen: false
    };

    renderDefaultButton = () =>
    {
        const props = Object.assign(
            {
                active: !this.props.selected,
                onClick: (e) => {
                    e.preventDefault();
                    this.props.onChange(null);
                }
            },
            this.props
        );
        return this.props.defaultButtonRender(props);
    };

    renderActiveItems = () =>
    {
        if (this.props.activeItems)
        {
            const activeKeys = Object.keys(this.props.activeItems).filter(key => !!this.props.items[key]);
            return activeKeys.map(key => {
                const props = Object.assign(
                    {
                        active: this.props.selected === key,
                        onClick: (e) => {
                            e.preventDefault();
                            this.props.onChange(key);
                        },
                        onRemoveClick: (e) => {
                            e.preventDefault();
                            this.props.onRemove(key, activeKeys);
                        },
                        key,
                        item: this.props.items[key]
                    },
                    this.props
                );
                return this.props.activeItemRender(props);
            });
        }
    };

    renderAddButton = () =>
    {
        if (this.props.allowAdd && this.props.onAdd)
        {
            const notActiveKeys = this.props.activeItems ?
                Object.keys(this.props.items).filter(key => !this.props.activeItems[key]) :
                Object.keys(this.props.items);
            if (notActiveKeys.length > 0)
            {
                const props = Object.assign(
                    {
                        dropdownOpen: this.state.dropdownOpen,
                        dropdownToggle: () => this.setState({dropdownOpen: !this.state.dropdownOpen}),
                        notActiveKeys,
                        renderAddItems: () => this.renderAddItems(notActiveKeys)
                    },
                    this.props
                );
                return this.props.addButtonRender(props);
            }
        }
    };

    renderAddItems = (notActiveKeys) =>
    {
        return notActiveKeys.map(key => {
            const props = Object.assign(
                {
                    onClick: (e) => {
                        e.preventDefault();
                        this.props.onAdd(key);
                    },
                    key,
                    item: this.props.items[key]
                },
                this.props
            );
            return this.props.addItemRender(props);
        });
    };

    render()
    {
        const props = Object.assign(
            {
                renderDefaultButton: this.renderDefaultButton,
                renderActiveItems: this.renderActiveItems,
                renderAddButton: this.renderAddButton
            },
            this.props
        );

        return RenderLanguageSelect(props);
    }
}