# react-dispatcher-decorator

```
npm install react-dispatcher-decorator --save
```

## Concept

dispatch/subscribe by background event-emitter given by React context feature.

## Requirement

- https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy if you use babel
- `Object.assign` native or polyfill

## Example

```js
import React from "react";
import {dispatcher, subscriber} from "react-dispatcher-decorator";

// This component subscribes events from child components by context
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

// This component has this.context.dispatch and it will dispatch to parent subscriber
@dispatcher
class Child extends React.Component {
  render() {
    return <button onClick={() => this.context.dispatch('foo', 1)}>hello</button>
  }
}


import ReactDOM from "react-dom";
const el = document.querySelector(".main");
ReactDOM.render(<App/>, el);
```

## license

MIT
