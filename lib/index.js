const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store');

require('./reset.css');
require('./style.scss');

const GrudgeBox = React.createClass({
  getInitialState() {
    return {
      grudges: store.all()
    };
  },

  render() {
    return(
      <div class="container">
        <h1>Never Forget</h1>
        <GrudgeList grudges={this.state.grudges}/>
      </div>
    );
  }
});

const GrudgeList = React.createClass({

  createNewGrudge({offender, offense}) {
    this.setState({
      grudges: store.createGrudge({ offender, offense, id: Date.now() })
    });
  },

  render() {

    const grudgeComponents = this.props.grudges.map(grudge => {
      return <GrudgeItem {...grudge} key={grudge.id}/>;
    });

    return (
      <div className="grudge-list">
        <h2>Grudges</h2>
        <GrudgeForm onCreateGrudge={this.createNewGrudge} />
        {grudgeComponents}
      </div>
    );
  }

});

const GrudgeItem = React.createClass ({
  render() {
    let grudgeInfo = (
      <div>
        <p className="grudge-offender">
          {this.props.offender}
        </p>
        <p className="grudge-offense">
          {this.props.offense}
        </p>
      </div>
    );

    return (
      <div className="grudge-item">
        {grudgeInfo}
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
        <input type="submit" className="submit-create-grudge"/>
      </form>
    );
  }
});


ReactDOM.render(<GrudgeBox title="Grudge Box" />, document.querySelector('.application'));
