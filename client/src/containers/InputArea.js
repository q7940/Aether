import { connect } from 'react-redux';
import InputArea from '../components/InputArea';
import sendMessage from '../actions/sendMessage';

/* function mapStateToProps(state) {
  // todo
  return {
    user: 'me',
    group: 'main',
  };
} */

function mapDispatchToProps(dispatch) {
  return {
    sendMessage(message) {
      dispatch(sendMessage(message));
    },
  };
}

/* const mapDispatchToProps = {
  sendMessage,
}; */

export default connect(null, mapDispatchToProps)(InputArea);
