import React, { Component } from 'react';

import Header from '../components/Header';

import brastlewarkService from '../services/BrastlewarkService';

// We receive Gnome info from Link
class GnomeDetail extends Component {
  state = {
    gnomeInfo: this.props.location.gnomeInfo
  }

  // Make a new API call only in case of state lost
  componentDidMount() {
    const { gnomeInfo } = this.state;
    if (gnomeInfo === undefined) {
      brastlewarkService.getAllHabitants()
        .then(response => {
          const inhabitants = response.data.Brastlewark;
          const gnomeInfo = inhabitants.filter(gnome => gnome.id === this.props.match.params.id * 1);
          this.setState({
            gnomeInfo: gnomeInfo[0]
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { gnomeInfo } = this.state;
    return (
      <div>
        <Header/>
        <div className="gnomedetail">
          <div className="gnomedetail-container">
            <h1 className="u-padding-top-small u-margin-bottom-small">Gnome details</h1>
            {gnomeInfo === undefined ? <div>Loading...</div> : (
              <div className="gnomedetail-card u-padding-bottom-small">
                <div className="back-button" onClick={() => this.props.history.push('/homepage')}>&#171; back</div>
                <p className="gnomedetail-card-name">{gnomeInfo.name}</p>
                <div className="gnomedetail-card-image"><img src={gnomeInfo.thumbnail} alt={gnomeInfo.name} /></div>
                <div className="gnomedetail-card-age"><p>age <span>{gnomeInfo.age}</span></p><p>w <span>{gnomeInfo.weight}</span></p><p>h <span>{gnomeInfo.height}</span></p></div>
                <div className="gnomedetail-card-friends u-margin-top-small">
                  <h2>friends</h2>
                  {gnomeInfo.friends.length === 0 
                    ? <p>Ok, ok... no time for friends, just to work</p> 
                    : <div className="gnomedetail-card-tagbody">{gnomeInfo.friends.map((friend,i) => <span key={i}>{friend}</span>)}</div>
                  }
                </div>
                <div className="gnomedetail-card-professions u-margin-top-small">
                  <h2>professions</h2>
                  {gnomeInfo.professions.length === 0 
                    ? <p>Nice life...</p> 
                    : <div className="gnomedetail-card-tagbody">{gnomeInfo.professions.map((profession,i) => <span key={i}>{profession}</span>)}</div>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default GnomeDetail;
