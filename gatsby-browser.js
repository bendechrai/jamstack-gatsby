// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"

import React from 'react';
import PropTypes from 'prop-types';
import { Auth0Provider } from './src/components/auth/auth0-wrapper';

const onRedirectCallback = appState => {
  // route the user to the right place after login
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const Auth0Domain = process.env.AUTH0_DOMAIN || process.env.GATSBY_AUTH0_DOMAIN;
const Auth0ClientID = process.env.AUTH0_CLIENT_ID || process.env.GATSBY_AUTH0_CLIENT_ID;
const Auth0Audience = process.env.AUTH0_AUDIENCE || process.env.GATSBY_AUTH0_AUDIENCE;
const Auth0RedirectURI = process.env.AUTH0_CALLBACK_URL || process.env.GATSBY_AUTH0_CALLBACK_URL;

export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={Auth0Domain}
    client_id={Auth0ClientID}
    audience={Auth0Audience}
    redirect_uri={Auth0RedirectURI}
    onRedirectCallback={onRedirectCallback}
  >
    {element}
  </Auth0Provider>
);

wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired,
};