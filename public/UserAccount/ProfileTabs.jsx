import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ChangeAvatar from './ChangeAvatar';
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    margin: `${theme.spacing.unit * 9}px ${theme.spacing.unit * 12}px ${theme.spacing.unit *
      1}px  ${theme.spacing.unit * 1}px`,
  },
});

class ProfileTabs extends React.Component {
  state = { activeIndex: 0 };

  handleChange = (_, activeIndex) => this.setState({ activeIndex });
  render() {
    const { activeIndex } = this.state;
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <VerticalTabs value={activeIndex} onChange={this.handleChange}>
          <MyTab label="E-mail" />
          <MyTab label="Password" />
          <MyTab label="Profile Picture" />
        </VerticalTabs>

        {activeIndex === 0 && (
          <TabContainer>
            <ChangeEmail />
          </TabContainer>
        )}
        {activeIndex === 1 && (
          <TabContainer>
            <ChangePassword />
          </TabContainer>
        )}
        {activeIndex === 2 && (
          <TabContainer>
            <ChangeAvatar />
          </TabContainer>
        )}
      </div>
    );
  }
}

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    display: 'none',
  },
}))(Tabs);

const MyTab = withStyles(theme => ({
  selected: {
    color: '#9966FF',
    borderBottom: '2px solid #9966FF',
  },
}))(Tab);

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 24 }}>
      {props.children}
    </Typography>
  );
}

export default withStyles(styles, { withTheme: true })(ProfileTabs);
