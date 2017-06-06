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
      redirect: function() {
        return routes.app.url({screen:'login'})
      }
    }),
    routes.app({
      bindings: {
        screen: [self.model, 'screen']
      },
      push: {screen: true},
      render: function () {
        console.log('renderMain called');
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
    }}, 'Change route to home'),
    h('button', { onclick: function () {
      self.model.screen = 'login'
    }}, 'Change route to login'),
    h('button', { onclick: function () {
      self.model.screen = 'other'
    }}, 'Change route to other'),
  )
}

var model = {screen: 'login'}
var app = new App(model)

hyperdom.append(document.body, app, {router: router})
