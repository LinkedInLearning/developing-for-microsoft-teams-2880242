import React from 'react';
import './App.css';

export default class TaskModule extends React.Component<any, any> {

  render() {
    const params = new URLSearchParams(this.props.location.search);
    const name = params.get("name");

    return (
      <div>
        <img src={"pictures/" + params.get("category") + "/" + params.get("filename")} width="530" height="400" title={name as string} alt={name as string} />
      </div>
    );
  }
}
