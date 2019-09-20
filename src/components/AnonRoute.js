/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import WithAuth from '../components/WithAuth.js';

// If exists a visitor in the localStorage, we display the homepage, otherwise, we display welcome page
const AnonRoute = (props) => {
  const { component: Component, isAllowedVisitor, user, saveVisitorName } = props;
  return (
    <>
      {isAllowedVisitor ? <Redirect to="/homepage" /> :
        <Route render={props => {
          return <Component
            user={user}
            isAllowedVisitor={isAllowedVisitor}
            saveVisitorName={saveVisitorName}
            {...props} />;
        }} />
      }
    </>
  );
};

export default WithAuth(AnonRoute);
