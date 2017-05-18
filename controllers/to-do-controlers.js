
var bodyParser = require('body-parser');
//var data = [{item:'shruti1'},{item:'shruti2'},{item:'shruti3'}];

var mongoose = require('mongoose');
//connect to database
mongoose.connect('mongodb://test:test@ds143231.mlab.com:43231/todo1997');

//create a schema - a blueprint
var toDoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo',toDoSchema);


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo',function(req,res){
    Todo.find({},function(error,data){
      if(error) throw error;
      res.render('todo',{todos:data});
    });


  });

  app.post('/todo',urlencodedParser,function(req,res){
    var newToDo = Todo(req.body).save(function(error,data){
      if(error) throw error;
    res.json(data);
    });

  });

  app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(error,data){
      if(error) throw error;
      res.json(data);
    });
  });

};
