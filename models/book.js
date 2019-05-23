'use strict';
var dateFormat = require('dateformat');

module.exports = function(sequelize, DataTypes) {
  var book = sequelize.define('book', {
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

  // book.someClassMethod = function() {};

  book.prototype.publishedAt = function() {
    return dateFormat(this.createdAt, "dddd, mmmm dS, yyyy, h:MM TT");
  };

  book.prototype.shortDescription = function() { 
    return this.body.length > 30 ? this.body.substr(0, 30) + "..." : this.body;
  };

  return book;
};