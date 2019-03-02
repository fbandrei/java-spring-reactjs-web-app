import React from "react";
import "./centerTransactions.css";
import { Button, Table } from "antd";
import { getAllTransactions } from "../../../../services/RequestAPI";
import LoadingIndicator from "../../../../components/LoadingIndicator";

class CenterTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }
  componentWillMount() {
    this.setState({
      loading: true
    });
    getAllTransactions().then(res => {
      console.log(res);
      this.setState({
        data: res,
        loading: false
      });
    });
    console.log(this.state.data);
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    const columns = [
      { title: "Subcategory", dataIndex: "subcategory", key: "subcategory" },
      { title: "Account", dataIndex: "account", key: "account" },
      { title: "Payee", dataIndex: "payee", key: "payee" },
      { title: "In/Out", dataIndex: "inout", key: "inout" },
      { title: "Date", dateIndex: "date", key: "date" }
    ];
    const arrayData = this.state.data;
    const data = [];
    if (arrayData !== undefined) {
      for (let i = 0; i < arrayData.length; i++) {
        console.log(arrayData[i].day);
        const transaction = {
          key: i + 1,
          subcategory: arrayData[i].subcategory.name,
          account: arrayData[i].account.name,
          payee: arrayData[i].payee.name,
          inout: arrayData[i].sum,
          date: arrayData[i].day,
          delete: <Button icon={"delete"} type={"danger"} />,
          edit: "abc"
        };
        data.push(transaction);
      }
    }
    return (
      <div>
        <div className={"container centerBudget"}>
          <div>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              scroll={{ y: 460 }}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default CenterTransactions;
