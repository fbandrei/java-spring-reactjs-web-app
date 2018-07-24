import React from 'react'
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import {createCategory} from "../../../../services/RequestAPI";

class ModalCategory extends React.Component {

    constructor() {
        super();

        this.state = {
            fields: {
                name: '',
                subcategory_1: '',
                subcategory_2: '',
                subcategory_3: ''
            },
            errors: {
                name: '',
                subcategory_1: '',
                subcategory_2: '',
                subcategory_3: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        const date = new Date();

        const category = {
            name: fields["name"],
            subcategory_1: fields["subcategory_1"],
            subcategory_2: fields["subcategory_2"],
            subcategory_3: fields["subcategory_3"],
            year: date.getFullYear(),
            month: date.getMonth() + 1

        };
        createCategory(category)
            .then(res => {
                if (res === false) {
                    console.log(res);
                    errors["name"] = "This category already exists";
                    this.setState({errors: errors});
                    formIsValid = false;
                }
            }).finally( () => {
                if(formIsValid) {
                    this.props.toggleModalCategory();
                    this.props.reRender();
                }
            }
        );
        event.preventDefault();
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields: fields});
    }

    render() {
        return(
            <Modal isOpen={this.props.modal} toggle={this.props.toggleModalCategory}>
                <ModalHeader toggle={this.props.toggleModalCategory}>Add a new category</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label sm={2}>Category</Label>
                            <Col sm={8}>
                                <Input className={"form-control"} required value = {this.state.fields["name"]}
                                       placeholder={"e.g. Entertainment"} onChange={this.handleChange.bind(this, "name")} type={"text"} name={"name"} id={"name"}/>
                                <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                            </Col>
                        </FormGroup>
                        <h6>Optional subcategories </h6>
                        <FormGroup row>
                            <Label sm={2}>1</Label>
                            <Col sm={8}>
                                <Input className={"form-control"} value = {this.state.fields["subcategory_1"]}
                                       placeholder={"e.g. Cinema"} onChange={this.handleChange.bind(this, "subcategory_1")} type={"text"} name={"subcategory_1"} id={"subcategory_1"}/>
                                <span style={{color: "red"}}>{this.state.errors["subcategory_1"]}</span>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>2</Label>
                            <Col sm={8}>
                                <Input className={"form-control"} value = {this.state.fields["subcategory_2"]}
                                       placeholder={"e.g. Girl's night"} onChange={this.handleChange.bind(this, "subcategory_2")} type={"text"} name={"subcategory_2"} id={"subcategory_2"}/>
                                <span style={{color: "red"}}>{this.state.errors["subcategory_2"]}</span>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>3</Label>
                            <Col sm={8}>
                                <Input className={"form-control"} value = {this.state.fields["subcategory_3"]}
                                       placeholder={"e.g. Stand up comedy"} onChange={this.handleChange.bind(this, "subcategory_3")} type={"text"} name={"subcategory_3"} id={"subcategory_3"}/>
                                <span style={{color: "red"}}>{this.state.errors["subcategory_3"]}</span>
                            </Col>
                        </FormGroup>
                        <ModalFooter>
                            <Input className={"btn btn-primary"} type={"submit"} value={"Submit"}/>
                            <Button color={"secondary"} onClick={this.props.toggleModalCategory}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export default ModalCategory;