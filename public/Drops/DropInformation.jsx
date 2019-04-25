import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function InformationList(props) {
  const { classes, price, purchaseDate, creator, description, volunteers } = props;

  return (
    <React.Fragment>
      <Grid item xs={12} sm={4}>
        <List>
          <ListItem>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText
              primary="Single-line item"
              secondary={secondary ? 'Secondary text' : null}
            />
          </ListItem>
        </List>
      </Grid>
    </React.Fragment>
  );
}
