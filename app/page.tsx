'use client';

import React from 'react';
import styles from './page.module.css';
import Header from '@/components/Header';
import PhotoGrid from '@/components/PhotoGrid';
import Categories from '@/components/Categories';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Categories />
      <PhotoGrid />
    </main>
  );
}