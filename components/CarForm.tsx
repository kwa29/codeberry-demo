import React, { useState } from 'react';
import styles from '../app/page.module.css';

interface Car {
  id?: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
}

interface CarFormProps {
  onSubmit: (carData: Omit<Car, 'id'>) => void;
  initialData?: Car;
}

export function CarForm({ onSubmit, initialData }: CarFormProps) {
  const [formData, setFormData] = useState<Omit<Car, 'id'>>(initialData || {
    make: '',
    model: '',
    year: 0,
    price: 0,
    mileage: 0,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        make: '',
        model: '',
        year: 0,
        price: 0,
        mileage: 0,
        description: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.carForm}>
      <div className={styles.formGroup}>
        <label htmlFor="make">Make</label>
        <input
          type="text"
          id="make"
          name="make"
          required
          value={formData.make}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="model">Model</label>
        <input
          type="text"
          id="model"
          name="model"
          required
          value={formData.model}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          name="year"
          required
          value={formData.year}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          required
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="mileage">Mileage</label>
        <input
          type="number"
          id="mileage"
          name="mileage"
          required
          value={formData.mileage}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" className={styles.submitButton}>
        {initialData ? 'Update Car' : 'Add Car'}
      </button>
    </form>
  );
}