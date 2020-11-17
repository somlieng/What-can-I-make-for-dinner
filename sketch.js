let url = "http://www.recipepuppy.com/api/";
let ingredientsInput = " ";
let keywordInput = " ";
let submitButton;
let pageNum = 1;
let recipeBox;
let firstText;
    
function setup() {
    submitButton = select('#submit');
    recipeBox = select('#recipes');
    firstText = select('#placeholder');
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
  
  firstText.hide();
    
  //grab values inside text input
  getValues();
  
  let ingredients = "?i="+ingredientsInput;
  let keyword = "&q="+keywordInput;
  let page = "&p="+pageNum;
  
  fetch(url+ingredients+keyword+page) 
  .then(response => response.json())
  .then(data => makeCards(data))
  .catch(err =>
    console.error(err))
}

function makeCards(data){
    var info = data.results
    for(var i = 0; i < data.results.length;i++){
        
        //card class
        var card = createDiv();
        card.class('card');
        
        //card image
        var cardImage = createDiv();
        cardImage.class('card-image');
        
        var image = createImg('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG',info[i].title)
        
        //card content class
        var cardContent = createDiv(); 
        cardContent.class('card-content');
        
        //recipe title
        var title = createElement('h5',info[i].title);
        
        card.child(cardImage);
        cardImage.child(image);
        card.child(cardContent);
        cardContent.child(title);
        
        recipeBox.child(card);
    }
    print(data);
}

function card(){
    var html = '<h5>Recipe Title</h5>';
//    <div class="card">
//            <div class="card-image">
//                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG">
//            </div>
//            <div class="card-content">
//                <h5>Recipe Title</h5>
//                <p>Ingredients: <span class="items"></span></p>
//            </div>
//            <div class="card-action">
//                <a href="#">Click here to see recipe</a>
//            </div>
//        </div>
}