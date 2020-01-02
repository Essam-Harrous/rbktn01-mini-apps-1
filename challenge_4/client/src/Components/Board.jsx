import React from 'react';
import Round from './Round.jsx'

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [
        Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)
      ],
      player: 'red',
      currentComponent: {}
    }
  }

  handleClick(x) {
    console.log(x)
    let curX;
    let curY;
    let currentPlayer = this.state.player;
    let col = this.state.board;
    for(var i = col.length - 1; i >= 0; i--){
      if(col[i][x] == undefined) {
        col[i][x] = currentPlayer;
        curY = i;
        curX = x;
        currentPlayer = currentPlayer == 'red'? 'yellow': 'red'
        break;
      }
      else if(i == 0) {
        alert('chose another place')
        return;
      } 
    }

    var checkHo = this.checkHorizontall(curY);
    var checkVe = this.checkVertical(curX);
    var checkMajD = this.checkMajDiagnol(curY, curX);
    var checkMinD = this.checkMinDiagnol(curY, curX)
    console.log(checkMinD)
    if(checkHo || checkVe || checkMajD || checkMinD) alert(`${this.state.player} is winner`)

    this.setState((prevState) => {
      return ({
        board: [...col],
        player: currentPlayer,
        currentComponent: {'x': curX, 'y': curY}
      })
    })
  }

  render() {
    let roundComponents = [];

    let board = this.state.board;
    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[i].length; j++) {
        if(board[i][j] == undefined) {
          roundComponents.push(<Round handleClick={(x) => this.handleClick(x)} color="white" y={i} x={j}/>)
        } else {
          roundComponents.push(<Round handleClick={(x) => this.handleClick(x)} color={board[i][j]} y={i} x={j}/>)
        }

      }
    }

    let boardStyle = {
      margin: '0 auto',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      backgroundColor: '#7eafee',
      width: '500px'
    }
    return(
      <div style={boardStyle}>
        {roundComponents}
      </div>
    )
  }

  checkHorizontall(row) {
    let currentPlayer = this.state.player;
    let board = this.state.board;
    let streak = 0;
    for(var col = 0; col < board[row].length; col++) {
      if(board[row][col] == currentPlayer) {
        streak++;
        if(streak == 4) {
          return true;
        }
      }else {
        streak = 0;
      }
    }
    return false;
  }


  checkVertical(col) {
    let currentPlayer = this.state.player;
    let board = this.state.board;
    let streak = 0;
    for(var row = 0; row < board.length; row++) {
      if(board[row][col] == currentPlayer) {
        streak++;
        if(streak == 4) {
          return true;
        }
      }else {
        streak = 0;
      }
    }
    return false;
  }

  checkMajDiagnol() {
    let result = (row, col) => {
      let currentPlayer = this.state.player;
      let board = this.state.board;
      let streak = 0;
      let rowA = row;
      let colA = col;
      while(rowA < 6 && colA < 7) {
        if(board[rowA][colA] == currentPlayer) {
          streak++;
          if(streak == 4) {
            return true;
          }
        }else {
          streak = 0;
        }
        rowA++;
        colA++;
      }
      if( col == 3) return false; 
      else if(row == 0) return result(row, col + 1)
      else return result(row - 1, col)
    }
    return result(2, 0);
  }


  checkMinDiagnol() {
    let result = (row, col) => {
      let currentPlayer = this.state.player;
      let board = this.state.board;
      let streak = 0;
      let rowA = row;
      let colA = col;
      while(rowA < 6 && colA >= 0) {
        if(board[rowA][colA] == currentPlayer) {
          streak++;
          if(streak == 4) {
            return true;
          }
        }else {
          streak = 0;
        }
        rowA++;
        colA--;
      }
      if( col == 3) return false; 
      else if(row == 0) return result(row, col - 1)
      else return result(row - 1, col)
    }
    return result(2, 6);
    // let currentPlayer = this.state.player;
    // let board = this.state.board;
    // let streak = 0;
    // while(row < 6 && col >= 0) {
    //   console.log(row, col)
    //   if(board[row][col] == currentPlayer) {
    //     streak++;
    //     if(streak == 4) {
    //       return true;
    //     }
    //   }else {
    //     streak = 0;
    //   }
    //   row++;
    //   col--;
    // }
    // return false;
  }


}


export default Board;