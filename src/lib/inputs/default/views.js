import React from 'react';
import { FormGroup, Label, Input, FormFeedback, FormText, Badge } from 'reactstrap';
import InputDefault from "./index";

export const RenderLabel = (props) =>
    <Label for={props.id} {...props.labelProps}>
        {props.title} {props.languageName && <Badge color="secondary">{props.languageName}</Badge>}
    </Label>;

export const RenderInput = (props) =>
    <Input type={props.type} id={props.id} name={props.name} required={props.required}
           valid={props.valid} invalid={props.invalid} disabled={props.disabled}
           placeholder={props.placeholder} value={props.value} rows={props.rows}
           multiple={props.multiple} max={props.max} maxLength={props.maxLength}
           min={props.min} minLength={props.minLength} pattern={props.pattern} size={props.size} step={props.step}
           plaintext={props.plaintext} checked={props.checked}
           onChange={props.onChange} {...props.inputProps}>
        {props.children}
    </Input>;

export const RenderFormGroup = (props) =>
    <FormGroup {...props.formGroupProps}>
        {InputDefault.renderLabel(props)}
        {InputDefault.renderInput(props)}
        {InputDefault.renderFormFeedback(props)}
        {InputDefault.renderFormText(props)}
    </FormGroup>;

export const RenderFormFeedback = (props) =>
    <FormFeedback valid={props.valid}>
        {props.formFeedback}
    </FormFeedback>;

export const RenderFormText = (props) =>
    <FormText>{props.formText}</FormText>;

export const RenderLabelCheckbox = (props) => props.title;

export const RenderFormGroupCheckbox = (props) =>
    <FormGroup {...props.formGroupProps} check>
        <Label check >
            {InputDefault.renderInput(props)}{' '}
            {InputDefault.renderLabel(props)}
        </Label>
        {InputDefault.renderFormFeedback(props)}
        {InputDefault.renderFormText(props)}
    </FormGroup>;