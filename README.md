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

# v1.1.0

- Added FSA style. `dispatch` and `subscribe` can take 1 object.

https://github.com/acdlite/flux-standard-action

```js
// In dispatcher
this.context.dispatch({type: 'bar'})

// In subscriber
subscribe(action => {
  switch (action.type) {
    case 'bar':
      console.log('on bar')
      break;
  }
});
```

This makes easy to add flowtype/typescript annotations and it can migrate with other flux.

## license

MIT
