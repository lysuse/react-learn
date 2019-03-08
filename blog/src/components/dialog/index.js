import React from 'react'
import ReactDOM from 'react-dom'

export const DialogBox = props => {
  return (
    <div className="dialog">
      <div className="dialog-title"><h2></h2></div>
      <div className="dialog-content">

      </div>
      <div className="dialog-buttons">

      </div>
    </div>
  );
}


export const Dialog = {
  create: () => {
    let div = document.createElement('div')
    let props = {}
    document.body.appendChild(div);
    return ReactDOM.render(React.createElement(
      DialogBox,
      props
    ), div)
  }
}

export default {
  DD: 'A'
}