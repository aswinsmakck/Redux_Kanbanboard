import Section from './UI/Section'
import Button from './UI/Button'
import React from 'react';
import ModalWindow from './UI/ModalWindow'
import BoardItem from './BoardItem'
import Row from './UI/Row'
import Column from './UI/Column'
import {connect} from 'react-redux'
import {AddList} from '../Actions/ListActions'
import _,{pickBy} from 'lodash';


class BoardLists extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Modal : {
                show : false,
            },
            boardItemTextBoxVal : "",
        };
    }

    shouldComponentUpdate(nextProps, nextState){

        return !_.isEqual(this.props.lists, nextProps.lists) || !_.isEqual(this.state, nextState)
    }

    modalCloseHandler(){
        console.log(this);
        this.setState({...this.state, boardItemTextBoxVal:"", Modal : { show : false}});
    }

    showModal(evt) {
        let requiredStateModal = true
        this.setState({...this.state, Modal : {...this.state.Modal, show : requiredStateModal}});
    }

    changeboardItemTextBoxValHandler(evt){
        let textBoxVal = evt.target.value;
        this.setState({...this.state, boardItemTextBoxVal : textBoxVal})
    }

    addBoardItemHandler(evt){
        if(this.state.boardItemTextBoxVal.trim() === "") return;
        this.props.AddList(this.props.board.id,this.state.boardItemTextBoxVal);
        this.setState({
            boardItemTextBoxVal : "",
            Modal : { show : false},
        })
    }

    renderExistingLists (board){
        console.log(board)
        let lists = Object.values(this.props.lists.byId)
        console.log("lists",lists)


        return ( 
            ( typeof lists != undefined && lists != null && lists.length  > 0)  
                
                        ?

                        <Row rowInnerStyle={{flexWrap:"nowrap",overflowX:"auto"}}>
                            
                            {
                                lists.map( (list, index) => {
                                    return (
                                        <BoardItem                                       
                                            key={index} 
                                            list={list}
                                        />
                                    )
                                    
                                })
                            }
                            
                        </Row>
                        
                        :

                        <div>
                            <h1>No Lists !!!!</h1> 
                        </div>
        )
    }

    render(){
        if(!this.props.board) return <h1>Invalid Board !!!</h1>
        let Modal = this.state.Modal
        console.log("In lists",this.props)
        return (
            <Section>
                <Row>
                    <Column>
                        {this.renderExistingLists(this.props.board)}
                        {
                            Modal.show && 
                            <ModalWindow modalHeader="Add New List" onClose={this.modalCloseHandler.bind(this)}>
                                <div style={{alignSelf:"center"}}>
                                    <input type="text" className="textbox" value={this.state.boardItemTextBoxVal} onChange={this.changeboardItemTextBoxValHandler.bind(this)} />
                                    <Button styleName="add-new-board" onClick={this.addBoardItemHandler.bind(this)} style={{ margin: "0 20px"}}> Add </Button>
                                </div>
                            </ModalWindow>
                        }
                        <Button styleName="add-new-board" onClick={this.showModal.bind(this)}>
                            Add New List
                        </Button>
                    </Column>
                </Row>
            </Section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    console.log(ownProps)
    let board = state.boards.byId[ownProps.match.params.id] //this.props.boards.find((board) => board.id === props.match.params.id)

    console.log(state);
    let lists = _.pickBy(state.lists.byId, (value, key)=> {
        console.log("key",key)
        console.log(value)
        return value.boardId === board.id
    })
    console.log("filtered lists", lists)
    return { lists : { byId : {...lists} }, board }
}

export default connect(mapStateToProps , {AddList} )(BoardLists);