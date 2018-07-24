import React from 'react';
import './headerBudget.css'
import {DatePicker, Button } from 'antd';
import moment from 'moment';
import {JOINING_MONTH, JOINING_YEAR} from "../../../../constants/constant";
import {getToBeBudget} from "../../../../services/RequestAPI";

const {MonthPicker} = DatePicker;

function onChange(date) {
    let currentTime = null;
    if (date === null) {
        currentTime = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1
        };
    } else {
        currentTime = {
            year: date.year(),
            month: date.month()
        };
    }

    this.props.setCurrentTime(currentTime);
}

function disabledDate(current) {

    const joiningYear = localStorage.getItem(JOINING_YEAR);
    const joiningMonth = localStorage.getItem(JOINING_MONTH);

    const selectedYear = current.get('year');
    const selectedMonth = current.get('month');

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    console.log(joiningYear, joiningMonth, selectedYear, selectedMonth);
    if (selectedYear < joiningYear) {
        return true;
    } else if (selectedYear == joiningYear) {
        console.log("here");
        return selectedMonth + 1 < joiningMonth;
    }

    if (currentMonth === 0) {
        currentMonth = 11;
    } else {
        currentYear += 1;
        currentMonth -= 1;
    }

    if (selectedYear > currentYear) {
        return true;
    } else if (selectedYear === currentYear && selectedMonth > currentMonth) {
        return true;
    }

    return false;
}

class HeaderBudget extends React.Component {

    constructor() {
        super();
        this.state = {
            toBeBudget: ''
        }
    }

    componentWillMount() {
        getToBeBudget()
            .then(res => {
                this.setState({
                    toBeBudget: res
                });
                this.props.setToBeBudget(res);
            })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.toBeBudget !== this.state.toBeBudget) {
            this.setState({
                toBeBudget: newProps.toBeBudget
            })
        }
        console.log(newProps.toBeBudget);
    }

    render() {
        console.log("header rendering");
        return(
            <div>
                <div className={"container-fluid header"}>
                    <div className={"div-one-header"}>
                        <table className={"table-header"}>
                            <tbody>
                                <tr>
                                    <td>
                                        <MonthPicker onChange={onChange.bind(this)} placeholder={"Select month"}
                                                     defaultValue={moment()} disabledDate={disabledDate} size={"large"}
                                        />
                                    </td>
                                    <td><Button className={"button-header"}>{this.state.toBeBudget}</Button></td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default HeaderBudget;