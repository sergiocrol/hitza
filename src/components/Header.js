import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

import heart from '../images/heart.svg';
import exit from '../images/exit.svg';

import WithAuth from '../components/WithAuth';


class Header extends Component {
  state = {
    redirect: false
  }

  // Delete user from the localStorage
  deleteUser = () => {
    this.props.deleteUser();
    this.setState({
      redirect: true
    })
  }

  render() {
    if(this.state.redirect) {return <Redirect to="/"/>}
    return (
      <div className="header">
        <div className="header-container">
        <Link to="/homepage" style={{ textDecoration: 'none' }}><span>BRASTLEWARK</span></Link> 
          <div> 
            <Link to="/favorites"><img src={heart} alt="favorites"/></Link> 
            { this.props.isAllowedVisitor ?
              <a onClick={this.deleteUser}><img className="header-container-exit" src={exit} alt="logout" /></a>
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default WithAuth(Header);
