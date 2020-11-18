let url = "http://www.recipepuppy.com/api/";
let ingredientsInput = " ";
let keywordInput = " ";
let oldKey = " ";
let submitButton;
let pageNum = 1;
let recipeBox;
let firstText;
let next;
let back;
let sidenav;

let showing = false;
    
function setup() {
    submitButton = select('#submit');
    recipeBox = select('#recipes');
    firstText = select('#placeholder');
    next = select('#next');
    next.hide();
    back = select('#back');
    back.hide();
    
    //sidenav initialized from Matieralize JQURERY code NOT MINE
    $('.sidenav').sidenav();
    
    searchRecipes(submitButton);
    
    if(showing === true){
       nextPage(next);
    }
}


function nextPage(){
    pageNum++;
    grabData();
}

function lastPage(){
    pageNum--;
    grabData();
}

//make Card object
function Card(title, thumbnail, ingredients, href) {
    
   var source;
   if(thumbnail === ""){
        source = 'img/bred_sheeran.jpg'
    } else{
        source = thumbnail};    
    
  this.html = 
      `<div class="col s12 m4">
    <div class="card">
      <div class="card-image">
        <img src="${source}">
      </div>
      <div class="card-content">
        <h5>${title}</h5>
        <p>${ingredients}</p>
      </div>
      <div class="card-action">
        <a href="${href}">Click here for the recipe</a>
      </div>
    </div>
  </div>`;
}

function searchRecipes(button){
    button.mousePressed(grabData);
}

function getValues(){
    ingredientsInput = select('#ingredients').value();
    keywordInput = select('#keyword').value();
}

function grabData() {
  
  firstText.hide();
  next.show();
  back.show();
  showing = true;
    
  //grab values inside text input
  getValues();
    
  if(oldKey !== keywordInput){
    pageNum = 1;
  }
    
  oldKey = keywordInput;
  
  let ingredients = "?i="+ingredientsInput;
  let keyword = "&q="+keywordInput;
  let page = "&p="+pageNum;
  
  fetch(url+ingredients+keyword+page) 
  .then(response => response.json())
  .then(data => fillRow(data))
  .catch(err =>{
    console.error(err);
    M.toast({html: 'Oh no! No more recipes :('});
  })
}

function fillRow(data){
    
    if(data.results.length === 0){
     var empty = 'No recipes were found for your ingredient list :(';
     firstText.html(empty);
     firstText.show();
    }
    
    let numRows = Math.ceil(data.results.length / 3);
    let rows = [];
    for (let i = 0; i < numRows; ++i) {
      rows.push(new Row());
      while (rows[i].columns.length < 3 && data.results.length > 0) {
        let recipe = data.results.shift();
        rows[i].columns.push(new Card(recipe.title, recipe.thumbnail, recipe.ingredients, recipe.href));
      }
    }
    var temp = '';
    for (let i = 0; i < rows.length; i++) {
        temp += rows[i].getHTML();
    }
    recipeBox.html(temp);
}