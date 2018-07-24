'use strict';

var imgArray = [];

var vote = document.getElementById('button');

function Img(src) {
  this.src = src;
  this.clicks = 0;
  this.rendered = 0;

  imgArray.push(this);
}

vote.addEventListener('click', renderImg);
new Img('assets/bag.jpg');
new Img('assets/banana.jpg');
new Img('assets/bathroom.jpg');
new Img('assets/boots.jpg');
new Img('assets/breakfast.jpg');
new Img('assets/bubblegum.jpg');
new Img('assets/chair.jpg');
new Img('assets/cthulhu.jpg');
new Img('assets/dog-duck.jpg');
new Img('assets/dragon.jpg');
new Img('assets/pen.jpg');
new Img('assets/pet-sweep.jpg');
new Img('assets/scissors.jpg');
new Img('assets/shark.jpg');
new Img('assets/sweep.png');
new Img('assets/tauntaun.jpg');
new Img('assets/unicorn.jpg');
new Img('assets/usb.gif');
new Img('assets/water-can.jpg');
new Img('assets/wine-glass.jpg');

function imgRandom() {
  return imgArray[Math.floor(Math.random() * imgArray.length)];
}

var Img1 = document.createElement('img');
var Img2 = document.createElement('img');
var Img3 = document.createElement('img');
var random1 = imgRandom();
var random2 = imgRandom();
var random3 = imgRandom();

function start() {
  Img1.src = random1.src;
  document.getElementById('1').appendChild(Img1);
  Img2.src = random2.src;
  document.getElementById('2').appendChild(Img2);
  Img3.src = random3.src;
  document.getElementById('3').appendChild(Img3);
}

function renderImg() {
  document.getElementById('1').removeChild(Img1);
  document.getElementById('2').removeChild(Img2);
  document.getElementById('3').removeChild(Img3);
  Img1.src = imgRandom().src;
  document.getElementById('1').appendChild(Img1);
  Img2.src = imgRandom().src;
  document.getElementById('2').appendChild(Img2);
  Img3.src = imgRandom().src;
  document.getElementById('3').appendChild(Img3);
  addClick();
}

function addClick() {
  
}



start();