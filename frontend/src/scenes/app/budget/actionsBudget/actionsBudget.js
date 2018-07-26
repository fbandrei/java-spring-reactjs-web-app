import React from 'react';
import './actionsBudget.css'
import {Button} from "antd";
import ModalCategory from "./modalCategory";
import Budget from "../budget";
import ModalSubcategory from "./modalSubcategory";


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
        this.props.setNewCategory();
    }

    reRenderSubcategory() {
        this.props.setNewSubcategory();
    }

    render() {
        return(
                <div className={"container actions"}>
                    <div className={"actions-buttons"}>
                        <span>
                            <Button type="default" icon="plus-circle-o" onClick={this.toggleModalCategory.bind(this)}>Add category</Button>
                            <Button className={"actions-buttons2"} type={"default"} icon={"plus-circle-o"} onClick={this.toggleModalSubcategory.bind(this)}>Add subcategory</Button>
                        </span>
                    </div>
                    <ModalCategory reRender={this.reRender.bind(this)} toggleModalCategory={this.toggleModalCategory.bind(this)} modal={this.state.modalCategory}/>
                    <ModalSubcategory reRenderSubcategory={this.reRenderSubcategory.bind(this)} toggleModalSubcategory={this.toggleModalSubcategory.bind(this)} modal={this.state.modalSubcategory}/>

                </div>
        );
    }

}

export default ActionsBudget;