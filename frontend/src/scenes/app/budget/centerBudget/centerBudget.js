import React from 'react';
import './centerBudget.css'
import { Table, Badge, Menu, Dropdown, Icon} from 'antd';
import {getBudgetData} from "../../../../services/RequestAPI";

class CenterBudget extends React.Component {

    constructor() {
        super();

        this.state = {
            data: [],
            loading: false,
            budget: []
        }
    }

    componentWillMount() {
        this.fetchData();

    }

    fetchData() {
        this.setState({
            loading: true
        });
        var currentTime = new Date();
        var year = currentTime.getFullYear();
        var month = currentTime.getMonth()+1;
        getBudgetData(year,month)
            .then(res => {
                this.setState({
                    data: res,
                    loading: false
                });
                var categories = this.state.data;
                var budget=[];
                const zero = 0;
                for(var i = 0; i < categories.length; i++) {
                    var subcategories = categories[i].subcategories;
                    var budgeted = 0,activity = 0,available = 0;
                    for(var j = 0; j < subcategories.length; j++) {
                        budgeted += subcategories[j].budgets[zero].budget;
                        activity += subcategories[j].budgets[zero].activity;
                        available += subcategories[j].budgets[zero].availableAmount;
                    }
                    var b = {budgeted: budgeted, activity: activity, available: available};
                    console.log(b);
                    budget.push(b);
                }
                this.setState({
                    budget: budget
                });
            })
    }


    render() {
        const columns = [
            {title: 'Category', dataIndex: 'category', key: 'category', width: 150},
            {title: 'Budget', dataIndex: 'budget', key: 'budget', width: 150},
            {title: 'Activity', dataIndex: 'activity', key: 'activity', width: 150},
            {title: 'Available', dataIndex: 'available', key: 'available', width: 150},
        ];
        var arrayData = this.state.data;
        const data = [];
        console.log(this.state.budget);
        for(var i = 0; i < arrayData.length; i++) {
            const category = {key: arrayData[i].categoryId, category: arrayData[i].name,
                budget: this.state.budget[i].budgeted, activity: this.state.budget[i].activity,
                available: this.state.budget[i].available};
                data.push(category);
        }


        const expandedRowRender = () => {
            const data = [
                { key: 1, category: 'Utilities', budget: 32, activity: 14, available: 18},
                { key: 2, category: 'Fun', budget: 42, activity: 2, available: 40},
                { key: 3, category: 'Fixed', budget: 32, activity: 2, available: 30}
            ];
            return (
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    showHeader={false}
                />
            );
        };
        const s = ["1", "2"];
        return(

            <div>
                <div className={"container centerBudget"}>
                    <div>
                        <Table dataSource={data}
                               columns={columns}
                               className={"centerTable"}
                               pagination={false}
                               expandedRowRender={expandedRowRender}
                               defaultExpandAllRows={true}
                               scroll={{y: 460}}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default CenterBudget;