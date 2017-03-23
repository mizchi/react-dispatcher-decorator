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
    return <div>
      <button onClick={_e => this.context.dispatch('foo')}>Emitter style dispatch</button>
      <hr/>
      <button onClick={_e => this.context.dispatch({type: 'bar'})}>FSA style dispatch</button>
      <hr/>
    </div>
  }
}

@subscriber((self, subscribe) => {
  // Emitter style
  subscribe('foo', () => {
    console.log('foo received on', self);
    self.forceUpdate();
  });

  // FSA style
  subscribe(action => {
    switch (action.type) {
      case 'bar':
        console.log('bar received on', self);
        self.forceUpdate();
    }
  });
})
class App extends React.Component {
  render() {
    return <Child/>
  }
}

ReactDOM.render(<App/>, el)
