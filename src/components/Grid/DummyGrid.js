import React from 'react';
import PropTypes from 'prop-types';

function DummyCollection({ collections }) {
  let collection = []
  for (let i = 0; i < (5 - collections.length); i++) {
    collection.push(<div key={`dummy ${i}`} />);
  }
  return collection
}

DummyCollection.propTypes = {
  collections: PropTypes.array,
};


export default DummyCollection;