const loadMeals = async (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    const res = await fetch(url);
    const data = await res.json();
    return data.meals;
}

const showMenu = async (item) => {
    const meals = await loadMeals(item);
    const menuContainer = document.getElementById('product-menu');

    const uniqueArray = [];

    meals.forEach(meal => {
        // console.log(meal);
        const { strCategory } = meal;

        if (uniqueArray.includes(strCategory) === false) {
            uniqueArray.push(strCategory);

            const li = document.createElement('li');
            li.innerHTML = `<button onclick="loadMealsByCategory('${strCategory}')">${strCategory}</bu>`;
            menuContainer.appendChild(li);
        }
    })
}

showMenu('');


const searchField = document.getElementById('search-field');

searchField.addEventListener('keyup', async (event) => {
    const targetKey = event.key;
    if (targetKey === 'Enter') {
        toggleSpinner(true);
        const searchValue = searchField.value;
        const meals = await loadMeals('');
        console.log(meals);

        // search value
        const foundMeals = meals.filter(meal => meal.strMeal.toLowerCase().includes(searchValue.toLowerCase()));
        console.log(foundMeals);

        // total meals found
        const totalMeals = document.getElementById('meals-total');
        totalMeals.innerText = foundMeals.length;

        // validation
        const alertMessage = document.getElementById('alert');
        if (foundMeals.length === 0) {
            alertMessage.classList.remove('hidden');
        } else {
            alertMessage.classList.add('hidden');
        }

        // show meal card
        const mealContainer = document.getElementById('meals');
        mealContainer.innerHTML = '';
        foundMeals.forEach(meal => {
            console.log(meal);
            const { strMeal, strMealThumb, strInstructions } = meal;
            const mealDiv = document.createElement('div');
            mealDiv.innerHTML = `
          <div class="card w-full bg-base-100 shadow-xl">
            <figure><img src=${strMealThumb} alt="Meals" /></figure>
            <div class="card-body">
              <h2 class="card-title">${strMeal}</h2>
              <p>${strInstructions.slice(0, 20)}</p>
              <div class="card-actions justify-end">
                <button onclick="addToCart(this)" class="btn btn-primary">Add to Cart</button>
              </div>
            </div>
        </div>
        `;
            mealContainer.appendChild(mealDiv);
            searchField.value = ``;
        })
        toggleSpinner(false);
    }
})


const loadMealsByCategory = async (category) => {
    toggleSpinner(true);
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const res = await fetch(url);
    const data = await res.json();

    const allMeals = data.meals;
    // console.log(allMeals.length)
    // total meals found
    const totalMeals = document.getElementById('meals-total');
    totalMeals.innerText = allMeals.length;
    // show the meals
    const mealContainer = document.getElementById('meals');
    mealContainer.innerHTML = ``;

    allMeals.forEach(meal => {
        console.log(meal);
        const { strMeal, strMealThumb } = meal;
        const mealDiv = document.createElement('div');
        mealDiv.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl image-full">
        <figure><img src=${strMealThumb} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${strMeal}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button onclick="addToCart(this)"class="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
        `;
        mealContainer.appendChild(mealDiv);
        toggleSpinner(false);
    })

}


// spinner
const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

  // loadUsers('');