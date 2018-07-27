'use strict';

var imgArray = [];
var noRepeat = [];
var namesByImage = [];
var clicksByImage = [];
var percentClickedByImage = [];
var multipleSurveysTotalClicks = [];
var multipleSurveysTotalPercents = [];

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
  namesByImage.push(this.name);
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

function imgRandom(imgArray) {
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
  random1 = imgRandom(imgArray);
  random2 = imgRandom(imgArray);
  random3 = imgRandom(imgArray);
}


function pushRandoms() {
  noRepeat.push(random1);
  noRepeat.push(random2);
  noRepeat.push(random3);
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
    clicked1.removeEventListener('click', picked1);
    clicked2.removeEventListener('click', picked2);
    clicked3.removeEventListener('click', picked3);

    var liElement3 = document.createElement('li');
    liElement3.textContent = 'This User\'s Data';
    document.getElementById('list').appendChild(liElement3);
    document.getElementById('list').appendChild(document.createElement('br'));

    for (var i = 0; i < imgArray.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = imgArray[i].name + ': Times clicked: ' + imgArray[i].clicks;
      document.getElementById('list').appendChild(liElement);
      var liElement2 = document.createElement('li');
      document.getElementById('list').appendChild(document.createElement('br'));
      liElement2.textContent = '% voted for by appearance: ' + Math.round(((imgArray[i].clicks / imgArray[i].rendered) * 100)) + '%';
      document.getElementById('list').appendChild(liElement2);
      document.getElementById('list').appendChild(document.createElement('br'));
      document.getElementById('list').style.visibility = 'visible';
    }

    setDataArrays();
    makeChart();
  }
}

var userClicksData = localStorage.getItem('userClicksData');
// var userPercentByRendersData = localStorage.getItem('userPercentByRendersData');
var parsedUserClicksData = JSON.parse(userClicksData);
// var parsedUserPercentByRendersData = JSON.parse(userPercentByRendersData);

function setDataArrays() {

  for (var j = 0; j < imgArray.length; j++) {
    clicksByImage.push(imgArray[j].clicks);
    percentClickedByImage.push(Math.round((imgArray[j].clicks / imgArray[j].rendered) * 100));
    // if (localStorage.userPercentByRendersData)
  }
  if (localStorage.userClicksData) {
    for (var i = 0; i < imgArray.length; i++) {
      multipleSurveysTotalClicks[i] = clicksByImage[i] + parsedUserClicksData[i];
      multipleSurveysTotalPercents[i] = percentClickedByImage[i];
    }
  } else {
    multipleSurveysTotalClicks = clicksByImage;
    multipleSurveysTotalPercents = percentClickedByImage;
    localStorage.setItem('userClicksData', JSON.stringify(multipleSurveysTotalClicks));
    localStorage.setItem('userPercentByRendersData', JSON.stringify(multipleSurveysTotalPercents));
  }

  localStorage.userClicksData = JSON.stringify(multipleSurveysTotalClicks);
  localStorage.userPercentByRendersData = JSON.stringify(multipleSurveysTotalPercents);
}

function makeChart() {
  var chart1 = document.getElementById('chart').getContext('2d');
  var chart2 = document.getElementById('chart2').getContext('2d');

  var barChart1 = new Chart(chart1, {
    type: 'bar',
    data: {
      labels: namesByImage,
      datasets: [{
        label: 'Times Clicked (All Users)',
        data: multipleSurveysTotalClicks,
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      }
    }
  });

  var barChart2 = new Chart(chart2, {
    type: 'bar',
    data: {
      labels: namesByImage,
      datasets: [{
        label: '% Clicked Per Renders (This User)',
        data: multipleSurveysTotalPercents,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      }
    }
  });

}

onLoad();