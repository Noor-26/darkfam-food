const spinner = document.getElementById('load')
function loadPage(displayStyle){
   spinner.style.display = displayStyle;
}
const p = document.getElementById('none').style.display ="none"


function  searchFoodName  () {

    const mealName = document.getElementById('search-input')
    const searchText = mealName.value
    loadPage('block')
    document.getElementById('massage').style.display = "none"

    if (searchText == '') {  
      document.getElementById('none').style.display ="block"
    }
    else{
      document.getElementById('none').style.display ="none"

      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
      fetch(url)
      .then(res => res.json())
      .then(data => foodDisplay(data.meals))

    }
    // clear data 
  mealName.value = ''
}

// document.getElementById('massage').style.display = "none"
const foodDisplay = names =>{
  
  const container = document.getElementById('contain')
  container.textContent = ''
    
  // if(name != 0){
    // }
    if(names <= 0){
        loadPage('none')  
        document.getElementById('massage').style.display = "block"
      // console.log("hfhf");
  }
  else{
    for (const name of names) {
      document.getElementById('massage').style.display = "none"
      console.log(name);
      const div = document.createElement('div')
      div.innerHTML =`
      <div class="col" >
      <div class="card h-100" onclick ="loadMeal(${name.idMeal})">
      <img src="${name.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${name.strMeal}</h5>
      <p class="card-text">${name.strInstructions.slice(0,200)}... </p>
      </div>
      </div>
      </div>
      `
      container.appendChild(div)
    }
  }

  loadPage('none')
}

const loadMeal = async mealId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  
  const res = await fetch(url) //  fetch(url)
  const data = await res.json() // .then(res => res.json())
  displayMeal(data.meals[0]) // .then(data => displayMeal(data.meals[0]))

    //   await na dile kam hoibo na
}

function displayMeal (meal) {
  const mainDiv = document.getElementById('main')
  mainDiv.textContent =''
  const div = document.createElement('div')
  div.innerHTML = `
  <div class="card w-80 mx-auto" >
  <img  src="${meal.strMealThumb}" class="  card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
    <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">See tutorial</a>
  </div>
</div>
  `
  
  mainDiv.appendChild(div)  
}

