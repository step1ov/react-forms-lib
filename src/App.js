import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import SampleForm from './example';

export default class App extends Component
{
    state = {
        data: {}, modal: false, table: false, cardTable: false
    };

    toggleModal = () =>
    {
        this.setState({modal: !this.state.modal});
    };

    toggleTable = () =>
    {
        this.setState({table: !this.state.table});
    };

    toggleCardTable = () =>
    {
        this.setState({cardTable: !this.state.cardTable});
    };

    render()
    {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>react-forms-lib demo</h1>

                        <h2>Regular form</h2>
                        <SampleForm idPrefix="regular_"/>
                        <hr/>

                        <h2>Form in card</h2>
                        <SampleForm card idPrefix="card_"/>
                        <hr/>

                        <h2>Form in modal</h2>
                        <Button onClick={e => {e.preventDefault(); this.toggleModal()}} >Modal</Button>
                        <SampleForm modal idPrefix="modal_" isOpen={this.state.modal}
                                    onCancel={this.toggleModal} modalProps={{size: "lg"}}/>
                        <hr/>

                        <h2>Table</h2>
                        <Button onClick={e => {e.preventDefault(); this.toggleTable()}} className="mb-4">Table</Button>
                        <SampleForm table idPrefix="table_" isOpen={this.state.table}/>
                        <hr/>

                        <h2>Table in card</h2>
                        <Button onClick={e => {e.preventDefault(); this.toggleCardTable()}} className="mb-4">Card Table</Button>
                        <SampleForm card table idPrefix="cardTable_" isOpen={this.state.cardTable}/>
                        <hr/>
                    </Col>
                </Row>
            </Container>
        )
    }
}