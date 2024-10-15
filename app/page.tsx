'use client';

import React, { useState, useEffect } from 'react';
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
  const [cars, setCars] = useState<Car[]>([]);
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

  useEffect(() => {
    // Filter out Ford cars from the initial data
    const filteredCars = mockCars.filter(car => !car.model.toLowerCase().includes('ford'));
    setCars(filteredCars);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.model.toLowerCase().includes('ford')) {
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
    } else {
      alert("Ford cars are not allowed.");
    }
  };

  const handleDelete = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const filteredAndSortedCars = cars
    .filter(car =>
      !car.model.toLowerCase().includes('ford') &&
      (car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
      {/* Rest of the component remains unchanged */}
    </main>
  );
}