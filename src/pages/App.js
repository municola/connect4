import React from 'react';
import { Helmet } from 'react-helmet';

import favicon from '../static/favicon.png';
import Lobby from '../containers/Lobby.js';

export default function App() {
  return (
    <div>
      <Lobby />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Connect Four</title>
        <link rel="icon" href={favicon} />
      </Helmet>
    </div>
  );
}
