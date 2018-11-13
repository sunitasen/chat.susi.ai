import React, { Component } from 'react';
import Translate from '../../Translate/Translate.react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import urls from '../../../utils/urls';
import PropTypes from 'prop-types';

export default class ShareOnSocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        margin: 20,
        width: '220px',
      },
      loginStatus: 'not connected',
    };
  }

  facebookLoginAPI = () => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '136831073699181',
        cookie: true,
        xfbml: true,
        version: 'v2.11',
      });
      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  componentDidMount() {
    this.facebookLoginAPI();
  }

  testAPI = () => {
    window.FB.api('/me', function(response) {});
    this.setState({ loginStatus: 'connected' });
  };

  statusChangeCallback = response => {
    if (response.status === 'connected') {
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      console.log("You're not authorized.");
    } else {
      console.log("You're not authorized.");
    }
  };

  checkLoginStatus = () => {
    window.FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  };

  facebookLogin = () => {
    window.FB.login(this.checkLoginStatus);
  };

  Share = () => {
    if (
      this.state.loginStatus === 'connected' ||
      this.state.loginStatus === 'not connected'
    ) {
      window.FB.ui(
        {
          method: 'share',
          href: urls.CHAT_URL,
          caption: 'SUSI by FOSSASIA',
          hashtag: '#FOSSASIA',
          quote: 'Lets chat with susi, the open source personal assistant',
        },
        function(response) {},
      );
    }
  };

  render() {
    const styles = {
      buttonDiv: {
        marginTop: '10px',
        marginBottom: '0px',
        fontSize: '15px',
        fontWeight: 'bold',
      },
    };

    return (
      <div style={this.props.divStyle}>
        <div>
          <div>
            <div style={styles.buttonDiv}>
              <Translate text="Share about SUSI on Facebook" />
              <br />
              <RaisedButton
                label={<Translate text="Share on Facebook" />}
                style={this.state.style}
                backgroundColor="#3B5998"
                labelColor="#fff"
                icon={<FontIcon className="fa fa-facebook" />}
                keyboardFocused={false}
                onTouchTap={this.Share}
              />
            </div>
            <div style={styles.buttonDiv}>
              <Translate text="Share about SUSI on Twitter" />
              <br />
              <RaisedButton
                label={<Translate text="Share on Twitter" />}
                style={this.state.style}
                backgroundColor="#00aced"
                labelColor="#fff"
                icon={<FontIcon className="fa fa-twitter twitterIcon" />}
                keyboardFocused={false}
                onClick={() =>
                  window.open(
                    'https://twitter.com/intent/tweet?text=Let%27s%20chat%20with%20SUSI,%20the%20Open%20Source%20personal%20assistant!%0Ahttps%3A%2F%2Fsusi.ai.%20It%27s%20awesome%20%23susiai!%0A@susiai_',
                    '_blank',
                  )
                }
              />
            </div>
            <div style={styles.buttonDiv}>
              <Translate text="Share about SUSI on Google +" />
              <br />
              <RaisedButton
                label={<Translate text="Share on Google+" />}
                style={this.state.style}
                backgroundColor="#d34836"
                labelColor="#fff"
                icon={<FontIcon className="fa fa-google-plus" />}
                keyboardFocused={false}
                onClick={() =>
                  window.open(
                    `https://plus.google.com/share?url=${urls.CHAT_URL}`,
                    '_blank',
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShareOnSocialMedia.propTypes = {
  divStyle: PropTypes.object,
};

// Resources:
// https://developers.facebook.com/docs/facebook-login/web
// https://developers.facebook.com/docs/sharing/reference/share-dialog
// https://developers.facebook.com/docs/sharing/reference/feed-dialog
// https://developers.facebook.com/docs/javascript/quickstart
