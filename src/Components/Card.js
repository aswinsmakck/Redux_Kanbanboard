import React from "react";
import {Link , withRouter} from 'react-router-dom';
import ModalWindow from './UI/ModalWindow'
import Button from './UI/Button'
import { RemoveCard, EditCardTitle , EditCardDescription} from '../Actions/CardActions'
import { connect } from 'react-redux'
import _ from 'lodash';

class Card extends React.Component{

    constructor(props){
       super(props);
       console.log("constructor",props);

       this.state = {
           toggleTextBox : false,
           textBoxVal : "",
           editDescription : false,
           textArea : "",
       };
    }
    static getDerivedStateFromProps(props, state){
        console.log("derived", props)
        console.log(state)
        console.log(props.card.id)
        console.log(props.match.params.cardid)
        console.log("derived validness", props.card.id === props.match.params.cardid)
        if(props.card.id === props.match.params.cardid){
            return {
                showCardModal : true,
            }
        }
        return {
            showCardModal : false,
        };
    }
    shouldComponentUpdate(nextProps, nextState){
        
            console.log("in card item comp should update", (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)));
            console.log(this.props.card.title);
            console.log(nextProps);
            console.log(nextState);
            console.log(this.props);
            console.log(this.state);
        
        return !_.isEqual(this.props.card, nextProps.card) || !_.isEqual(this.state, nextState)
    }

    component

    toggleCardNameEdit(evt){
        this.setState({toggleTextBox : true})
    }

    cardNameEdit(evt){
        this.setState({textBoxVal : evt.target.value})
    }

    saveEditedCardName(evt){
        //if(this.props.textBoxVal.trim())
        this.props.EditCardTitle(this.props.card.id, this.state.textBoxVal)
        this.setState({textBoxVal:"",toggleTextBox : false})
    }

    toggleCardDescriptionEdit(evt){
        if(this.state.editDescription){
            this.setState({editDescription : false, textArea : ""})
        }
        else{
            this.setState({editDescription : true})
        }
    }

    cardDescChange(evt){
        this.setState({textArea : evt.target.value})
    }
    
    saveEditedCardDesc(evt){
        if(this.state.textArea.trim() === "") return;
        this.props.EditCardDescription(this.props.card.id,this.state.textArea)
        this.setState({textArea : "", editDescription : false});
    }

    closeCardModal(evt){
        this.props.history.goBack();
        this.setState({
            editDescription : false,
            textArea : "",
            showCardModal : false,
        })
        
    }

    render(){
        return (
            <div className="card">
                <h4 className="card-details tempClass">
                    {
                        this.state.toggleTextBox ? 

                        <input 
                        autoFocus 
                        style={{margin: "7px 0", width:"80%"}} 
                        type="text" 
                        value={this.state.textBoxVal ? this.state.textBoxVal : ""}
                        onChange = {this.cardNameEdit.bind(this)}
                        onBlur={this.saveEditedCardName.bind(this)}
                        /> 

                        : 

                        <Link className="Link" onClick={(evt)=>this.setState({showCardModal : true})} style={{flex : "1 0 auto"}} to={{pathname : `/board/${this.props.boardId}/${this.props.card.listId}/${this.props.card.id}`}}>
                            <span>{this.props.card.title}</span>
                        </Link>
                     } 

                    {
                    this.state.toggleTextBox ?
                        <span style={{alignSelf:"center"}}>
                            <i onClick={this.saveEditedCardName.bind(this)} style={{color:"green"}} className="fas fa-check"></i>
                        </span>

                    :

                        <span>
                            <i onClick={this.toggleCardNameEdit.bind(this)} style={{fontWeight : "normal"}} className="fas fa-edit"></i>
                            <i onClick={(evt) => this.props.RemoveCard(this.props.card.id)} style={{fontWeight : "normal", marginLeft:"5px"}} className="far fa-trash-alt"></i>
                        </span>

                    }
                </h4>
                {
                    this.state.showCardModal &&
                    <ModalWindow modalHeader="Card Details" onClose={this.closeCardModal.bind(this)}>
                        <div style={{alignSelf:"center", width:"100%"}}>
                            <h1>Card - {this.props.card.title}</h1>
                            <h4>Description</h4>
                            { this.state.editDescription ?
                                <div>
                                    <textarea className="card-edit-desc" onChange={this.cardDescChange.bind(this)} value={this.state.textArea ? this.state.textArea : ""} />

                                    <div style={{display:"flex"}}>
                                        <Button styleName="add-new-board" onClick={this.saveEditedCardDesc.bind(this)} style={{margin : "10px 20px 0 0"}}> Save </Button>
                                        <span onClick={this.toggleCardDescriptionEdit.bind(this)} style={{alignSelf : "center"}} className="close-button">&times;</span>
                                    </div>
                                </div>
                                :
                                <div className="card-description" onClick={this.toggleCardDescriptionEdit.bind(this)} >{this.props.card.desc && this.props.card.desc !== "" ? this.props.card.desc : "Add detailed description..."}</div>
                            }
                        </div>
                    </ModalWindow>
                }
            </div>
            )
    }
}


const mapStateToProps = (state, ownProps) => {
  return {boardId : state.lists.byId[ownProps.card.listId].boardId}
}

export default connect(mapStateToProps, { RemoveCard, EditCardTitle, EditCardDescription, })(withRouter(Card));