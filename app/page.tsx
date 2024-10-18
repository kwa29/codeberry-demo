'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { CarForm } from '../components/CarForm';
import { CarList } from '../components/CarList';
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
  const [cars, setCars] = useState<Car[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      setCars(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load cars. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (carData: Omit<Car, 'id'>) => {
    try {
      const method = editingCar ? 'PUT' : 'POST';
      const url = editingCar ? `/api/cars/${editingCar.id}` : '/api/cars';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error('Failed to save car');
      }

      fetchCars();
      setIsFormVisible(false);
      setEditingCar(null);
    } catch (err) {
      setError('Failed to save car. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const response = await fetch(`/api/cars/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete car');
        }

        fetchCars();
      } catch (err) {
        setError('Failed to delete car. Please try again.');
      }
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setIsFormVisible(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Car className={styles.icon} />
          <span className={styles.highlight}>Auto</span>Marketplace
        </h1>
        <button 
          className={styles.addButton} 
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setEditingCar(null);
          }}
        >
          {isFormVisible ? 'Close Form' : 'Add New Car'}
        </button>
      </header>

      {isFormVisible && (
        <CarForm 
          onSubmit={handleSubmit}
          initialData={editingCar || undefined}
        />
      )}

      <CarList 
        cars={cars}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
}