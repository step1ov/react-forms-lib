import React, { Component } from 'react';
import { InputForm, InputDefault } from "./../lib";
import {Col, Row} from "reactstrap";

const languages = {
    'en': 'English',
    'ru': 'Russian',
    'de': 'German',
    'sp': 'Spanish',
    'fr': 'French'
};

export default class SampleForm extends Component
{
    state = {
        data: {}
    };

    handleChange = (data) =>
    {
        console.log(data);
        this.setState({data});
    };

    handleSave = (data) =>
    {
        alert("Save");
    };

    handleCancel = () =>
    {
        alert("Cancel");
    };

    handleExtraButtonClick = (e) =>
    {
        e.preventDefault();
        alert("Extra button click")
    };

    render()
    {
        return (
            <InputForm data={this.state.data}
                       onChange={this.handleChange} clearButton cancelButton
                       onSave={this.handleSave} onCancel={this.handleCancel}
                       languages={languages} title="Form"
                       extraButtons={<a href="#" onClick={this.handleExtraButtonClick} className="float-right">Extra Button</a>}
                       {...this.props}>
                <Row>
                    <Col>
                        <InputDefault type="text" title="Text" localize
                                      validate={(value) => value ? true : { state: "error", message: "empty" }} field="text" />
                    </Col>
                    <Col>
                        <InputDefault type="email" title="Email" field="email"
                                      validate={(value) => !!value}/>
                    </Col>
                </Row>
                <InputDefault type="password" title="Password" field="password" />
                <InputDefault type="textarea" title="TextArea" field="textarea" rows={5} />
                <InputDefault type="checkbox" title="Checkbox" field="checkbox" />
                <InputDefault type="select" title="Select" field="select" >
                    {Object.keys(languages).map(key => <option key={key} value={key}>{languages[key]}</option>)}
                </InputDefault>
                <InputDefault type="select" title="Select Multiple" field="select_multi" multiple >
                    {Object.keys(languages).map(key => <option key={key} value={key}>{languages[key]}</option>)}
                </InputDefault>
                <InputDefault type="radio" name="radio" title="Radio" field="radio" radioValue={1}/>
                <InputDefault type="radio" name="radio" title="Radio" field="radio" radioValue={2}/>
            </InputForm>
        )
    }
}
