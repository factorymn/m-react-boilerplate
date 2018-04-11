import React from 'react';
import PropTypes from 'prop-types';

if (global.IS_BROWSER) {
  require('./PrettyPreloader.styl');
}

const cubesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PrettyPreloader = ({ color }) => (
  <div className="sk-cube-grid">
    {
      cubesArray.map((value, index) => (
        <div
          key={value}
          className={`sk-cube sk-cube${ index + 1 }`} style={color ? { backgroundColor: color } : styles.cube}
        />
      ))
    }
  </div>
);

PrettyPreloader.propTypes = {
  color: PropTypes.string
};

const styles = {
  cube: {
    backgroundColor: 'blue'
  }
};

export default PrettyPreloader;
