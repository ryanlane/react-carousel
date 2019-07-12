import React, { Component } from 'react';
import { default as CarouselItem } from './CarouselItem';
import { default as CarouselDetails } from './CarouselDetails';
import styles from './Carousel.module.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentKey: null,
      currentIndex: 0,
      isActive: false,
      itemWidth: 0,
    };

    this.imagePath =
      'https://s3-us-west-2.amazonaws.com/movie-posters.ryanlane.com/';

    this.idleTimer = null;
    this.idleWait = 2000;

    this.handleKey = this.handleKey.bind(this);

    this.defaultItemDisplay = 3;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  }

  handleKey(e) {
    const { collection, history } = this.props;
    console.log('key', e.key, e.code);
    let selectedItem = 0;

    switch (e.key) {
      case 'ArrowRight':
        selectedItem =
          this.state.currentIndex < this.maxSize
            ? this.state.currentIndex + 1
            : 0;
        this.setState({ currentIndex: selectedItem });
        break;
      case 'ArrowLeft':
        selectedItem =
          this.state.currentIndex > 0
            ? this.state.currentIndex - 1
            : collection.length - 1;
        this.setState({ currentIndex: selectedItem });
        break;
      case 'Enter':
        console.log(collection[this.state.currentIndex].id);
        history.push(`/somepath/${collection[this.state.currentIndex].id}`);

        break;
      default:
        break;
    }
  }

  render() {
    const { collection, history } = this.props;
    let myShelf = [];

    this.maxSize = collection.length - 1;
    const middle = Math.round((this.defaultItemDisplay - 1) / 2);

    myShelf[middle] = collection[this.state.currentIndex];

    for (let index = middle - 1; index >= 0; index--) {
      myShelf[index] = collection[this.state.currentIndex - index];
      if (index === 0) {
        myShelf[index] = collection[this.state.currentIndex - 1];
      }
      if (this.state.currentIndex === 0) {
        myShelf[0] = collection[collection.length - 1];
      }
    }

    for (let index = middle + 1; index < this.defaultItemDisplay; index++) {
      if (index === this.defaultItemDisplay - 1) {
        myShelf[index] = collection[this.state.currentIndex + 1];
      }

      if (this.state.currentIndex === collection.length - 1) {
        myShelf[this.defaultItemDisplay - 1] = collection[0];
      }
    }

    return (
      <div>
        <div className={styles.Content}>
          <ul className={styles.resourceList} ref={this.resourceList}>
            {myShelf.map((item, index) => {
              const isActive = index === middle;
              let position = '0';
              if (index < middle) {
                position = -1;
              } else if (index > middle) {
                position = 1;
              }

              return (
                <CarouselItem
                  key={index}
                  id={item.id}
                  index={index}
                  currentId={this.state.currentIndex}
                  isActive={isActive}
                  position={position}
                  history={history}
                  returnItemSize={size => this.handleItemSize(size)}
                />
              );
            })}
          </ul>
        </div>
        <CarouselDetails id={myShelf[middle].id} />
      </div>
    );
  }
}

export default Carousel;
