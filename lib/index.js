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

  componentDidMount() {
    store.on('change', grudges => {
      this.setState({ grudges });
    });
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

  createNewGrudge({offender, offense, forgivenStatus}) {
    this.setState({
      grudges: store.createGrudge({ offender, offense, forgivenStatus, id: Date.now() })
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
      <div className="grudge-item">
        <p className="grudge-offender">
          {this.props.offender}
        </p>
        <p className="grudge-offense">
          {this.props.offense}
        </p>

        <button className="button-forgiven-status" onClick={() => store.forgive(this.props.id)}>{this.props.forgivenStatus}</button>
        <button className="button-delete" onClick={() => store.destroy(this.props.id)}>Delete</button>
      </div>
    );

    return (
      <div>
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
      forgivenStatus: 'Forgive'
    };
  },

  createGrudge(e){
    e.preventDefault();
    this.props.onCreateGrudge(this.state);
    this.clearForm;
  },

  updateProperties(e){
    const { name, value } = e.target;
    this.setState({ [name]: value });
  },

  render(){
    return (
      <form className="grudge-form" onSubmit={this.createGrudge} >

        <input  type="text"
          className="offender"
          placeholder="Offender"
          name="offender"
          value={this.state.offender}
          onChange={(e) => this.updateProperties(e)}
        />

        <textarea className="offense"
          name="offense"
          value={this.state.offense}
          onChange={(e) => this.updateProperties(e)}>
        </textarea>

        <input type="submit" className="submit-create-grudge"/>
      </form>
    );
  }
});


ReactDOM.render(<GrudgeBox title="Grudge Box" />, document.querySelector('.application'));
