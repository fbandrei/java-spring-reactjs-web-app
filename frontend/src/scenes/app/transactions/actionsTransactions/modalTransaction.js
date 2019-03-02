import React from "react";
import {
  createTransaction,
  getAccounts,
  getAllCategories,
  getAllPayees
} from "../../../../services/RequestAPI";
import {
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  TreeSelect
} from "antd";
import moment from "moment";
import "./actionsTransactions.css";
import LoadingIndicator from "../../../../components/LoadingIndicator";

const TreeNode = TreeSelect.TreeNode;
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

function onChange(moment) {
  const date = moment.toDate();

  this.setState({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  });
}

class ModalTransaction extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      accounts: [],
      payees: [],
      subcategory: [],
      fields: {
        account: 0,
        sum: 0,
        payee: 0,
        newPayee: "",
        description: "",
        subcategory: "",
        subcategoryId: 0,
        outcome: true,
        income: false,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      },
      errors: {
        category: "",
        subcategory: ""
      },
      confirmLoading: false,
      loading: false,
      formLayout: "horizontal"
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: true
    });
    getAllCategories().then(res => {
      this.setState({
        categories: res,
        loading: false
      });
    });
    getAccounts().then(res => {
      this.setState({
        accounts: res,
        loading: false
      });
    });
    getAllPayees().then(res => {
      this.setState({
        payees: res,
        loading: false
      });
    });
  }

  handleOk = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    const transaction = {
      subcategory: fields["subcategoryId"],
      year: fields["year"],
      month: fields["month"],
      day: fields["day"],
      payee: fields["payee"],
      newPayee: fields["newPayee"],
      account: fields["account"],
      description: fields["description"],
      sum: fields["sum"],
      outcome: fields["outcome"]
    };
    this.setState({
      confirmLoading: true
    });
    createTransaction(transaction)
      .then(res => {
        if (res === false) {
          errors["subcategory"] = "This subcategory already exists";
          this.setState({ errors: errors });
          formIsValid = false;
        }
      })
      .finally(() => {
        if (formIsValid) {
          this.props.toggleModalTransaction();
          this.props.reRender();
        }
      });
    setTimeout(() => {
      this.setState({
        confirmLoading: false
      });
    }, 2000);
  };

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields: fields });
  }

  payeeChanged(value) {
    let fields = this.state.fields;
    const payees = this.state.payees;
    for (let i = 0; i < payees.length; i++) {
      if (payees[i].name === value) {
        fields["payee"] = payees[i].payeeId;
      }
    }
    this.setState({ fields: fields });
  }

  subcategoryChanged(value) {
    let fields = this.state.fields;
    let categories = this.state.categories;
    for (let i = 0; i < categories.length; i++) {
      const subcategories = categories[i].subcategories;
      if (subcategories !== undefined) {
        for (let j = 0; j < subcategories.length; j++) {
          if (subcategories[j].name === value) {
            fields["subcategoryId"] = subcategories[j].subcategoryId;
            fields["subcategory"] = value;
          }
        }
      }
    }
    this.setState({ fields: fields });
  }

  accountChanged(value) {
    let fields = this.state.fields;
    const accounts = this.state.accounts;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].name === value) {
        console.log(accounts[i]);
        fields["account"] = accounts[i].accountNumber;
        console.log(accounts[i].accountNumber);
      }
    }
    this.setState({ fields: fields });
  }

  incomeOrOutcome(e) {
    let fields = this.state.fields;
    fields["outcome"] = false;
    fields["income"] = false;
    if (e.target.value === "outcome") {
      fields["outcome"] = true;
    } else {
      fields["income"] = true;
    }
    this.setState({
      fields: fields
    });
  }

  newPayee() {
    const input = document.getElementById("newPayee");
    let fields = this.state.fields;
    fields["newPayee"] = input.value;
    this.setState({
      fields: fields
    });
  }

  setDescription() {
    const input = document.getElementById("descriptionTransaction");
    console.log(input.value);
    let fields = this.state.fields;
    fields["description"] = input.value;
    this.setState({
      fields: fields
    });
  }

  setSum() {
    const input = document.getElementById("sumTransaction");
    console.log(input.value);
    let fields = this.state.fields;
    fields["sum"] = input.value;
    this.setState({
      fields: fields
    });
  }

  render() {
    if (this.state.loading === true) {
      return <LoadingIndicator />;
    }

    let firstCategory = {
      name: "Category"
    };
    let firstSubcategory = {
      name: "Subcategory"
    };
    if (this.state.categories[0] !== undefined) {
      firstCategory = this.state.categories[0];
    }
    if (this.state.subcategory[0] !== undefined) {
      firstSubcategory = this.state.subcategory[0];
    }
    return (
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
              <RadioGroup
                onChange={this.incomeOrOutcome.bind(this)}
                defaultValue="outcome"
                buttonStyle={"solid"}
              >
                <RadioButton value="outcome">Outcome</RadioButton>
                <RadioButton value="income">Income</RadioButton>
              </RadioGroup>
            </div>
            <div className={"col-6"}>
              <DatePicker
                onChange={onChange.bind(this)}
                defaultValue={moment()}
              />
            </div>
          </div>
          <div className={"row mt-distance"}>
            <div className={"col-6"}>
              <h6>Account</h6>
              <InputGroup>
                <Select
                  defaultValue={"Account"}
                  onChange={this.accountChanged.bind(this)}
                >
                  {this.state.accounts.map(account => (
                    <Option key={account.name} value={account.name}>
                      {account.name}
                    </Option>
                  ))}
                </Select>
              </InputGroup>
            </div>
            <div className={"col-6"}>
              <h6>Sum</h6>
              <InputNumber
                onBlur={this.setSum.bind(this)}
                id={"sumTransaction"}
                defaultValue={0}
                min={-999999}
                max={999999}
                step={0.1}
              />
            </div>
          </div>
          <div className={"row mt-distance"}>
            <div className={"col-6"}>
              <h6>Payee</h6>
              <InputGroup>
                <Select
                  defaultValue={"Payee"}
                  onChange={this.payeeChanged.bind(this)}
                >
                  {this.state.payees.map(payee => (
                    <Option key={payee.name} value={payee.name}>
                      {payee.name}
                    </Option>
                  ))}
                </Select>
              </InputGroup>
            </div>
            <div className={"col-6"}>
              <h6>New payee</h6>
              <Input
                onBlur={this.newPayee.bind(this)}
                id={"newPayee"}
                placeholder={"Define a new payee"}
              />
            </div>
          </div>
          <div className={"row mt-distance"}>
            <div className={"col-12"}>
              <h6>Subcategory</h6>
              <TreeSelect
                style={{ width: 350 }}
                value={this.state.fields["subcategory"]}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Please select a subcategory"
                allowClear
                treeDefaultExpandAll
                maxTagCount
                onChange={this.subcategoryChanged.bind(this)}
              >
                {this.state.categories.map(category => (
                  <TreeNode
                    disabled={true}
                    value={category.name}
                    title={category.name}
                    key={category.name}
                  >
                    {category.subcategories.map(subcategory => (
                      <TreeNode
                        value={subcategory.name}
                        title={subcategory.name}
                        key={subcategory.name}
                      />
                    ))}
                  </TreeNode>
                ))}
              </TreeSelect>
            </div>
          </div>
          <div className={"row mt-distance"}>
            <h6 className={"mt-description"}>Description</h6>
            <div className={"col-12"}>
              <TextArea
                id={"descriptionTransaction"}
                onBlur={this.setDescription.bind(this)}
                rows={1}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalTransaction;
