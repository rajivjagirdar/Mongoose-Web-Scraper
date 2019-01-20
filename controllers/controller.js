var express = require('express');
var request = require('request'); 
var cheerio = require('cheerio'); 

var Note = require('../models/Note.js');
var Article = require('../models/Article.js');

var app = express();

app.get('/', function (req, res){

  res.redirect('/scrape');

});

app.get('/articles', function (req, res){

  Article.find().sort({_id: -1})
    .populate('notes')
    .exec(function(err, doc){
      if (err){
        console.log(err);
      } 
      else {
        var hbsObject = {articles: doc}
        res.render('index', hbsObject);
      }
    });

});


app.get('/scrape', function(req, res) {

//   request('https://www.mlb.com/news', function(error, response, html) {
    request("http://www.echojs.com/", function(error, response, html) {

    var $ = cheerio.load(html);

    var titlesArray = [];

    // $('article ').each(function(i, element) {

        // var result = {};
        // result.title = $(this).children('.article-item__top').children(h1).text().trim() + "";
        // result.link = $(this).children('.article-item__bottom').children('.article-item__more-container').children('.p-button article-item__more').children('a').attr('href').trim();
        // result.summary = $(this).children('.article-item__bottom').children('.article-item__preview').children('p').text().trim() + ""
        
        $("article h2").each(function(i, element) {
            var result = {};
      
            result.title = $(this)
              .children("a")
              .text();
            result.link = $(this)
              .children("a")
              .attr("href");

        if(result.title !== "" &&  result.summary !== ""){
          if(titlesArray.indexOf(result.title) == -1){
            titlesArray.push(result.title);
            Article.count({ title: result.title}, function (err, test){
              if(test == 0){
                var entry = new Article (result);
                entry.save(function(err, doc) {
                  if (err) {
                    console.log(err);
                  } 
                  else {
                    console.log(doc);
                  }
                });
              }
              else{
                console.log('Redundant Database Content. Not saved to DB.')
              }
            });
        }
        else{
          console.log('Redundant MLB Content. Not Saved to DB.')
        }
      }
      else{
        console.log('Empty Content. Not Saved to DB.')
      }
    });
    res.redirect("/articles");
  });
});

app.post('/add/note/:id', function (req, res){

  var articleId = req.params.id;
  var noteAuthor = req.body.name;
  var noteContent = req.body.comment;
  var result = {
    author: noteAuthor,
    body: noteContent
  };

  var entry = new Note (result);

  entry.save(function(err, doc) {
    if (err) {
      console.log(err);
    } 
    else {
      Article.findOneAndUpdate({'_id': articleId}, {$push: {'notes':doc._id}}, {new: true})
      .exec(function(err, doc){
        if (err){
          console.log(err);
        } 
        else {
          res.sendStatus(200);
        }
      });
    }
  });
});

// app.post('/remove/note/:id', function (req, res){

//   var noteId = req.params.id;

//   Note.findByIdAndRemove({'_id': noteId};



module.exports = app;