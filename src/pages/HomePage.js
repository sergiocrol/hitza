import React, { Component } from 'react';

import SearchResultCard from '../components/SearchResultCard';
import Header from '../components/Header';

import brastlewarkService from '../services/BrastlewarkService';

class HomePage extends Component {
  state = {
    inhabitants: [],
    paginatedInhabitants: [],
    itemsPerPage: 135,
    numberOfPages: 1,
    currentPage: 1,
    searchName: '',
    searchAge: '',
    searchProfession: '',
    searchHairColor: '',
    professionList: [],
    hairColorList: [],
    isLoading: true
  }

  // Get all the inhabitants of the town. We save also the list of all professions/hairColor to display it in a select input
  componentDidMount() {
    brastlewarkService.getAllHabitants()
      .then(response => {
        const inhabitants = response.data.Brastlewark;
        const professionList = [...new Set(inhabitants.reduce((acc, curr) => { return acc = acc.concat(curr.professions); }, []))];
        const hairColorList = [...new Set(inhabitants.map(inhabitant => inhabitant.hair_color))];
        this.setState({
          professionList,
          hairColorList
        }, () => this.pagination(inhabitants, this.state.currentPage));
      })
      .catch(error => {
        console.log(error);
      });
  }

  // This method paginate the result list to a better UX. The result is filtered by the searchName input value
  pagination = (inhabitants, currentPage) => {
    const { itemsPerPage } = this.state;
    const filteredInhabitants = this.filterInhabitants(inhabitants);
    const numberOfPages = Math.ceil(filteredInhabitants.length / itemsPerPage);
    const paginatedInhabitants = filteredInhabitants.slice((itemsPerPage * currentPage) - itemsPerPage, itemsPerPage * currentPage);

    this.setState({
      inhabitants,
      numberOfPages,
      paginatedInhabitants,
      currentPage,
      isLoading: false
    })
  }

  // Helper function to filter by different parameters
  filterInhabitants = (inhabitants) => {
    const { searchName, searchAge, searchProfession, searchHairColor } = this.state;
    let filterInhabitants = [...inhabitants].filter(inhabitant => { return inhabitant.name.toLowerCase().includes(searchName.toLowerCase()) });
    filterInhabitants = [...filterInhabitants].filter(inhabitant => { return inhabitant.age.toString().includes(searchAge) });
    filterInhabitants = [...filterInhabitants].filter(inhabitant => { return (searchProfession === '') ? true : inhabitant.professions.includes(searchProfession) });
    filterInhabitants = [...filterInhabitants].filter(inhabitant => { return (searchHairColor === '') ? true : inhabitant.hair_color.includes(searchHairColor) });
    return filterInhabitants;
  }

  handleChange = (event) => {
    const { inhabitants } = this.state;
    const { name, value } = event.target;
    this.setState({ [name]: value },
      () => { this.pagination(inhabitants, 1); });
  }

  // Reset all the filtering fields
  reset = () => {
    const { inhabitants } = this.state;

    this.setState({
      searchName: '',
      searchAge: '',
      searchProfession: '',
      searchHairColor: ''
    }, () => { this.pagination(inhabitants, 1) })
  }

  render() {
    const { paginatedInhabitants,
      numberOfPages,
      currentPage,
      inhabitants,
      searchName,
      searchAge,
      searchProfession,
      searchHairColor,
      professionList,
      hairColorList,
      isLoading } = this.state;

    return (
      <div>
        <Header />
        <div className="homepage">
          <div className="homepage-container">
            <div className="homepage-searchbox u-margin-bottom-medium">
              <div className="triangle"></div>
              <input className="homepage-searchbox-name input" type="text" name="searchName" value={searchName} onChange={this.handleChange} placeholder="Filter Gnomes by name :3" />
                <div className="u-margin-top-small u-margin-bottom-small">
                  <input className="input" type="number" name="searchAge" value={searchAge} onChange={this.handleChange} placeholder="age" />
                  <span></span>
                  <select className="select" name="searchProfession" onChange={this.handleChange} value={searchProfession}>
                    <option value="">profession</option>
                    {professionList.map((profession, i) => { return <option key={i} value={profession}>{profession}</option> })}
                  </select>
                  <span></span>
                  <select className="select" name="searchHairColor" onChange={this.handleChange} value={searchHairColor}>
                    <option value="">Hair Color</option>
                    {hairColorList.map((color, i) => { return <option key={i} value={color} style={{ color, fontWeight: '700' }}>{color.toUpperCase()}</option> })}
                  </select>
                </div>
              <a className="button" href="#0" onClick={this.reset}>reset</a>
            </div>
        {paginatedInhabitants.length === 0 ? isLoading ? <div className="homepage-empty">Loading...</div> : <div className="homepage-empty">No results&nbsp;<span>:(</span> </div> : (
          <div className="homepage-resultbody">
            {paginatedInhabitants.map(inhabitant => {
              return <SearchResultCard key={inhabitant.id} inhabitant={inhabitant} getFavoriteList={() => { return null }} />
            })}
            <div className="homepage-pagination u-margin-bottom-small u-margin-top-small">
            {Array.from(Array(numberOfPages), (e, i) => {
              return (numberOfPages > 1) ?
              <a className="button" href="#0" className={currentPage === i + 1 ? 'button u-is-disabled' : 'button'} key={i} onClick={() => this.pagination(inhabitants, i + 1)}>{i + 1}</a>
              : null
            })}
            </div>
          </div>
        )}
        </div>
      </div>
      </div >
    );
  }
}

export default HomePage;
