import React, { Component } from 'react';

import styles from './CarouselDetails.module.scss';

// const myPath = process.env.PUBLIC_URL;

class CarouselDetails extends Component {
  render() {
    const { collectionItem } = this.props;

    return (
      <div className={styles.details}>
        <div className={styles.title}>{collectionItem.title}</div>
        <div className={styles.description}>{collectionItem.description}</div>
      </div>
    );
  }
}

export default CarouselDetails;
