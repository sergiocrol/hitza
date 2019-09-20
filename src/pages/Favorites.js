import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WithAuth from '../components/WithAuth.js';
import SearchResultCard from '../components/SearchResultCard';
import Header from '../components/Header';

import brastlewarkService from '../services/BrastlewarkService';

class Favorites extends Component {
  state = {
    favoriteList: [],
    name: 'Visitor'
  }

  // Get favoriteList from localStorage
  componentDidMount() {
    this.getFavoriteList();
  }

  getFavoriteList = () => {
    let favoriteList = JSON.parse(localStorage.getItem('BrastlewarkVisitor'));

    if(favoriteList !== null){this.setState({name: favoriteList.name})}
    if (favoriteList !== null && favoriteList.favorites !== undefined) {
      brastlewarkService.getAllHabitants()
        .then(response => {
          favoriteList = response.data.Brastlewark.filter(inhabitant => { return favoriteList.favorites.includes(inhabitant.id) });
          this.setState({
            favoriteList,
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // Display the appropiate message if user is not allowed or favoriteList is empty
  render() {
    let { isAllowedVisitor } = this.props;
    const { favoriteList, name } = this.state;
    return (
      <div>
        <Header />
        <div className="homepage">
          <div className="homepage-container">
            <div className="homepage-searchbox u-margin-bottom-medium favorites-searchbox">
              <div className="triangle"></div>
              <h1><span>{name}</span>, your favorites</h1>
              <h2><span>(</span>AKA Tindegnomer :3<span>)</span></h2>
            </div>
            <div className="homepage-resultbody">
            {isAllowedVisitor ? (
              favoriteList.length !== 0
                ? favoriteList.map((favorite) => <SearchResultCard key={favorite.id} inhabitant={favorite} getFavoriteList={this.getFavoriteList} />)
                : <div className="homepage-empty">Love isn't in the air&nbsp;<span>:(</span> </div>
            ) : (
                <div className="homepage-empty">
                  <p>Hey! Who are you? What's your name?</p>
                  <p>You have to be registered to enter here!</p>
                  <Link to="/welcome" className="button u-margin-top-medium back">Go back to the entrance</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WithAuth(Favorites);