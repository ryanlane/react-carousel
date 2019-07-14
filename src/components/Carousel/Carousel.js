import React, { Component } from 'react';
import { default as CarouselItem } from './CarouselItem';
import { default as CarouselDetails } from './CarouselDetails';
import styles from './Carousel.module.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      isActive: false,
    };

    this.handleKey = this.handleKey.bind(this);
    this.handleWheel = this.handleWheel.bind(this);

    this.defaultItemDisplay = 3;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
    window.addEventListener('wheel', this.handleWheel);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
    window.removeEventListener('wheel', this.handleWheel);
  }

  // support arrow keys to move through the list and enter key to select
  handleKey(e) {
    const { collection } = this.props;
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
        window.location.href = collection[this.state.currentIndex].link;
        break;
      default:
        break;
    }
  }

  // support mouse wheel to scroll through list
  handleWheel(e) {
    const { collection } = this.props;
    let selectedItem = 0;

    console.log('wheel :', e);
    if (Math.sign(e.deltaY) === 1) {
      selectedItem =
        this.state.currentIndex < this.maxSize
          ? this.state.currentIndex + 1
          : 0;
      this.setState({ currentIndex: selectedItem });
    }

    if (Math.sign(e.deltaY) === -1) {
      selectedItem =
        this.state.currentIndex > 0
          ? this.state.currentIndex - 1
          : collection.length - 1;
      this.setState({ currentIndex: selectedItem });
    }
  }

  // clicking on none active poster will make it active instead of opening
  handleOutsideClick(index) {
    this.setState({ currentIndex: index });
  }

  render() {
    const { collection, onBackgroundSet } = this.props;
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
            {collection.map((item, index) => {
              const isActive = index === this.state.currentIndex;
              let position = '0';
              if (index === this.state.currentIndex - 1) {
                position = -1;
              } else if (index === this.state.currentIndex + 1) {
                position = 1;
              }

              if (this.state.currentIndex === collection.length - 1) {
                if (index === 0) {
                  position = 1;
                }
              }

              if (this.state.currentIndex === 0) {
                if (index === collection.length - 1) {
                  position = -1;
                }
              }

              return (
                <CarouselItem
                  key={index}
                  collectionItem={item}
                  index={index}
                  currentId={this.state.currentIndex}
                  isActive={isActive}
                  position={position}
                  onClick={() => this.handleOutsideClick(index)}
                />
              );
            })}
          </ul>
        </div>
        <CarouselDetails
          collectionItem={myShelf[middle]}
          onChange={path => onBackgroundSet(path)}
        />
      </div>
    );
  }
}

export default Carousel;
