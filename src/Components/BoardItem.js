import React from 'react';
import Column from './UI/Column'
import Card from './Card'
import { connect } from 'react-redux'
import {EditListName} from '../Actions/ListActions'
import { AddCard } from '../Actions/CardActions'
import _,{pickBy} from 'lodash';

class BoardItem extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            isActive : false,
            textBoxVal : "",
            toggleTextBox : false,
            listNameTextBoxVal : "",
        }
    }

    componentDidUpdate(prevProps, prevState){
        console.log("------in board item comp did update----------")
        console.log(prevProps)
        console.log(this.props)
        console.log(_.isEqual(this.state, prevState))
        if(!_.isEqual(this.props.cards, prevProps.cards)){
            let localDB = JSON.parse(localStorage.getItem("state_kanbanboard") || "{}");
            console.log(localDB);

            let ModifiedLocalDB = { ...localDB, cards : this.props.cards };
            console.log(ModifiedLocalDB);
            localStorage.setItem("state_kanbanboard",JSON.stringify(ModifiedLocalDB))
            console.log(JSON.parse(localStorage.getItem("state_kanbanboard") || "{}"))
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("in board item comp should update", (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)));
        console.log(nextProps);
        console.log(nextState);
        console.log(this.props);
        console.log("list name",this.props.list.name);
        console.log(this.state);
        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
    }

    showAddNewCardForm(evt){
        this.setState({isActive : true});
    }

    changeCardTextBoxValHandler(evt){
        this.setState({textBoxVal : evt.target.value});
    }

    closeForm(evt){
        this.setState({textBoxVal : "",isActive : false});
    }

    addNewCard(evt){
        if(this.state.textBoxVal.trim() === "") return;
        this.props.AddCard(this.props.list.id,this.state.textBoxVal)
        this.setState({
            isActive : false,
            textBoxVal : "",
        })
    }

    listNameChange(evt) {
        this.setState({listNameTextBoxVal : evt.target.value})
    }

    toggleListNameEdit(evt){
        
        this.setState({toggleTextBox : true})
    }

    saveEditedListName(evt){
        //if(this.state.listNameTextBoxVal.trim() === "") return;
        this.props.EditListName(this.props.list.id, this.state.listNameTextBoxVal)
        this.setState({toggleTextBox : false, listNameTextBoxVal : ""})
    }

    render(){
    let cards = Object.values(this.props.cards.byId);
    let cardElements
    if(cards){
        cardElements = cards.map((card, index)=> {
            
            return (
                <Card
                    card={card} 
                    key={index} 
                />
            );

        })
    }
    console.log("card elems",cardElements)
    return (
        <Column>
            <div className="board-item">
                <div className="board-item-header" style={{textAlign : "center", border : "1px solid grey"}}>
                    { this.state.toggleTextBox ? 
                        <input 
                            autoFocus 
                            style={{margin: "7px 0"}} 
                            type="text" 
                            value={this.state.listNameTextBoxVal ? this.state.listNameTextBoxVal : "" } 
                            onChange={this.listNameChange.bind(this)} 
                            onBlur={this.saveEditedListName.bind(this)} /> 
                        :
                        <h3 style={{margin : "5px 0"}} onClick={this.toggleListNameEdit.bind(this)}>{this.props.list.name}</h3>}
                </div>
                <div className="cards" style={{border : "1px solid grey", borderTop:0,padding : "10px 5px"}}>
                    {
                        cardElements
                    }
                    {   
                        this.state.isActive ? 
                            <div style={{marginTop : "8px"}}>
                                <input type="text" value={this.state.textBoxVal ? this.state.textBoxVal : "" } onChange={this.changeCardTextBoxValHandler.bind(this)} style={{padding : "5px 0"}} /> 
                                <button className="add-new-board" onClick={this.addNewCard.bind(this)} style={{marginTop : "10px", padding : "6px 20px",backgroundColor : "black"}}>Add</button>
                                <span className="close-button" onClick={this.closeForm.bind(this)}>&times;</span>
                            </div>

                            :
                            
                            <button className="Add-Card" style={{marginTop : "8px"}} onClick={this.showAddNewCardForm.bind(this)}>Add Card</button> 
                    }
                </div>
            </div>
        </Column>
    )    
}
}

const mapStateToProps = (state, ownProps) => {
    let cards = _.pickBy(state.cards.byId, (value, key)=> value.listId === ownProps.list.id) //Object.values(state.cards.byId).filter(card => card.listId === ownProps.list.id);
    return { cards : {byId : {...cards} } };
}

export default connect(mapStateToProps, {EditListName, AddCard })(BoardItem);