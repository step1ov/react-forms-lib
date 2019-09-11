import React from 'react';
import { Button, ButtonGroup, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

const GetColor = (active) => active ? "primary" : "default";

export const RenderDefaultButton = (props) =>
    <React.Fragment>
        <Button size={props.size} active={props.active}
                color={GetColor(props.active)} onClick={props.onClick}>
            {props.defaultText}
        </Button>{' '}
    </React.Fragment>;

export const RenderActiveItem = (props) =>
    <React.Fragment key={props.key}>
        <ButtonGroup>
            <Button size={props.size} active={props.active}
                    color={GetColor(props.active)} onClick={props.onClick}>
                {props.item}
            </Button>
            <Button size={props.size} active={props.active}
                    color={GetColor(props.active)} onClick={props.onRemoveClick}>
                ×
            </Button>
        </ButtonGroup>{' '}
    </React.Fragment>;

export const RenderAddButton = (props) =>
    <ButtonDropdown isOpen={props.dropdownOpen} toggle={props.dropdownToggle}>
        <DropdownToggle caret size={props.size}>
            {props.addText}
        </DropdownToggle>
        <DropdownMenu>
            {props.renderAddItems()}
        </DropdownMenu>
    </ButtonDropdown>;

export const RenderAddItem = (props) =>
    <DropdownItem key={props.key} onClick={props.onClick}>{props.item}</DropdownItem>;

export const RenderLanguageSelect = (props) =>
    <React.Fragment>
        {props.renderDefaultButton()}
        {props.renderActiveItems()}
        {props.renderAddButton()}
    </React.Fragment>;
