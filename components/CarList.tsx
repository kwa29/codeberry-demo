import React, { useState } from 'react';
import styles from '../app/page.module.css';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
}

interface CarListProps {
  cars: Car[];
  onDelete: (id: number) => void;
  onEdit: (car: Car) => void;
}

export function CarList({ cars, onDelete, onEdit }: CarListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price-asc');

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
            <button onClick={() => onEdit(car)} className={styles.editButton}>Edit</button>
            <button onClick={() => onDelete(car.id)} className={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}