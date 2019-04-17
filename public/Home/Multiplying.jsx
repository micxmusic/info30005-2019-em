import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/index';
import { Button } from '@material-ui/core';

function Multiplying(props) {
  const { aboveButtonText, buttonText } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {aboveButtonText}
      </Typography>
      <Button variant="contained" color="primary">
        {buttonText}
      </Button>
    </React.Fragment>
  );
}

Multiplying.propTypes = {
  aboveButtonText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Multiplying;
