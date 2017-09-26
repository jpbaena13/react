import EventSystem from './events.jsx'

var Sandbox = function (component) {
  this.component = component
}

Sandbox.prototype = {
  events: new EventSystem(),
  on: function (type, callback) {
    this.events.on(type, callback, this.component)
  },
  off: function (type, callback) {
    this.events.off(type, callback, this.component)
  },
  emit: function (type) {
    let args = Array.prototype.slice.call(arguments, 1)
    this.events.emit(type, args)
  }
}

module.exports = Sandbox
