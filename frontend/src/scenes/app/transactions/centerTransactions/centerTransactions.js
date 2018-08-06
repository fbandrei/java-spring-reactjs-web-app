import React from 'react';
import './centerTransactions.css'
import {Button, InputNumber, Table, message, Icon} from 'antd';
import Popover from '@material-ui/core/Popover';
import {
    deleteCategoryRequest, deleteSubcategoryRequest, getBudgetData, updateBudget, updateSubcategory,
    updateToBeBudget
} from "../../../../services/RequestAPI";
import LoadingIndicator from "../../../../components/LoadingIndicator";

class CenterTransactions extends React.Component {

    constructor(props) {
        super();

        this.state = {
            data: [],
            loading: false
        }
    }

    componentWillMount() {

    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator/>
        }
        const columns = [
            {title: 'Category', dataIndex: 'category', key: 'category'},
            {title: 'Subcategory', dataIndex: 'subcategory', key: 'subcategory'},
            {title: 'Account', dataIndex: 'account', key: 'account'},
            {title: 'Payee', dataIndex: 'payee', key: 'payee'},
            {title: 'In/Out', dataIndex: 'inout', key: 'inout'},
            {title: 'Date', dateIndex: 'date', key: 'date'},
            {title: 'Delete', dateIndex: 'delete', key: 'delete'},
            {title: 'Edit', dateIndex: 'edit', key: 'edit'}
        ];
        return(
            <div>
                <div className={"container centerBudget"}>
                    <div>
                        <Table dataSource={this.state.data}
                               columns={columns}
                               pagination={false}
                               scroll={{y: 460}}/>
                    </div>
                </div>
            </div>
        )
    }


}

export default CenterTransactions;