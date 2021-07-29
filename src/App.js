import './App.css';
import React from 'react';
import HomePage from './Components/HomePage';
import {Switch, Route} from  'react-router-dom';
import BoardLists from './Components/BoardLists';
import Header from './Components/Header';
import {connect} from 'react-redux'


class App extends React.Component {

  renderBoardLists (props){
    console.log("In APP",props);
    let board = this.props.boards.byId[props.match.params.id] //this.props.boards.find((board) => board.id === props.match.params.id)

    console.log("board",board)
    if(!board) return <h1>Invalid Board !!!</h1>

    return (
      <BoardLists board={board} />

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
  console.log("In App map to state props", state)
  return {boards : state.boards}
}

export default connect(mapStateToProps)(App);