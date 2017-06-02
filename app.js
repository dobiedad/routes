var hyperdom = require('hyperdom')
var h = hyperdom.html
var router = require('hyperdom/router')
var routes = {
  root: router.route('/'),
  app: router.route('/:screen')
}

function App (model) {
  this.model = model
}

App.prototype.routes = function () {
  var self = this
  return [
    routes.root({
      render: function () {
        return routes.app.replace({screen:'login'})
      }
    }),
    routes.app({
      bindings: {
        screen: [self.model, 'screen']
      },
      render: function () {
        console.log('app render');
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

var model = {screen: 'login'}
var app = new App(model)

hyperdom.append(document.body, app, {router: router})
