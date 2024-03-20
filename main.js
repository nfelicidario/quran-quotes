let quote;
let reference;

document.addEventListener('DOMContentLoaded', function() {
  setRandomBackgroundImage();
  startTime();
  parseJson();
});

function setRandomBackgroundImage() {
  fetch('./backgrounds.json')
  .then(response => response.json())
  .then(backgroundData => {
    let randomNumber = Math.floor(Math.random() * Object.keys(backgroundData).length)
    let background = backgroundData[randomNumber]
    document.body.style.backgroundImage = `url('backgrounds/${background.fileName}.jpeg')`
    document.getElementById("attribution").innerHTML = `Photo by <a href='${background.photographer_url}?utm_source=quran_quotes&utm_medium=referral'> ${background.photographer}</a> on <a href='https://unsplash.com/?utm_source=quran_quotes&utm_medium=referral'>Unsplash</a>`
  })
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  m = checkTime(m);
  document.getElementsByTagName('h1')[0].innerHTML = h + ":" + m;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

function parseJson(){
  fetch('./quotes.json')
  .then(response => response.json())
  .then(data => {
    let randomNumber = Math.floor(Math.random() * Object.keys(data).length)
    quote = data[randomNumber].quote;
    reference = data[randomNumber].book +  " " + data[randomNumber].reference;
    document.getElementById("quote").innerHTML = quote;
    document.getElementById("reference").innerHTML = reference;
  })
  .catch(error => console.error('Error fetching JSON:', error));
}