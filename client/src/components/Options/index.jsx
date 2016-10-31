import React, { Component, PropTypes } from 'react';
import Styles from './Options.css';

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.logout();
  }
  render() {
    let notification;
    let notificationClass;
    if (!this.props.allowNotification) {
      notification = '开启桌面通知';
      notificationClass = 'icon-info-off';
    } else {
      notification = '关闭桌面通知';
      notificationClass = 'icon-info-on';
    }
    let sound;
    let soundClass;
    if (!this.props.allowSound) {
      sound = '开启声音';
      soundClass = 'icon-sound-off';
    } else {
      sound = '关闭声音';
      soundClass = 'icon-sound-on';
    }
    return (
      <div
        className={Styles.mask}
        onClick={this.props.handleDisplayPanel}
      >
        <ul
          className={Styles.panel}
          style={this.props.location}
        >
          <li>
            <button
              className={`${Styles.option}`}
              onClick={this.props.launchChat}
            >
              <i className={`iconfont icon-group ${Styles.icon}`} />
              发起聊天
            </button>
          </li>
          <li>
            <button
              className={`${Styles.option}`}
              onClick={this.props.switchNotification}
            >
              <i className={`iconfont ${notificationClass} ${Styles.icon}`} />
              {notification}
            </button>
          </li>
          <li>
            <button
              className={`${Styles.option}`}
              onClick={this.props.switchSound}
            >
              <i className={`iconfont ${soundClass} ${Styles.icon}`} />
              {sound}
            </button>
          </li>
          <li>
            <a
              className={`${Styles.option}`}
              href="https://github.com/oddTick/Aether"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`iconfont icon-github ${Styles.icon}`} />
              源码
            </a>
          </li>
          <li>
            <button
              className={`${Styles.option}`}
              onClick={this.logout}
            >
              <i className={`iconfont icon-quit ${Styles.icon}`} />
              退出
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
Options.propTypes = {
  allowNotification: PropTypes.bool.isRequired,
  allowSound: PropTypes.bool.isRequired,
  handleDisplayPanel: PropTypes.func.isRequired,
  location: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }),
  launchChat: PropTypes.func.isRequired,
  switchNotification: PropTypes.func.isRequired,
  switchSound: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};