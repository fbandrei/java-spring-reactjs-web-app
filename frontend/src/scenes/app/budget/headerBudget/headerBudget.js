import React from 'react';
import './headerBudget.css'
import {DatePicker, Button } from 'antd';
import moment from 'moment';
import {JOINING_MONTH, JOINING_YEAR} from "../../../../constants/constant";

const {MonthPicker} = DatePicker;

function onChange(date) {
    const currentTime = {
        year: date.year(),
        month: date.month()
    };
    this.props.setCurrentTime(currentTime);
}

function disabledDate(current) {

    const joiningYear = localStorage.getItem(JOINING_YEAR);
    const joiningMonth = localStorage.getItem(JOINING_MONTH);

    const currentYear = current.get('year');
    const currentMonth = current.get('month');

    console.log(joiningYear, joiningMonth, currentYear, currentMonth);
    return currentYear <= joiningYear && currentMonth < joiningMonth;

}

class HeaderBudget extends React.Component {



    render() {
        return(
            <div>
                <div className={"container-fluid header"}>
                    <div className={"div-one-header"}>
                        <table className={"table-header"}>
                            <tr>
                                <td>
                                    <MonthPicker onChange={onChange.bind(this)} placeholder={"Select month"}
                                                 defaultValue={moment()} disabledDate={disabledDate} size={"large"}
                                                 />
                                </td>
                                <td><Button size={"large"}>1025 RON</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default HeaderBudget;