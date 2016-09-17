/*
  es6-module.js
  Just for test!
*/

class People {
  constructor(name){
    this.name = name;
  }
  sayHi() {
    alert('How do you do, ' + this.name + '.');
    // console.log('Hi, ${this.name} !!');
  }
}

module.exports = People;
