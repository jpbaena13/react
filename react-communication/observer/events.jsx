'use strict'

var _events = {}

var EventSystem = function () {
  // Suscripción a un evento
  var on = function (type, callback, component) {
    if (!_events[type]) {
      _events[type] = []
    }

    _events[type].push({
      callback: callback,
      context: component
    })
  }

  // Eliminación de un evento
  var off = function (type, callback, component) {
    if (!_events[type]) {
      return false
    }

    for (var i = _events[type].length; i--;) {
      let info = _events[type][i]

      if (info.context === component && (!callback || info.callback === callback)) {
        _events[type].splice(i, 1)
      }
    }
  }

  // Emitir evento
  var emit = function (type, args) {
    if (!_events[type]) {
      return false
    }

    for (let i in _events[type]) {
      let info = _events[type][i]
      info.callback.apply(info.context, args)
    }

    if (type !== 'all') {
      let info = _events['all'] || []

      for (let i = info.length; i--;) {
        let tuple = info[i]
        tuple.callback.apply(tuple.context, args)
      }
    }
  }

  // Retornando interface del componente
  return {
    on,
    off,
    emit
  }
}

module.exports = EventSystem
