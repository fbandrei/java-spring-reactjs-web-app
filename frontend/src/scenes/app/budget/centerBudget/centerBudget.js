import React from 'react';
import './centerBudget.css'
import {Button, InputNumber, Table, message, Icon} from 'antd';
import Popover from '@material-ui/core/Popover';
import {
    deleteCategoryRequest, deleteSubcategoryRequest, getBudgetData, updateBudget, updateSubcategory,
    updateToBeBudget
} from "../../../../services/RequestAPI";
import LoadingIndicator from "../../../../components/LoadingIndicator";

class CenterBudget extends React.Component {

    constructor(props) {
        super();

        this.state = {
            data: [],
            loading: false,
            budget: [],
            currentTime: props.currentTime,
            modalCategory: false,
            currentId: '',
            currentInputValue: '',
            popoverDeleteCategory: false,
            idForDeleteCategory: '',
            popoverDeleteSubcategory: false,
            idForDeleteSubcategory: ''
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
        if (time.year !== this.state.currentTime.year ||
            time.month !== this.state.currentTime.month) {
            this.state.currentTime = time;
           this.fetchData();
        }
        if (nextProps.newCategory === true || nextProps.newSubcategory === true) {
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

                        const b = {budgeted: budgeted, activity: activity, available: available};
                        budget.push(b);
                    }
                }

                this.setState({
                    budget: budget,
                    loading: false
                });
            })
    }

    submitBudget() {
        const input = document.getElementById(this.state.currentId);
        const id = this.state.currentId;
        const data = this.state.data;
        if (input.value !== this.state.currentInputValue) {
            console.log(id);
            let subcategory = [];
            if (id[2] === 's') {
                if (id[4] !== undefined) {
                    subcategory = data[id[1]].subcategories[id[3] + '' + id[4]];
                    let budget = subcategory.budgets[0];
                    updateToBeBudget(Number(this.props.toBeBudget) - Number(input.value) + Number(budget.budget))
                        .then(
                            this.props.setToBeBudget(Number(this.props.toBeBudget) - Number(input.value) + Number(budget.budget))
                        );
                    const actualBudget = budget.budget;
                    budget.budget = input.value;
                    budget.availableAmount = Number(budget.availableAmount) + Number(budget.budget) - Number(actualBudget) - Number(budget.activity);
                    subcategory.budgets[0] = budget;
                    updateBudget(subcategory)
                        .then(
                            this.setState({
                                data: data
                            })
                        );
                } else {
                    subcategory = data[id[1]].subcategories[id[3]];
                    let budget = subcategory.budgets[0];
                    updateToBeBudget(Number(this.props.toBeBudget) - Number(input.value) + Number(budget.budget))
                        .then(
                            this.props.setToBeBudget(Number(this.props.toBeBudget) - Number(input.value) + Number(budget.budget))
                        );
                    const actualBudget = budget.budget;
                    budget.budget = input.value;
                    budget.availableAmount = Number(budget.availableAmount) + Number(budget.budget) - Number(actualBudget) - Number(budget.activity);
                    subcategory.budgets[0] = budget;
                    updateBudget(subcategory)
                        .then(
                            this.setState({
                                data: data
                            })
                        );
                }
            } else {
                if (id[5] !== undefined) {


                    subcategory = data[id[1] + '' + id[2]].subcategories[id[4] + '' + id[5]];
                    let budget = subcategory.budgets[0];
                    updateToBeBudget(Number(this.props.toBeBudget) - Number(input.value) + Number(budget.budget))
                        .then(
                            this.props.setToBeBudget(Number(this.props.toBeBudget) - Number(input.value) + Number(budget.budget))
                        );
                    const actualBudget = budget.budget;
                    budget.budget = input.value;
                    budget.availableAmount = Number(budget.availableAmount) + Number(budget.budget) - Number(actualBudget) - Number(budget.activity);
                    subcategory.budgets[0] = budget;
                    updateBudget(subcategory)
                        .then(
                            this.setState({
                                data: data
                            })
                        );

                } else {
                    subcategory = data[id[1] + '' + id[2]].subcategories[id[4]];
                    let budget = subcategory.budgets[0];
                    updateToBeBudget(Number(this.props.toBeBudget) - Number(input.value) + Number(budget.budget))
                        .then(
                            this.props.setToBeBudget(Number(this.props.toBeBudget) - Number(input.value) + Number(budget.budget))
                        );
                    const actualBudget = budget.budget;
                    budget.budget = input.value;
                    budget.availableAmount = Number(budget.availableAmount) + Number(budget.budget) - Number(actualBudget) - Number(budget.activity);
                    subcategory.budgets[0] = budget;
                    updateBudget(subcategory)
                        .then(
                            this.setState({
                                data: data
                            })
                        );
                }
            }
        }
    }

    focusElement() {
        this.setState({
            currentId: document.activeElement.id,
            currentInputValue: document.getElementById(document.activeElement.id).value
        });
    }

    hideDeleteCategoryPopover = () => {
        this.setState({
            popoverDeleteCategory: false
        });
    };

    hideDeleteSubcategoryPopover = () => {
        this.setState({
            popoverDeleteSubcategory: false
        });
    };

    deleteCategory() {
        const categoryIndex = this.state.idForDeleteCategory;
        const category = this.state.data[categoryIndex];
        deleteCategoryRequest(category)
            .then(res => {
                message.success("Category successfully deleted");
                this.fetchData();
            });
        this.setState({
            popoverDeleteCategory: false
        })
    }

    deleteSubcategory() {
        const id = this.state.idForDeleteSubcategory;
        console.log(id);
        const subcategory = this.state.data[id[0]].subcategories[id[2]];
        deleteSubcategoryRequest(subcategory)
            .then(res => {
                message.success("Subcategory successfully deleted");
                this.fetchData();
            });
        this.setState({
            popoverDeleteSubcategory: false
        });
    }

    handleVisibleChangeCategory = (popoverDeleteCategory) => {
        this.setState({ popoverDeleteCategory });
        this.setState({
            idForDeleteCategory: document.activeElement.id
        })
    };

    handleVisibleChangeSubcategory = (popoverDeleteSubcategory) => {
        this.setState({ popoverDeleteSubcategory });
        this.setState({
            idForDeleteSubcategory: document.activeElement.id
        })
    };

    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }
        const columns = [
            {title: 'Category', dataIndex: 'category', key: 'category', width: 150},
            {title: 'Budget', dataIndex: 'budget', key: 'budget', width: 150},
            {title: 'Activity', dataIndex: 'activity', key: 'activity', width: 150},
            {title: 'Available', dataIndex: 'available', key: 'available', width: 150},
            {title: 'Delete', dataIndex:'delete', key: 'delete', width: 60},
            {title: 'Edit', dataIndex:'edit', key: 'edit', width: 150}
        ];
        const arrayData = this.state.data;
        const data = [];
        if (arrayData !== undefined) {
            for(let i = 0; i < arrayData.length; i++) {
                const category = {key: i+1, category: arrayData[i].name,
                    budget: this.state.budget[i].budgeted, activity: this.state.budget[i].activity,
                    available: this.state.budget[i].available,
                    delete: <div>
                        <Button icon={"delete"} type={"danger"} onClick={this.handleVisibleChangeCategory} id={i + ''}/>
                        <Popover id={'' + i}
                            open={Boolean(this.state.popoverDeleteCategory)}
                            onClose={this.hideDeleteCategoryPopover}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div>
                                <span className={"deleteCategoryPopover"}>
                                    <Icon type={"exclamation-circle"}/>
                                    <span> <b>Are you sure you want to delete this category?</b> </span>
                                </span>
                                <hr/>
                                <span>
                                    <Button onClick={this.hideDeleteCategoryPopover} className={"deleteCategoryPopoverNoButton"}>No</Button>
                                    <Button onClick={this.deleteCategory.bind(this)} type={"danger"} className={"deleteCategoryPopoverYesButton"}>Yes </Button>
                                </span>
                            </div>
                        </Popover>
                    </div>,
                    edit: <Button icon={"edit"}/>};
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
                        const id = 'c' + (record.key - 1) + 's' + i;
                        const id2 = (record.key - 1) + 's' + i;
                        const m = {key: i, category: category.subcategories[i].name,
                            budget: <InputNumber defaultValue={category.subcategories[i].budgets[zero].budget}
                                min={0} max={9999999} step={0.25} size={"small"} onBlur={this.submitBudget.bind(this)}
                                                 onFocus={this.focusElement.bind(this)} id={id}/>,
                            activity: category.subcategories[i].budgets[zero].activity,
                            available: <Button size={"small"}>{category.subcategories[i].budgets[zero].availableAmount}</Button>,
                            delete: <div>
                                <Button icon={"delete"} type={"danger"} onClick={this.handleVisibleChangeSubcategory} id={id2}/>
                                <Popover id={'' + i}
                                         open={Boolean(this.state.popoverDeleteSubcategory)}
                                         onClose={this.hideDeleteSubcategoryPopover}
                                         anchorOrigin={{
                                             vertical: 'top',
                                             horizontal: 'center',
                                         }}
                                         transformOrigin={{
                                             vertical: 'top',
                                             horizontal: 'center',
                                         }}
                                >
                                    <div>
                                <span className={"deleteCategoryPopover"}>
                                    <Icon type={"exclamation-circle"}/>
                                    <span> <b>Are you sure you want to delete this subcategory?</b> </span>
                                </span>
                                        <hr/>
                                        <span>
                                    <Button onClick={this.hideDeleteSubcategoryPopover} className={"deleteCategoryPopoverNoButton"}>No</Button>
                                    <Button onClick={this.deleteSubcategory.bind(this)} type={"danger"} className={"deleteCategoryPopoverYesButton"}>Yes </Button>
                                </span>
                                    </div>
                                </Popover>
                            </div>,
                            edit: <Button icon={"edit"}/>};
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
                    onRow={(record) => {
                        return {
                            onClick: () => {

                            }
                        }
                    }}
                />
            );
        };
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