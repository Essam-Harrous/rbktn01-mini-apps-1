import React from 'react';

class Round extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let roundStyle = {
      margin: '0 auto',
      borderRadius: '50%',
      width: '15px',
      padding: '15px 8px',
      margin: '20px',
      backgroundColor: this.props.color,
      color: 'white'
    }
    return(
      <div onClick={()=> this.props.handleClick(this.props.x, this.props.y)} id={this.props.id} style={roundStyle}>
      </div>
    )
  }
}

export default Round