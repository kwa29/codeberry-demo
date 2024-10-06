// Mock data for cars
let cars = JSON.parse(localStorage.getItem('cars')) || [];

// Function to save cars to local storage
function saveCars() {
    localStorage.setItem('cars', JSON.stringify(cars));
}

// Function to add a new car
function addCar(event) {
    event.preventDefault();
    const newCar = {
        id: Date.now(),
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        year: parseInt(document.getElementById('year').value),
        price: parseFloat(document.getElementById('price').value),
        mileage: parseInt(document.getElementById('mileage').value),
        description: document.getElementById('description').value
    };
    cars.push(newCar);
    saveCars();
    displayCars();
    event.target.reset();
}

// Function to display cars
function displayCars() {
    const carsContainer = document.getElementById('cars-container');
    carsContainer.innerHTML = '';
    cars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.classList.add('car-item');
        carElement.innerHTML = `
            <h3>${car.make} ${car.model} (${car.year})</h3>
            <p>Price: $${car.price}</p>
            <p>Mileage: ${car.mileage} miles</p>
            <p>${car.description}</p>
            <button onclick="editCar(${car.id})">Edit</button>
            <button onclick="deleteCar(${car.id})">Delete</button>
        `;
        carsContainer.appendChild(carElement);
    });
}

// Function to delete a car
function deleteCar(id) {
    cars = cars.filter(car => car.id !== id);
    saveCars();
    displayCars();
}

// Function to search and filter cars
function searchAndFilterCars() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const sortOption = document.getElementById('sort').value;
    
    let filteredCars = cars.filter(car => 
        car.make.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm) ||
        car.description.toLowerCase().includes(searchTerm)
    );
    
    filteredCars.sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        if (sortOption === 'year-desc') return b.year - a.year;
        if (sortOption === 'year-asc') return a.year - b.year;
    });
    
    const carsContainer = document.getElementById('cars-container');
    carsContainer.innerHTML = '';
    filteredCars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.classList.add('car-item');
        carElement.innerHTML = `
            <h3>${car.make} ${car.model} (${car.year})</h3>
            <p>Price: $${car.price}</p>
            <p>Mileage: ${car.mileage} miles</p>
            <p>${car.description}</p>
            <button onclick="deleteCar(${car.id})">Delete</button>
        `;
        carsContainer.appendChild(carElement);
    });
}

// Function to edit a car
function editCar(id) {
    const car = cars.find(car => car.id === id);
    if (car) {
        document.getElementById('make').value = car.make;
        document.getElementById('model').value = car.model;
        document.getElementById('year').value = car.year;
        document.getElementById('price').value = car.price;
        document.getElementById('mileage').value = car.mileage;
        document.getElementById('description').value = car.description;
        
        // Change the form submission behavior
        const form = document.getElementById('add-car-form');
        form.onsubmit = (e) => updateCar(e, id);
        document.querySelector('#add-car-form button[type="submit"]').textContent = 'Update Car';
    }
}

// Function to update a car
function updateCar(event, id) {
    event.preventDefault();
    const updatedCar = {
        id: id,
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        year: parseInt(document.getElementById('year').value),
        price: parseFloat(document.getElementById('price').value),
        mileage: parseInt(document.getElementById('mileage').value),
        description: document.getElementById('description').value
    };
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        cars[index] = updatedCar;
        saveCars();
        displayCars();
        event.target.reset();
        // Reset form submission behavior
        event.target.onsubmit = addCar;
        document.querySelector('#add-car-form button[type="submit"]').textContent = 'Add Car';
    }
}

// Event listeners
document.getElementById('add-car-form').addEventListener('submit', addCar);
document.getElementById('search').addEventListener('input', searchAndFilterCars);
document.getElementById('sort').addEventListener('change', searchAndFilterCars);

// Initial display of cars
displayCars();