import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import gnome from '../images/gnome.png';

class WelcomePage extends Component {
  state = {
    name: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value.trim() });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.saveVisitorName(this.state.name);
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <div className="welcomepage">
          <div className="welcomepage-container">
            <div className="welcomepage-container-message u-margin-top-big u-margin-bottom-medium">
              <div className="triangle"></div>
              <h2>Welcome to</h2>
              <h2 className="welcomepage-container-message-name">BRASTLEWARK!</h2>
              <p>[ the gnome-town <span>:3</span> ]</p>
            </div>
            <img className="u-margin-bottom-small" src={gnome} alt={'gnome'}/>
            <form onSubmit={this.handleSubmit}>
              <input className="input u-margin-bottom-medium" type="text" name="name" value={name} onChange={this.handleChange} placeholder="Tsh! human! what's yout name?" />
              <button className={name.trim() !== '' ? "button" : "u-is-disabled button"} type="submit">Enter the town</button>
            </form>
            <Link className="jump u-margin-top-medium" to="/homepage">Meh! not now... I'll jump the wall</Link>
          </div>
        </div>
      </div >
    );
  }
}

export default WelcomePage;
