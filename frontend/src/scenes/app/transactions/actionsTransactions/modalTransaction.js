import React from 'react'
import {createSubCategory, getAllCategories} from "../../../../services/RequestAPI";
import {Input, Select, Modal, Radio, DatePicker, InputNumber, TreeSelect} from "antd";
import {Col, Form, FormGroup, Label} from 'reactstrap';
import moment from 'moment';
import './actionsTransactions.css'
import LoadingIndicator from "../../../../components/LoadingIndicator";

const TreeNode = TreeSelect.TreeNode;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {TextArea} = Input;

class ModalTransaction extends React.Component {

    constructor() {
        super();

        this.state = {
            category: [],
            subcategory: [],
            fields: {
                account: '',
                sum: 0,
                payee: '',
                newPayee: '',
                description: '',
                category: '',
                subcategory: '',
                outcome: true,
                income: false,
                date: new Date()
            },
            errors: {
                category: '',
                subcategory: '',
            },
            confirmLoading: false,
            loading: false,
            formLayout: 'horizontal'
        };
        this.handleOk = this.handleOk.bind(this);
    }

    componentWillMount() {
        this.setState({
            loading: true
        });
        getAllCategories()
            .then(res => {
                this.setState({
                    category: res,
                    loading: false,
                    subcategory: res[0].subcategories
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
                    this.props.toggleModalTransaction();
                    this.props.reRenderSubcategory();
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

    payeeChanged(value) {
        let fields = this.state.fields;
        fields['payee'] = value;
        this.setState({fields: fields});
    }

    subcategoryChanged(value) {
        let fields = this.state.fields;
        fields['subcategory'] = value;
        this.setState({fields: fields});
    }

    accountChanged(value) {
        let fields = this.state.fields;
        fields['account'] = value;
        this.setState({fields: fields});
    }

    incomeOrOutcome(e) {
        let fields = this.state.fields;
        if (e.target.value === 'outcome') {
            fields['outcome'] = true;
        } else {
            fields['income'] = true;
        }
        this.setState({
            fields: fields
        });
    }

    render() {
        if (this.state.loading === true) {
            return <LoadingIndicator/>;
        }

        let firstCategory = {
            name: 'Category'
        };
        let firstSubcategory = {
            name: 'Subcategory'
        };
        if (this.state.category[0] !== undefined) {
            firstCategory = this.state.category[0];
        }
        if (this.state.subcategory[0] !== undefined) {
            firstSubcategory = this.state.subcategory[0];
        }
        return(
            <Modal
                title={"ADD TRANSACTION"}
                visible={this.props.modal}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.props.toggleModalTransaction}
                okText={"Submit"}
            >
                <div className={"col-12"}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <RadioGroup onChange={this.incomeOrOutcome} defaultValue="outcome" buttonStyle={"solid"}>
                                <RadioButton value="outcome">Outcome</RadioButton>
                                <RadioButton value="income">Income</RadioButton>
                            </RadioGroup>
                        </div>
                        <div className={"col-6"}>
                            <DatePicker defaultValue={moment()}/>
                        </div>
                    </div>
                    <div className={"row mt-distance"}>
                        <div className={"col-6"}>
                            <h6>Account</h6>
                            <InputGroup>
                                <Select defaultValue={"Account"} onChange={this.handleChange.bind(this, "account")}>
                                    {
                                        this.state.category.map(category =>
                                            <Option key={category.name} value={category.name}>{category.name}</Option>)
                                    }
                                </Select>
                            </InputGroup>
                        </div>
                        <div className={"col-6"}>
                            <h6>Sum</h6>
                            <InputNumber defaultValue={0} min={-999999} max={999999} step={0.1} />
                        </div>
                    </div>
                    <div className={"row mt-distance"}>
                        <div className={"col-6"}>
                            <h6>Payee</h6>
                            <InputGroup>
                                <Select defaultValue={"Payee"} onChange={this.handleChange.bind(this, "payee")}>
                                    {
                                        this.state.category.map(category =>
                                            <Option key={category.name} value={category.name}>{category.name}</Option>)
                                    }
                                </Select>
                            </InputGroup>
                        </div>
                        <div className={"col-6"}>
                            <h6>New payee</h6>
                                <Input placeholder={"Define a new payee"}/>
                        </div>
                    </div>
                    <div className={"row mt-distance"}>
                        <div className={"col-12"}>
                            <h6>Subcategory</h6>
                            <TreeSelect
                                style={{width: 350}}
                                value={this.state.fields['subcategory']}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select a subcategory"
                                allowClear
                                treeDefaultExpandAll
                                onChange={this.handleChange.bind(this, "subcategory")}
                            >
                                {
                                    this.state.category.map(category =>
                                        <TreeNode disabled={true} value={category.name} title={category.name} key={category.name}>
                                            {
                                                category.subcategories.map(subcategory =>
                                                    <TreeNode value={subcategory.name} title={subcategory.name} key={subcategory.name}/>)
                                            }

                                        </TreeNode>)
                                }

                            </TreeSelect>
                        </div>
                    </div>
                    <div className={"row mt-distance"}>
                        <h6 className={"mt-description"}>Description</h6>
                        <div className={"col-12"}>
                            <TextArea rows={1}/>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ModalTransaction;