import React from 'react';
import { Form, FormGroup, Label, Card, CardHeader, CardBody, CardFooter,
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Alert } from 'reactstrap';
import LanguageSelect from './localization';

export const RenderLanguageSelect = (props) =>
    <FormGroup>
        <LanguageSelect {...props} />
    </FormGroup>;

export const RenderLanguageSelectFromGroup = (props) =>
    <FormGroup>
        <Label>{props.title}</Label>
        {RenderLanguageSelect(props)}
    </FormGroup>;

export const RenderForm = (props) =>
    <Form inline={props.inline} {...props.formProps} onSubmit={props.onFormSubmit}>
        {props.renderLanguageSelectTop()}
        {props.renderFormBody()}
        {props.renderLanguageSelectBottom()}
        {props.renderAlerts()}
        {props.renderFormButtons()}
    </Form>;

export const RenderCard = (props) =>
    <Form {...props.formProps} onSubmit={props.onFormSubmit}>
        <Card {...props.cardProps}>
            <CardHeader>{props.title}</CardHeader>
            <CardBody>
                {props.renderLanguageSelectTop()}
                {props.renderFormBody()}
                {props.renderLanguageSelectBottom()}
                {props.renderAlerts()}
            </CardBody>
            <CardFooter>
                {props.renderFormButtons()}
            </CardFooter>
        </Card>
    </Form>;

export const RenderModal = (props) =>
    <Modal isOpen={props.isOpen} toggle={props.onCancel} size={props.modalSize} {...props.modalProps}>
        <Form {...props.formProps} onSubmit={props.onFormSubmit}>
            <ModalHeader toggle={props.onCancel}>{props.title}</ModalHeader>
            <ModalBody>
                {props.renderLanguageSelectTop()}
                {props.renderFormBody()}
                {props.renderLanguageSelectBottom()}
                {props.renderAlerts()}
            </ModalBody>
            <ModalFooter>
                {props.renderFormButtons()}
            </ModalFooter>
        </Form>
    </Modal>;

export const RenderTableRow = (props) =>
    <tr>
        <td>{props.title}</td>
        <td>{props.renderValue}</td>
    </tr>;

export const RenderTable = (props) =>
    <Table {...props.tableProps}>
        <tbody>
        {props.renderFormContent()}
        </tbody>
    </Table>;

export const RenderButtons = (props) =>
    <React.Fragment>
        {props.renderSaveButton()}
        {props.renderClearButton()}
        {props.renderCancelButton()}
        {props.extraButtons}
    </React.Fragment>;

export const RenderSaveButton = (props) =>
    <React.Fragment>
        <Button color="primary" type="submit">{props.saveButtonText}</Button>{' '}
    </React.Fragment>;

export const RenderClearButton = (props) =>
    <React.Fragment>
        <Button onClick={props.onClearClick}>{props.clearButtonText}</Button>{' '}
    </React.Fragment>;

export const RenderCancelButton = (props) =>
    <React.Fragment>
        <Button onClick={props.onCancelClick}>{props.cancelButtonText}</Button>{' '}
    </React.Fragment>;

export const RenderAlert = (alert) =>
    <Alert key={alert.index} color={alert.type}>{alert.content}</Alert>;