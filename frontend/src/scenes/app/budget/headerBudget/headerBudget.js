import React from 'react';
import './headerBudget.css'
import {DatePicker, Button } from 'antd';
import moment from 'moment';

const {MonthPicker} = DatePicker;

function onChange(date, dateString) {
    console.log(date, dateString);
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
                                    <MonthPicker onChange={onChange} placeholder={"Select month"}
                                                 defaultValue={moment()} size={"large"} style={{color: 'red'}}
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