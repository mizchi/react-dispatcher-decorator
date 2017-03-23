var EventEmitter = require("events").EventEmitter;
var React = require("react");

var DISPATCHER_TYPES = {dispatch: React.PropTypes.any};

function subscriber(subscribe) {
  return function(cls) {
    cls.childContextTypes = Object.assign({}, DISPATCHER_TYPES, cls.childContextTypes);
    var originalGetChildContext = cls.prototype.getChildContext;
    Object.defineProperty(cls.prototype, 'getChildContext', {
      configurable: true,
      value: function() {
        // merge with original getChildContext
        var oldResult = originalGetChildContext && originalGetChildContext.apply(this, arguments);

        if (!this.emitter) {
          var emitter = new EventEmitter;
          this.emitter = emitter;
          subscribe(this, function() {
            var args = arguments
            if (args.length === 1 && args[0] instanceof Object) {
              emitter.on.call(emitter, 'rdr-internal:dispatch-fsa', args[0])
            } else {
              emitter.on.apply(emitter, arguments)
            }
          }, emitter);
        }
        var self = this;
        return Object.assign({}, oldResult, {
          dispatch: function() {
            var args =  arguments;
            if (args.length === 1 && args[0] instanceof Object) {
              return self.emitter.emit.call(self.emitter, 'rdr-internal:dispatch-fsa', args[0]);
            } else {
              return self.emitter.emit.apply(self.emitter, arguments);
            }
          }
        });
      }
    });

    var originalCompenentWillUnmount = cls.prototype.componentWillUnmount;
    Object.defineProperty(cls.prototype, 'componentWillUnmount', {
      configurable: true,
      value: function() {
        originalCompenentWillUnmount && originalCompenentWillUnmount.apply(this, arguments);
        this.emitter.removeAllListeners();
      }
    });
  }
}

function dispatcher(cls) {
  cls.contextTypes = Object.assign({}, DISPATCHER_TYPES, cls.contextTypes);
}

module.exports = {subscriber: subscriber, dispatcher: dispatcher, ContextTypes: DISPATCHER_TYPES};
