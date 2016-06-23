import ReactDOM from "react-dom";
import React from "react";
const el = document.querySelector(".main");
import {dispatcher, subscriber} from "../../index";

@dispatcher
class Child extends React.Component {
  onClick() {
    this.context.dispatch('foo');
  }

  render() {
    return <button onClick={this.onClick.bind(this)}>hello</button>
  }
}

@subscriber((self, subscribe) => {
  subscribe('foo', () => {
    console.log('foo received on', self);
    self.forceUpdate();
  });
})
class App extends React.Component {
  render() {
    return <Child/>
  }
}

ReactDOM.render(<App/>, el)
