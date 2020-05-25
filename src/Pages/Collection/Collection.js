import React, { Component } from 'react';
import { Carousel } from '../../components';
import styles from './Collection.module.scss';
import { sampleCollection } from '../../data/sampledata';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.contentDiv = React.createRef();

    this.state = {
      currentKey: null,
      currentIndex: 0,
      isActive: false,
    };
  }


  handleBackground(imagePath) {
    // set background on Content
    this.contentDiv.current.style.backgroundImage = `url(${imagePath})`;
  }

  render() {
    return (
      <div>
        <div className={styles.imageBackground} ref={this.contentDiv} />
        <div className={styles.Content}>
          <div>
            <Carousel
              collection={sampleCollection}
              onBackgroundSet={path => this.handleBackground(path)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Collection;
