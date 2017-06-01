var hyperdom = require('hyperdom')
var h = hyperdom.html
var router = require('hyperdom/router')

function App (model) {
   this.model = model
}

App.prototype.routes = function() {
  var self = this;

  var route = router.route('/users/brands/:screen')
   return [
     route({
       bindings:{
         screen: [self.model,'screen']
       },
       render: function() {
         return self.renderMain(model)
       }
     })
    ]
}

App.prototype.renderMain = function() {
  var self = this;
  return h('div.main',
    h('h4','current screen: ' + this.model.screen),
    h('button',{onclick:function () {
      self.model.screen = 'apples'
    }},'Apples')
  )
}

var model = {screen:'home'}
var app = new App(model)

hyperdom.append(document.body, app)