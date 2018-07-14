import React from 'react';
import './actionsBudget.css'
import {Button} from "antd";
import ModalCategory from "./modalCategory";
import Budget from "../budget";


class ActionsBudget extends React.Component {

    constructor() {
        super();
        this.state = {
            modalCategory: false,
            modalSubcategory: false
        }
    }

    toggleModalCategory() {
        this.setState({
            modalCategory: !this.state.modalCategory
        })
    }

    toggleModalSubcategory() {
        this.setState({
            modalSubcategory: !this.state.modalSubcategory
        })
    }

    reRender() {
        this.forceUpdate();
    }

    render() {
        return(
                <div className={"container actions"}>
                    <div className={"actions-buttons"}>
                        <span>
                            <Button type="default" icon="plus-circle-o" onClick={this.toggleModalCategory.bind(this)}>Add category</Button>
                            <Button type={"default"} icon={"plus-circle-o"} onClick={this.toggleModalSubcategory.bind(this)}>Add subcategory</Button>
                        </span>
                    </div>
                    <ModalCategory reRender={this.reRender.bind(this)} toggleModalCategory={this.toggleModalCategory.bind(this)} modal={this.state.modalCategory}/>
                </div>
        );
    }

}

export default ActionsBudget;