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
        <GrudgeList />
      </div>
    );
  }
});

const GrudgeList = React.createClass({

  createNewGrudge({offender, offense}) {
    this.setState({
      grudges: grudges.concat({ offender, offense, id: Date.now() })
    });
  },

  render() {
    return (
      <div className="grudge-list">
      <h2>Grudges</h2>
      <GrudgeForm onCreateGrudge={this.createNewGrudge} />
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

  createGrudge(e){
    e.preventDefault();
    this.props.onCreateGrudge(this.state);
    this.clearForm;
  },

  render(){
    return (
      <form className="grudge-form" onSubmit={this.createGrudge} >
        <input type="text" className="offender" placeholder="Offender" name="offender"/>
        <textarea className="offense" name="offense"></textarea>
        <button className="button-forgiven">Forgive</button>
        <button className="button-unforgiven">Un-Forgive</button>
        <input type="submit" className="create-grudge-submit"/>
      </form>
    );
  }
});


ReactDOM.render(<GrudgeBox title="Grudge Box" />, document.querySelector('.application'));
