import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import Layout from "components/layout";

const container = document.getElementById( "root" )

const root = ReactDOMClient.createRoot( container );

root.render( <Router>
    <Layout>
        <App/>
    </Layout></Router> );
