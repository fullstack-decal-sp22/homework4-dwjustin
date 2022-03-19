import React, { useState } from "react";
import './styles/Board.css';
import './styles/Square.css';

function calculateWinner(squares){
  const winning_line=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
  ]

  for(let i=0;i<winning_line.length;i++){
      const[idx1, idx2, idx3]=winning_line[i];
      if(squares[idx1]&&squares[idx1]===squares[idx2] && squares[idx1]===squares[idx3]){
          return squares[idx1];
      }

  }
  return null;
}

function calculateNextValue(squares){
      return squares.filter(Boolean).length%2===0?"X":"O"
}

function calculateStatus(winner, squares, nextValue){
  if(winner){
    const winnerState=`Winner : ${winner}`;
    squares.every(Boolean);
    return winnerState;
  }else{
    return `Next player: ${nextValue}`;
  }
}




function Board() {
    const [board, setBoard]=useState(Array(9).fill(null));
    
    const winner=calculateWinner(board);
    const nextValue=calculateNextValue(board);
    const status=calculateStatus(winner, board, nextValue)

    function selectSquare(square){
      if(winner|| board[square]){
        return
      }
      
      const squaresCopy=[...board]
      squaresCopy[square]=nextValue
      setBoard(squaresCopy)
    }

    function restart(){
      setBoard(Array(9).fill(null))
    }
    
    function renderSquare(i) {
      return (
      <button className="square" onClick={()=>selectSquare(i)}>
        {board[i]}
      </button>)
    }
    
    return (  
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="status">{status}</div>
          <button onClick={restart}>Restart!</button>
        </div>
    )
}

export default Board;