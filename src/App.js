import './App.css';
import React from 'react';
import HomePage from './Components/HomePage';
import {Switch, Route} from  'react-router-dom';
import BoardLists from './Components/BoardLists';
import Header from './Components/Header';
import _ from 'lodash';
import {connect} from 'react-redux'

class App extends React.Component {

    componentDidUpdate(prevProps, prevState){
        console.log("------in APP comp did update----------")
        console.log(prevProps)
        console.log(prevState)
        console.log(this.state)
        console.log(_.isEqual(this.state, prevState))
        if(!_.isEqual(this.props.boards, prevProps.boards)){
            let localDB = JSON.parse(localStorage.getItem("boards") || "[]");
            console.log(localDB);

            let ModifiedLocalDB = this.props.boards;
            console.log(ModifiedLocalDB);
            localStorage.setItem("boards",JSON.stringify(ModifiedLocalDB))
            console.log(JSON.parse(localStorage.getItem("boards") || "[]"))
        }
    }


  renderBoardLists (props){
    console.log("In APP",props);
    let board = this.props.boards.find((board) => board.id === props.match.params.id)

    console.log("board",board)
    if(!board) return <h1>Invalid Board !!!</h1>

    let showCardModalPopup = false;
    let card;
    let list;
    if(props.match.params.listid && props.match.params.cardid){
        list = board.lists.find((list) => list.id === props.match.params.listid)
        card = list.cards.find((card) => card.id === props.match.params.cardid)
        console.log("card", card)
        if(card){
            showCardModalPopup = true;
        }
    }

    return (
      <BoardLists
        showCardModalPopup = {showCardModalPopup}
        card = {card}
        match={props.match}
        board={board}
        list={list}
        />

    )
  }
  
  render (){
    return(
      //conditional rendering Login or Homepage
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/board/:id/:listid?/:cardid?" render={this.renderBoardLists.bind(this)} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {boards : state.boards}
}

export default connect(mapStateToProps)(App);