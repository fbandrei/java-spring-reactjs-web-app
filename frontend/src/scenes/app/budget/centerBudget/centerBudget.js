import React from 'react';
import './centerBudget.css'
import { Table, Badge, Menu, Dropdown, Icon} from 'antd';
import {getBudgetData} from "../../../../services/RequestAPI";

class CenterBudget extends React.Component {

    constructor() {
        super();

        this.state = {
            data: [],
            loading: false
        }
    }

    componentWillMount() {
        // this.fetchData()
    }

    fetchData() {
        this.setState({
            loading: true
        });
        getBudgetData()
            .then(res => {
                this.setState({
                    data: res,
                    loading: false
                })
            })
    }


    render() {
        const columns = [
            {title: 'Category', dataIndex: 'category', key: 'category', width: 150},
            {title: 'Budget', dataIndex: 'budget', key: 'budget', width: 150},
            {title: 'Activity', dataIndex: 'activity', key: 'activity', width: 150},
            {title: 'Available', dataIndex: 'available', key: 'available', width: 150},
            {title: 'Goals', dataIndex: 'goals', key: 'goals'}
        ];
        const data = [
            { key: 1, category: 'Utilities', budget: 32, activity: 14, available: 18},
            { key: 2, category: 'Fun', budget: 42, activity: 2, available: 40},
            { key: 3, category: 'Fixed', budget: 32, activity: 2, available: 30}
        ];

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