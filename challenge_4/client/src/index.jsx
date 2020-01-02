import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Components/Board.jsx';

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>connect 4</h1>
        <div>
          <Board/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))