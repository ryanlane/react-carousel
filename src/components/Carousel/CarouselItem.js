import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './CarouselItem.module.scss';

class CarouselItem extends Component {
  constructor(props) {
    super(props);
    this.imageContainer = React.createRef();

    this.imagePath =
      'https://s3-us-west-2.amazonaws.com/movie-posters.ryanlane.com/';
  }

  handleClick(resourceId, isActive) {
    const { history, onClick } = this.props;

    if (isActive) {
      history.push(`/somepath/${resourceId}`);
    } else {
      onClick();
    }
  }

  getFullImagePath(filename) {
    return this.imagePath + filename;
  }

  render() {
    const { collectionItem, isActive, position } = this.props;

    console.log('collectionItem', collectionItem);
    let activeImage = this.getFullImagePath(
      collectionItem.imageName,
      collectionItem.id,
    );

    return (
      <li
        className={classNames(styles.contentItem, {
          [styles.selected]: isActive,
          [styles.left]: position === -1,
          [styles.right]: position === 1,
        })}
        onClick={() => this.handleClick(collectionItem.studioBookId, isActive)}
      >
        {/* <div className={styles.title}>{collectionItem.title}</div> */}

        <div className={styles.imageContainer} ref={this.imageContainer}>
          <img
            className={styles.mediaImage}
            src={activeImage}
            alt={`cover art for ${collectionItem.title}`}
          />
        </div>
      </li>
    );
  }
}

export default CarouselItem;
