if (global.IS_BROWSER) {
  require('./HomePage.styl');
}

import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

@connect(state => ({
  homePage: state.homePageReducer
}))
export default class HomePage extends Component {
  static propTypes = {
    homePage: PropTypes.object
  };

  render() {
    // const { features } = this.props.homePage;

    return (
      <div className="c-home-page-root">
        <Helmet>
          <title>Manufactura react boilerplate</title>
          <meta property="og:title" content="Manufactura boilerplate" />
          <meta property="og:image" content="http://factory.mn/freeze/uUVpNVS2rspdiyDx-6nOkyIct4A.jpg" />
          <meta property="og:description" content="Boilerplate with server side rendering" />
        </Helmet>
        <div className="header">
          <h1>M-React-Boilerplate</h1>
          <p>
            Starter boilerplate app for React/Redux stack with server side rendering. Focused on reaching optimal developer experience.
          </p>
        </div>
        <hr/>
        <h2>Installation</h2>
        <pre>
          yarn   <span className="dim"># (or `npm install` if you prefer npm)</span>
        </pre>
        <h2>Features</h2>
        <ul>
          {
            features.length && features.map(feature => (
              <li key={feature.name}>
                <h3>
                  {feature.title}
                </h3>
                {
                  feature.image && <img src={feature.image} alt={feature.title} />
                }
                <div>
                  {feature.description}
                </div>
              </li>
            ))
          }
        </ul>
        <h2>Compile product build and run server</h2>
        <pre>
          yarn run prod   <span className="dim"># (or `npm run prod` if you prefer npm)</span>
        </pre>
      </div>
    );
  }
}

const features = [
  {
    name: 'reactjs',
    title: 'React JS',
    description: 'React JS is a declarative, efficient, and flexible JavaScript library for building user interfaces.'
  },
  {
    name: 'redux',
    title: 'Redux',
    description: 'Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.'
  },
  {
    name: 'webpack',
    title: 'Webpack v4',
    description: 'Webpack is a module bundler for modern JavaScript applications. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into a small number of bundles - often only one - to be loaded by the browser.'
  },
  {
    name: 'splitting',
    title: 'Code splitting',
    image: 'https://raw.githubusercontent.com/factorymn/m-react-boilerplate/master/images/code-splitting.gif',
    description: (
      <div>
        Code splitting is one of the most compelling features of webpack.
        This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel.
        It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly,
        can have a major impact on load time.
        Check how it works, open Dev Tools, go to "Network" tab, set "JS" filter and
        click <Link to="/about">go to About page</Link> the browser will load a new JS file which contains the code
        for the new page. In this case, our user will load only the code-chunks that are actually needed for showing the page.
      </div>
    )
  },
  {
    name: 'hmr',
    title: 'Hot module replacement',
    description: 'Hot Module Replacement (HMR) improves the development experience by automatically updating modules in the browser at runtime without needing a whole page refresh. This means that application state can be retained as you change small things. We use React Hot Loader for advanced'
  },
  {
    name: 'ssr',
    title: 'Server Side Rendering',
    description: 'Server Side Rendering (SSR) is the process of taking a client-side JavaScript Framework website and rendering it to static HTML and CSS on the server. Why is this important? We all want fast loading websites and SSR is a tool to help you get your website rendered faster.',
  },
  {
    name: 'stylus',
    title: 'Stylus',
    description: 'Stylus - a dynamic stylesheet preprocessor language providing an efficient, dynamic, and expressive way to generate CSS.'
  },
  {
    name: 'helmet',
    title: 'react-helmet',
    description: 'react-helmet - a document head manager for React with server sider rendering support.'
  }
];