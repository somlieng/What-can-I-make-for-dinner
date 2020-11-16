let url = "http://www.recipepuppy.com/api/";
    
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function mousePressed(){
  grabData();
}

function grabData() {
  console.log("FETCHING!");
  
  fetch("http://www.recipepuppy.com/api/?i=eggs,pork&q=japaneses&p=1")
  .then(response => response.json())
  .then(data => print(data))
  .catch(err =>
    console.error(err))
}