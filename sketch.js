let url = "http://www.recipepuppy.com/api/";
let ingredientsInput = " ";
let keywordInput = " ";
let submitButton;
let pageNum = 1;
    
function setup() {
    submitButton = select('#submit');
    searchRecipes(submitButton);
}

function searchRecipes(button){
    button.mousePressed(grabData);
}

function getValues(){
    ingredientsInput = select('#ingredient').value();
    keywordInput = select('#keyword').value();
}

function grabData() {

  //grab values inside text input
  getValues();
  
  let ingredients = "?i="+ingredientsInput;
  let keyword = "&q="+keywordInput;
  let page = "&p="+pageNum;
  
  fetch(url+ingredients+keyword+page)
  .then(response => response.json())
  .then(data => print(data))
  .catch(err =>
    console.error(err))
}