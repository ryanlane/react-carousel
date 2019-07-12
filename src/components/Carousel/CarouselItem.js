import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './CarouselItem.module.scss';

// const myPath = process.env.PUBLIC_URL;

class CarouselItem extends Component {
  constructor(props) {
    super(props);
    this.imageContainer = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { collectionItem, isActive, index, currentId, history } = this.props;
    if (isActive !== prevProps.isActive && isActive) {
      if (index === currentId) {
        //this.createNewSessionID();

        history.push(`/mediascape/${collectionItem.studioBookId}`);
      }
    }

    if (this.imageContainer.current) {
      const { returnItemSize } = this.props;
      if (returnItemSize)
        returnItemSize(this.imageContainer.current.offsetWidth);
    }
  }

  handleClick(resourceId, ssId) {
    const { history } = this.props;
    //this.props.history.push('/mediascape');

    history.push(`/mediascape/${resourceId}`);
  }

  fetchCoverImage(images, resourceId, useCF = false) {
    let activeImagePath;
    Object.keys(images).forEach(key => {
      if (useCF) {
        if (images[key].type === 'mediascapeteaser' && images[key].isActive) {
          // activeImagePath = `${STORAGE.cfPath}${resourceId}/images/splash.png`;
          activeImagePath = images[key].downloadURL;
        }
      } else {
        if (images[key].type === 'square' && images[key].isActive) {
          activeImagePath = images[key].downloadURL;
        }
      }
    });
    return activeImagePath;
  }

  render() {
    const { collectionItem, device, isActive, position } = this.props;

    // console.log('collectionItem', collectionItem, index, currentId);
    let activeImage = this.fetchCoverImage(
      collectionItem.images,
      collectionItem.studioBookId,
      device.isVZSTB,
    );

    return (
      <li
        className={classNames(styles.contentItem, {
          [styles.selected]: isActive,
          [styles.left]: position === -1,
          [styles.right]: position === 1,
        })}
        onClick={() => this.handleClick(collectionItem.studioBookId)}
      >
        {/* <div className={styles.title}>{collectionItem.title}</div> */}

        <div className={styles.imageContainer} ref={this.imageContainer}>
          <img
            className={styles.mediaImage}
            src={activeImage}
            alt={`book cover art for ${collectionItem.title}`}
          />
        </div>
      </li>
    );
  }
}

export default CarouselItem;