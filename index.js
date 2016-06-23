var EventEmitter = require("events").EventEmitter;
const React = require("react");

var DISPATCHER_TYPES = {dispatch: React.PropTypes.any};

function subscriber(subscribe) {
  return function(cls) {
    cls.childContextTypes = Object.assign(DISPATCHER_TYPES, cls.childContextTypes);
    var originalGetChildContext = cls.prototype.getChildContext;
    Object.defineProperty(cls.prototype, 'getChildContext', {
      value: function() {
        // merge with original getChildContext
        const oldResult = originalGetChildContext && originalGetChildContext.apply(this, arguments);

        if (!this.emitter) {
          const emitter = new EventEmitter;
          this.emitter = emitter;
          subscribe(this, emitter.on.bind(emitter), emitter);
        }
        var self = this;
        return Object.assign({}, oldResult, {
          dispatch: function() {
            return self.emitter.emit.apply(self.emitter, arguments);
          }
        });
      }
    });

    var originalCompenentWillUnmount = cls.prototype.componentWillUnmount;
    Object.defineProperty(cls.prototype, 'componentWillUnmount', {
      value: function() {
        originalCompenentWillUnmount && originalCompenentWillUnmount.apply(this, arguments);
        this.emitter.removeAllListeners();
      }
    });
  }
}

function dispatcher(cls) {
  cls.contextTypes = Object.assign(DISPATCHER_TYPES, cls.contextTypes);
}

module.exports = {subscriber, dispatcher};
