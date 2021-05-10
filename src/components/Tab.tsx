import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";

class Tab extends React.Component<any, { context: any }> {
  constructor(props: any) {
    super(props)
    this.state = {
      context: {}
    }
  }

  //React lifecycle method that gets called once a component has finished mounting
  componentDidMount() {
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context: microsoftTeams.Context) => {
      this.setState({
        context: context
      });
    });
  }

  render() {
    var contextRows = [];
    for (var key in this.state.context) {
      var value = this.state.context[key];
      contextRows.push(<p>{key} : {value}</p>);
    }

    return (
      <div id="container">
        <h2>Properties for the Teams context:</h2>
        {contextRows}
      </div>
    );
  }
}
export default Tab;