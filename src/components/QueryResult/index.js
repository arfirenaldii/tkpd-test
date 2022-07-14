import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Loading from '../Loading';

/**
 * Query Results conditionally renders Apollo useQuery hooks states:
 * loading, error or its children when data is ready
 */
const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return (
      <SpinnerContainer>
        <Loading />
      </SpinnerContainer>
    );
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

QueryResult.propTypes = {
  show: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  children: PropTypes.node,
};

export default QueryResult;

/** Query Result styled components */
const SpinnerContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '80vh',
});
