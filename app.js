var hyperdom = require('hyperdom')
var h = hyperdom.html
var router = require('hyperdom/router')
var routes = {
  app: router.route('/:screen'),
  root: router.route('/')
}

function App (model) {
  this.model = model
}

App.prototype.routes = function () {
  var self = this
  return [
    routes.root({
      render: function () {
        routes.app.push({screen:'login'})
      }
    }),
    routes.app({
      bindings: {
        screen: [self.model, 'screen']
      },
      render: function () {
        return self.renderMain()
      }
    })
  ]
}

App.prototype.renderMain = function () {
  var self = this
  return h('div.main',
    h('h4', 'current screen: ' + self.model.screen),
    h('button', { onclick: function () {
      self.model.screen = 'home'
    }}, 'Login')
  )
}

var model = {screen: 'home'}
var app = new App(model)

hyperdom.append(document.body, app, {router: router})
