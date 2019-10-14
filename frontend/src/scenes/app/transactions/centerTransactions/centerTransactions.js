import React from "react";
import "./centerTransactions.css";
import { Button, Table } from "antd";
import { getAllTransactions } from "../../../../services/RequestAPI";
import LoadingIndicator from "../../../../components/LoadingIndicator";

const getColumns = () => {
  return ([
    {
      title: "Subcategory",
      dataIndex: "subcategory",
      key: "subcategory",
      width: 150
    },
    { title: "Account", dataIndex: "account", key: "account", width: 150 },
    { title: "Payee", dataIndex: "payee", key: "payee", width: 150 },
    { title: "In/Out", dataIndex: "inout", key: "inout", width: 150 },
    {
      title: "Delete",
      dateIndex: "delete",
      key: "delete",
      width: 150
    },
    { title: "Edit", dateIndex: "edit", key: "edit" }
  ]);
};

class CenterTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      loading: false,
      dataToShow: []
    };
  }
  componentWillMount() {
    this.setState({
      loading: true,
      columns: getColumns()
    });
    getAllTransactions().then(res => {
      const arrayData = res;
      const data = [];
      if (arrayData !== undefined) {
        for (let i = 0; i < arrayData.length; i++) {
          const transaction = {
            key: i + 1,
            subcategory: arrayData[i].subcategory.name,
            account: arrayData[i].account.name,
            payee: arrayData[i].payee.name,
            inout: arrayData[i].sum,
            delete: "test",
            edit: <Button icon={"delete"} type={"danger"}/>
          };
          data.push(transaction);
        }
        console.log(data);
        this.setState({
          dataToShow: data,
          loading: false
        });
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    } else {
      return (
          <div>
            <div className={"container centerBudget"}>
              <div>
                <Table
                    dataSource={this.state.dataToShow}
                    columns={this.state.columns}
                    pagination={false}
                    scroll={{y: 460}}
                />
              </div>
            </div>
          </div>
      );
    }
  }
}
export default CenterTransactions;
