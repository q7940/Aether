import React, { PureComponent, PropTypes } from 'react';
import Immutable from 'immutable';
import { autobind } from 'core-decorators';
import { Link } from 'react-router';
import Styles from './Login.css';

@autobind
export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showErr: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.err.get('code')) {
      this.setState({ showErr: true });
    }
  }
  componentDidUpdate() {
    if (this.state.showErr) {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => { this.setState({ showErr: false }); }, 2000);
    }
  }
  syncUsername(e) {
    this.setState({ username: e.target.value });
  }
  syncPassword(e) {
    this.setState({ password: e.target.value });
  }
  handleLogin() {
    this.props.login({
      username: this.state.username.trim(),
      password: this.state.password.trim(),
    });
  }
  render() {
    let err;
    const code = this.props.err.get('code');
    if (code === 1) {
      err = '密码错误!';
    } else if (code === 2) {
      err = '用户不存在!';
    } else if (code === 4) {
      err = '用户名和密码不能为空!';
    }
    return (
      <div className={Styles.wrap}>
        <div className={`${Styles.err}`} >
          <span className={`${Styles.info} ${this.state.showErr ? Styles.show : Styles.hide}`}>{err}</span>
        </div>
        <label
          htmlFor="loginUsername"
          className={Styles.label}
        >
          <i className={`iconfont icon-username ${Styles.icon}`} />
          <input
            id="loginUsername"
            type="text"
            className={Styles.input}
            placeholder="username"
            onChange={this.syncUsername}
            value={this.state.username}
          />
        </label>
        <label
          htmlFor="loginPassword"
          className={Styles.label}
        >
          <i className={`iconfont icon-password ${Styles.icon}`} />
          <input
            id="loginPassword"
            type="password"
            className={Styles.input}
            placeholder="password"
            onChange={this.syncPassword}
            value={this.state.password}
          />
        </label>
        <input
          type="button"
          className={Styles.submit}
          value="登录"
          onClick={this.handleLogin}
        />
        <Link className={Styles.link} to="/signup">没有账号？立即注册</Link>
      </div>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  err: PropTypes.instanceOf(Immutable.Map),
};
