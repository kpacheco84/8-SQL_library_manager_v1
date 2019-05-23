'use strict';
var dateFormat = require('dateformat');

module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
    title:{
       type: DataTypes.STRING,
        validate: {
          notEmpty:true
      }
     },

    author: {
      type: DataTypes.STRING,
       validate: {
         notEmpty:true
     }
    },
    genre: DataTypes.STRING,
    year:DataTypes.INTEGER
  });

  // Article.someClassMethod = function() {};

  Article.prototype.publishedAt = function() {
    return dateFormat(this.createdAt, "dddd, mmmm dS, yyyy, h:MM TT");
  };

  Article.prototype.shortDescription = function() { 
    return this.body.length > 30 ? this.body.substr(0, 30) + "..." : this.body;
  };

  return Article;
};