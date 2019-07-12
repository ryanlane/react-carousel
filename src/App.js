import React from 'react';
import { Carousel } from './components';
import { sampleCollection } from './data/sampledata';
import styles from './App.module.scss';



function App() {
  return (
    <div className={styles.App}>
      <Carousel collection={sampleCollection} />
    </div>
  );
}

export default App;
