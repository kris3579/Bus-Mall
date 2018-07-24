'use strict';

var imgArray = [];
var noRepeat = [];

var totalVotes = 0;

var clicked1 = document.getElementById('button1');
var clicked2 = document.getElementById('button2');
var clicked3 = document.getElementById('button3');

clicked1.addEventListener('click', picked1);
clicked2.addEventListener('click', picked2);
clicked3.addEventListener('click', picked3);

var Img1 = document.createElement('img');
var Img2 = document.createElement('img');
var Img3 = document.createElement('img');

var random1;
var random2;
var random3;

function Img(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.rendered = 0;

  imgArray.push(this);
}

// vote.addEventListener('click', renderImg);
new Img('Bag', 'assets/bag.jpg');
new Img('Banana', 'assets/banana.jpg');
new Img('Bathroom', 'assets/bathroom.jpg');
new Img('Boots', 'assets/boots.jpg');
new Img('Breakfast', 'assets/breakfast.jpg');
new Img('Bubblegum', 'assets/bubblegum.jpg');
new Img('Chair', 'assets/chair.jpg');
new Img('Cthulhu', 'assets/cthulhu.jpg');
new Img('Dog-Duck', 'assets/dog-duck.jpg');
new Img('Dragon', 'assets/dragon.jpg');
new Img('Pen', 'assets/pen.jpg');
new Img('Pet-Sweep', 'assets/pet-sweep.jpg');
new Img('Scissors', 'assets/scissors.jpg');
new Img('Shark', 'assets/shark.jpg');
new Img('Sweep', 'assets/sweep.png');
new Img('Tauntaun', 'assets/tauntaun.jpg');
new Img('Unicorn', 'assets/unicorn.jpg');
new Img('USB', 'assets/usb.gif');
new Img('Water-Can', 'assets/water-can.jpg');
new Img('Wine-Glass', 'assets/wine-glass.jpg');

function imgRandom() {
  return imgArray[Math.floor(Math.random() * imgArray.length)];
}


function picked1() {
  random1.clicks++;
  totalVotes++;
  renderImgs();
}


function picked2() {
  random2.clicks++;
  totalVotes++;
  renderImgs();
}


function picked3() {
  random3.clicks++;
  totalVotes++;
  renderImgs();
}


function renderTotals() {
  random1.rendered++;
  random2.rendered++;
  random3.rendered++;
}


function removeImgs() {
  document.getElementById('1').removeChild(Img1);
  document.getElementById('2').removeChild(Img2);
  document.getElementById('3').removeChild(Img3);
}


function reRollImgs() {
  random1 = imgRandom();
  random2 = imgRandom();
  random3 = imgRandom();
}


function pushRandoms() {
  noRepeat.push(random1);
  noRepeat.push(random2);
  noRepeat.push(random3);
}


function roundPercents(percent) {
  return Math.round(percent);
}


function onLoad() {
  reRollImgs();

  while (random1 === random2 || random1 === random3 || random2 === random3) {
    random2 = imgRandom();
    random3 = imgRandom();
  }

  pushRandoms();
  Img1.src = random1.src;
  document.getElementById('1').appendChild(Img1);
  Img2.src = random2.src;
  document.getElementById('2').appendChild(Img2);
  Img3.src = random3.src;
  document.getElementById('3').appendChild(Img3);
  renderTotals();
}


function renderImgs() {
  removeImgs();
  reRollImgs();

  while (random1 === random2 || random1 === random3 || random2 === random3 || noRepeat.includes(random1) || noRepeat.includes(random2) || noRepeat.includes(random3)) {
    reRollImgs();
  }

  Img1.src = random1.src;
  document.getElementById('1').appendChild(Img1);
  Img2.src = random2.src;
  document.getElementById('2').appendChild(Img2);
  Img3.src = random3.src;
  document.getElementById('3').appendChild(Img3);
  renderTotals();
  noRepeat = [];
  pushRandoms();

  if (totalVotes >= 25) {
    alert('Voting over!');
    clicked1.removeEventListener('click', picked1);
    clicked2.removeEventListener('click', picked2);
    clicked3.removeEventListener('click', picked3);

    for (var i = 0; i < imgArray.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = imgArray[i].name + ': Times clicked: ' + imgArray[i].clicks + ', % voted for by appearance: ' + roundPercents(25 / imgArray[i].rendered) + '%';
      document.getElementById('list').appendChild(liElement);
      document.getElementById('list').style.visibility = 'visible';
    }
  }
}



onLoad();