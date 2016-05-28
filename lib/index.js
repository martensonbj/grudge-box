const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store');

require('./reset.css');
require('./style.scss');

const GrudgeBox = React.createClass({

  render() {
    return(
      <div class="container">
        <h1>Never Forget</h1>
        <GrudgeForm />
      </div>
    );
  }
});

const GrudgeForm = React.createClass ({
  getInitialState(){
    return {
      offender: '',
      offense: '',
    };
  },

  render(){
    return (
      <form className="grudge-form">
        <input type="text" className="offender" placeholder="Offender" name="offender"/>
        <textarea className="offense-committed" name="offense"></textarea>
        <button className="button-forgiven">Forgive</button>
        <button className="button-unforgiven">Un-Forgive</button>
      </form>
    );
  }
});

ReactDOM.render(<GrudgeForm title="Grudge Form" />, document.querySelector('.application'))
