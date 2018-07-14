import React from 'react';
import './centerBudget.css'
import { Table, Badge, Menu, Dropdown, Icon} from 'antd';
import {getBudgetData} from "../../../../services/RequestAPI";
import LoadingIndicator from "../../../../components/LoadingIndicator";

class CenterBudget extends React.Component {

    constructor(props) {
        super();

        this.state = {
            data: [],
            loading: false,
            budget: [],
            currentTime: props.currentTime,
            modalCategory: false
        }
    }

    toggleModalAccount() {
        this.setState({
            modalCategory: !this.state.modalCategory
        })
    }

    componentWillMount() {
        this.fetchData();

    }

    // When component receive new props.
    componentWillReceiveProps(nextProps) {
        const time = nextProps.currentTime;
        console.log(time);
        console.log(this.state.currentTime);
        if (time.year !== this.state.currentTime.year ||
            time.month !== this.state.currentTime.month) {
            this.state.currentTime = time;
           this.fetchData();
        }
    }

    fetchData() {
        this.setState({
            loading: true
        });
        const currentTime = this.state.currentTime;
        const year = currentTime.year;
        const month = currentTime.month + 1;
        getBudgetData(year,month)
            .then(res => {
                this.setState({
                    data: res
                });
                let categories = this.state.data;
                let budget=[];
                const zero = 0;
                if (categories !== undefined) {
                    for(let i = 0; i < categories.length; i++) {
                        const subcategories = categories[i].subcategories;
                        let budgeted = 0,activity = 0,available = 0;
                        if (subcategories !== undefined) {
                            for(let j = 0; j < subcategories.length; j++) {
                                if (subcategories[j].budgets[zero] !== undefined) {
                                    budgeted += subcategories[j].budgets[zero].budget;
                                    activity += subcategories[j].budgets[zero].activity;
                                    available += subcategories[j].budgets[zero].availableAmount;
                                }
                            }
                        }

                        var b = {budgeted: budgeted, activity: activity, available: available};
                        budget.push(b);
                    }
                }

                console.log(budget);
                this.setState({
                    budget: budget,
                    loading: false
                });
            })
    }


    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }
        const columns = [
            {title: 'Category', dataIndex: 'category', key: 'category', width: 150},
            {title: 'Budget', dataIndex: 'budget', key: 'budget', width: 150},
            {title: 'Activity', dataIndex: 'activity', key: 'activity', width: 150},
            {title: 'Available', dataIndex: 'available', key: 'available', width: 150},
        ];
        const arrayData = this.state.data;
        const data = [];
        if (arrayData !== undefined) {
            for(let i = 0; i < arrayData.length; i++) {
                const category = {key: i+1, category: arrayData[i].name,
                    budget: this.state.budget[i].budgeted, activity: this.state.budget[i].activity,
                    available: this.state.budget[i].available};
                data.push(category);
            }
        }

        const expandedRowRender = (record) => {
            const category = this.state.data[record.key - 1];
            const zero = 0;
            const data = [];
            if (category !== undefined && category. subcategories !== undefined) {
                for(let i = 0; i < category.subcategories.length; i++) {
                    if (category.subcategories[i].budgets[zero] !== undefined) {
                        const m = {key: i, category: category.subcategories[i].name,
                            budget: category.subcategories[i].budgets[zero].budget,
                            activity: category.subcategories[i].budgets[zero].activity,
                            available: category.subcategories[i].budgets[zero].availableAmount};
                        data.push(m);
                    }
                }
            }

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