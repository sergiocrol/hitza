/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WithAuth from '../components/WithAuth.js';

class SearchResultCard extends Component {
  state = {
    redirect: false,
    redirectToInhabitant: false,
    favoriteList: []
  }

  componentDidMount() {
    this.updateFavoriteList();
  }

  // Heart icon: If there is a user in localStore, save the selected ID; otherwise make a redirection to welcome page
  handleFavorite = (event) => {
    event.stopPropagation();
    const { addRemoveFavorite, inhabitant, isAllowedVisitor } = this.props;
    if (isAllowedVisitor) {
      addRemoveFavorite(inhabitant.id);
      this.updateFavoriteList();
    } else {
      this.setState({
        redirect: true
      })
    }
  }

  updateFavoriteList = () => {
    const { getFavoriteList } = this.props;
    const favoriteList = JSON.parse(localStorage.getItem('BrastlewarkVisitor'));
    if (favoriteList !== null && favoriteList.favorites !== undefined) {
      this.setState({
        favoriteList: favoriteList.favorites
      }, () => { getFavoriteList() })
    }
  }

  redirectToInhabitant = () => {
    this.setState({
      redirectToInhabitant: true
    })
  }

  render() {
    const { name, age, id, hair_color } = this.props.inhabitant;
    const { favoriteList } = this.state;
    if (this.state.redirect) { return <Redirect to='/favorites' /> }
    if (this.state.redirectToInhabitant) { return <Redirect to={`/gnomes/${id}`} /> }
    return (
      <div className="search-card" onClick={this.redirectToInhabitant}>
        <div className="search-card-haircolor" style={{backgroundColor: hair_color}}></div>
        <div className="search-card-info"><p className="search-card-info-name">{name}</p> <p className="search-card-info-age">age <span>{age}</span></p></div>
        <span className="search-card-heart" onClick={this.handleFavorite} style={favoriteList.includes(id) ? { color: '#F2627A' } : { color: '#adabab' }}>{/*&#9829;*/}&#10084;</span>
      </div>
    );
  }
}

export default WithAuth(SearchResultCard);