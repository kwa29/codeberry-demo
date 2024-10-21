'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Car as CarIcon } from 'lucide-react';

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
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price-asc');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    description: ''
  });

  const [errors, setErrors] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
  });

  useEffect(() => {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      setCars(JSON.parse(storedCars));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
      isValid = false;
    } else {
      newErrors.make = '';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
      isValid = false;
    } else {
      newErrors.model = '';
    }

    if (!formData.year.trim() || isNaN(parseInt(formData.year))) {
      newErrors.year = 'Valid year is required';
      isValid = false;
    } else {
      newErrors.year = '';
    }

    if (!formData.price.trim() || isNaN(parseFloat(formData.price))) {
      newErrors.price = 'Valid price is required';
      isValid = false;
    } else {
      newErrors.price = '';
    }

    if (!formData.mileage.trim() || isNaN(parseInt(formData.mileage))) {
      newErrors.mileage = 'Valid mileage is required';
      isValid = false;
    } else {
      newErrors.mileage = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const newCar: Car = {
      id: editingCar ? editingCar.id : Math.max(0, ...cars.map(car => car.id)) + 1,
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      price: parseFloat(formData.price),
      mileage: parseInt(formData.mileage),
      description: formData.description
    };

    if (editingCar) {
      setCars(cars.map(car => car.id === editingCar.id ? newCar : car));
      setEditingCar(null);
    } else {
      setCars([...cars, newCar]);
    }

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

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year.toString(),
      price: car.price.toString(),
      mileage: car.mileage.toString(),
      description: car.description
    });
    setIsFormVisible(true);
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
          <CarIcon className={styles.icon} />
          <span className={styles.highlight}>Auto</span>Marketplace
        </h1>
        <button 
          className={styles.addButton} 
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setEditingCar(null);
            setFormData({
              make: '',
              model: '',
              year: '',
              price: '',
              mileage: '',
              description: ''
            });
          }}
        >
          {isFormVisible ? 'Close Form' : 'Add New Car'}
        </button>
      </header>

      {isFormVisible && (
        <section className={styles.carForm}>
          <h2>{editingCar ? 'Edit Car' : 'Add a New Car'}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="make">Make</label>
              <input
                type="text"
                id="make"
                value={formData.make}
                onChange={(e) => setFormData({...formData, make: e.target.value})}
              />
              {errors.make && <span className={styles.error}>{errors.make}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
              />
              {errors.model && <span className={styles.error}>{errors.model}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
              />
              {errors.year && <span className={styles.error}>{errors.year}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
              {errors.price && <span className={styles.error}>{errors.price}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="mileage">Mileage</label>
              <input
                type="number"
                id="mileage"
                value={formData.mileage}
                onChange={(e) => setFormData({...formData, mileage: e.target.value})}
              />
              {errors.mileage && <span className={styles.error}>{errors.mileage}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              {editingCar ? 'Update Car' : 'Add Car'}
            </button>
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.carsContainer}>
            {filteredAndSortedCars.map(car => (
              <div key={car.id} className={styles.carItem}>
                <h3>{car.make} {car.model} <span className={styles.year}>({car.year})</span></h3>
                <p className={styles.price}>${car.price.toLocaleString()}</p>
                <p className={styles.mileage}>{car.mileage.toLocaleString()} miles</p>
                <p className={styles.description}>{car.description}</p>
                <div className={styles.buttonGroup}>
                  <button onClick={() => handleEdit(car)} className={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(car.id)} className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}