import React, { Component } from 'react';

import Header from '../components/Header';
import notfoundImage from '../images/404.jpg';

class NotFound extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="homepage">
          <div className="homepage-container">
            <div className="notfound">
              <img src={notfoundImage} alt="404 - Not Found"/>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default NotFound;
