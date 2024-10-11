'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { mockCars } from '../mockData';
import { Car } from 'lucide-react';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price-asc');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    description: ''
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newCar: Car = {
      id: Math.max(...cars.map(car => car.id)) + 1,
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      price: parseFloat(formData.price),
      mileage: parseInt(formData.mileage),
      description: formData.description
    };
    setCars([...cars, newCar]);
    setFormData({
      make: '',
      model: '',
      year: '',
      price: '',
      mileage: '',
      description: ''
    });
    setIsFormVisible(false);
  };

  const handleDelete = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const filteredAndSortedCars = cars
    .filter(car =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'year-desc') return b.year - a.year;
      if (sortOption === 'year-asc') return a.year - b.year;
      return 0;
    });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Car className={styles.icon} />
          <span className={styles.highlight}>Auto</span>Marketplace
        </h1>
        <button 
          className={styles.addButton} 
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? 'Close Form' : 'Add New Car'}
        </button>
      </header>

      {isFormVisible && (
        <section className={styles.carForm}>
          <h2>Add a New Car</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="make">Make</label>
              <input
                type="text"
                id="make"
                required
                value={formData.make}
                onChange={(e) => setFormData({...formData, make: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                required
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                required
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="mileage">Mileage</label>
              <input
                type="number"
                id="mileage"
                required
                value={formData.mileage}
                onChange={(e) => setFormData({...formData, mileage: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>Add Car</button>
          </form>
        </section>
      )}

      <section className={styles.carList}>
        <div className={styles.searchFilter}>
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Newest First</option>
            <option value="year-asc">Oldest First</option>
          </select>
        </div>
        <div className={styles.carsContainer}>
          {filteredAndSortedCars.map(car => (
            <div key={car.id} className={styles.carItem}>
              <h3>{car.make} {car.model} <span className={styles.year}>({car.year})</span></h3>
              <p className={styles.price}>${car.price.toLocaleString()}</p>
              <p className={styles.mileage}>{car.mileage.toLocaleString()} miles</p>
              <p className={styles.description}>{car.description}</p>
              <button onClick={() => handleDelete(car.id)} className={styles.deleteButton}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}