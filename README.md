# react-dispatcher-decorator

```
npm install react-dispatcher-decorator --save
```

## Concept

dispatch/subscribe by background event-emitter given by React context feature.

## Example

```js
import React from "react";
import {dispatcher, subscriber} from "react-dispatcher-decorator";

@dispatcher
class Child extends React.Component {
  onClick() {
    this.context.dispatch('foo', 1);
  }

  render() {
    return <button onClick={this.onClick.bind(this)}>hello</button>
  }
}

@subscriber((self, subscribe) => {
  subscribe('foo', (prop) => {
    console.log('foo received on', prop);
    // self.setState({...})
  });
})
class App extends React.Component {
  render() {
    return <Child/>
  }
}

import ReactDOM from "react-dom";
const el = document.querySelector(".main");
ReactDOM.render(<App/>, el);
```

## license

MIT
