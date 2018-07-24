'use strict';

var imgArray = [];

// var vote = document.getElementById('button');

function Img(src) {
  this.src = src;
  this.clicks = 0;
  this.rendered = 0;

  imgArray.push(this);
}

// vote.addEventListener('click', renderImg);
new Img('assets/bag.jpg');
new Img('assets/banana.jpg');
new Img('assets/bathroom.jpg');
// new Img('assets/boots.jpg');
// new Img('assets/breakfast.jpg');
// new Img('assets/bubblegum.jpg');
// new Img('assets/chair.jpg');
// new Img('assets/cthulhu.jpg');
// new Img('assets/dog-duck.jpg');
// new Img('assets/dragon.jpg');
// new Img('assets/pen.jpg');
// new Img('assets/pet-sweep.jpg');
// new Img('assets/scissors.jpg');
// new Img('assets/shark.jpg');
// new Img('assets/sweep.png');
// new Img('assets/tauntaun.jpg');
// new Img('assets/unicorn.jpg');
// new Img('assets/usb.gif');
// new Img('assets/water-can.jpg');
// new Img('assets/wine-glass.jpg');

function imgRandom() {
  return imgArray[Math.floor(Math.random() * imgArray.length)];
}

var Img1 = document.createElement('img');
var Img2 = document.createElement('img');
var Img3 = document.createElement('img');
var random1 = imgRandom();
var random2 = imgRandom();
var random3 = imgRandom();

var clicked1 = document.getElementById('button1');
var clicked2 = document.getElementById('button2');
var clicked3 = document.getElementById('button3');

clicked1.addEventListener('click', picked1);
clicked2.addEventListener('click', picked2);
clicked3.addEventListener('click', picked3);

function picked1() {
  random1.clicks++;
  renderImgs();
}

function picked2() {
  random2.clicks++;
  renderImgs();
}

function picked3() {
  random3.clicks++;
  renderImgs();
}

function start() {
  while (random1 === random2) {
    random2 = imgRandom();
    while (random2 === random3) {
      random3 = imgRandom();
      while (random1 === random3) {
        random3 = imgRandom();
      }
    }
  }
  Img1.src = random1.src;
  document.getElementById('1').appendChild(Img1);
  Img2.src = random2.src;
  document.getElementById('2').appendChild(Img2);
  Img3.src = random3.src;
  document.getElementById('3').appendChild(Img3);
}

function renderImgs() {
  document.getElementById('1').removeChild(Img1);
  document.getElementById('2').removeChild(Img2);
  document.getElementById('3').removeChild(Img3);
  random1 = imgRandom();
  random2 = imgRandom();
  random3 = imgRandom();
  while (random1 === random2) {
    random2 = imgRandom();
    while (random2 === random3) {
      random3 = imgRandom();
      while (random1 === random3) {
        random3 = imgRandom();
      }
    }
  }
  Img1.src = random1.src;
  document.getElementById('1').appendChild(Img1);
  Img2.src = random2.src;
  document.getElementById('2').appendChild(Img2);
  Img3.src = random3.src;
  document.getElementById('3').appendChild(Img3);
}

start();