import React from "react";
import "./headerTransactions.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { DatePicker } from "antd";
import moment from "moment";
import { JOINING_MONTH, JOINING_YEAR } from "../../../../constants/constant";

const { MonthPicker, RangePicker } = DatePicker;

class HeaderTransactions extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const dateFormat = "YYYY/MM/DD";
    return (
      <div>
        <div className={"container-fluid header"}>
          <div className={"div-one-header"}>
            <table className={"table-header2"}>
              <tbody>
                <tr>
                  {/*<td><Button variant="extendedFab" size={"large"}>Add transaction</Button></td>*/}
                  {/*<td><Button variant="extendedFab" size={"large"}>Define template</Button></td>*/}
                  <td>
                    <RangePicker
                      size={"large"}
                      defaultValue={[moment().subtract(30, "days"), moment()]}
                      format={dateFormat}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderTransactions;
