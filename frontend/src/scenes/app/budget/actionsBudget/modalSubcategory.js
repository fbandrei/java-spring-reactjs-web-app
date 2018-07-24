import React from 'react'
import {createSubCategory, getAllCategories} from "../../../../services/RequestAPI";
import {Input, Select, Modal} from "antd";
import {Col, Form, FormGroup, Label} from 'reactstrap';


const InputGroup = Input.Group;
const Option = Select.Option;

class ModalSubcategory extends React.Component {

    constructor() {
        super();

        this.state = {
            category: [],
            fields: {
                category: '',
                subcategory: '',
            },
            errors: {
                category: '',
                subcategory: '',
            },
            confirmLoading: false,
            formLayout: 'horizontal'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    componentWillMount() {
        getAllCategories()
            .then(res => {
                this.setState({
                    category: res
                });
            })
    }

    handleOk = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        const date = new Date();

        const subcategory = {
            selectedCategory: fields["category"],
            subcategory: fields["subcategory"],
            year: date.getFullYear(),
            month: date.getMonth() + 1

        };
        this.setState({
            confirmLoading: true
        });
        createSubCategory(subcategory)
            .then(res => {
                if (res === false) {
                    errors["subcategory"] = "This subcategory already exists";
                    this.setState({errors: errors});
                    formIsValid = false;
                }
            }).finally( () => {
                if(formIsValid) {
                    this.props.toggleModalSubcategory();
                    this.props.reRender();
                }
            }
        );
        setTimeout(() => {
            this.setState({
                confirmLoading: false
            });
        }, 2000)
    };

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields: fields});
    }

    categoryChanged(value) {
        let fields = this.state.fields;
        fields['category'] = value;
        this.setState({fields: fields});
    }

    render() {
        return(
            <Modal
                title={"Add a new subcategory"}
                visible={this.props.modal}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.props.toggleModalSubcategory}
                okText={"Submit"}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label sm={4}>Select a category</Label>
                        <Col sm={6}>
                            <InputGroup>
                                <Select defaultValue={"Category"} onChange={this.categoryChanged.bind(this)}>
                                    {
                                        this.state.category.map(category =>
                                            <Option key={category.name} value={category.name}>{category.name}</Option>)
                                    }
                                </Select>
                            </InputGroup>
                            <span style={{color: "red"}}>{this.state.errors["category"]}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={4}>Subcategory name</Label>
                        <Col sm={6}>
                            <Input className={"form-control"} value = {this.state.fields["subcategory"]}
                                   placeholder={"subcategory name"} onChange={this.handleChange.bind(this, "subcategory")} type={"text"} name={"subcategory"} id={"subcategory"}/>
                            <span style={{color: "red"}}>{this.state.errors["subcategory"]}</span>
                        </Col>
                    </FormGroup>
                </Form>
            </Modal>
        );
    }
}

export default ModalSubcategory;