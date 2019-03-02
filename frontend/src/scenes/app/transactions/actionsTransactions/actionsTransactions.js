import React from "react";
import "./actionsTransactions.css";
import { Button } from "antd";
import ModalTransaction from "./modalTransaction";
import ModalTemplate from "./modalTemplate";

class ActionsTransactions extends React.Component {
  constructor() {
    super();
    this.state = {
      modalTransaction: false,
      modalTemplate: false
    };
  }

  toggleModalTransaction() {
    console.log("modal transaction triggered");
    this.setState({
      modalTransaction: !this.state.modalTransaction
    });
  }

  toggleModalTemplate() {
    this.setState({
      modalTemplate: !this.state.modalTemplate
    });
  }

  reRender() {
    this.props.setNewTransaction();
  }

  reRenderTemplate() {
    this.props.setNewTemplate();
  }

  componentWillMount() {
    console.log("actions transactions mounting");
  }

  render() {
    return (
      <div className={"container actions"}>
        <div className={"actions-buttons"}>
          <span>
            <Button
              type="default"
              icon="plus-circle-o"
              onClick={this.toggleModalTransaction.bind(this)}
            >
              Add Transaction
            </Button>
            {/*<Button className={"actions-buttons2"} type={"default"} icon={"plus-circle-o"} onClick={this.toggleModalTemplate.bind(this)}>Define Template</Button>*/}
          </span>
        </div>
        <ModalTransaction
          reRender={this.reRender.bind(this)}
          toggleModalTransaction={this.toggleModalTransaction.bind(this)}
          modal={this.state.modalTransaction}
        />
        <ModalTemplate
          reRenderTemplate={this.reRenderTemplate.bind(this)}
          toggleModalTemplate={this.toggleModalTemplate.bind(this)}
          modal={this.state.modalTemplate}
        />
      </div>
    );
  }
}

export default ActionsTransactions;
