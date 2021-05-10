import React from 'react';
import * as microsoftTeams from "@microsoft/teams-js";
import { Checkbox, Button } from '@fluentui/react-northstar'
import './App.css';

export default class TaskModule extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state = {
      liked: false
    }
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const liked = params.get("liked");
    if(liked !== undefined) this.setState({ liked: liked==="true" });
  }

  onChangeCheckbox(i: any) {
    // in FluentUI <Checkbox> component: onChange={(e,i)=>this.onChangeMode(i)}
    this.setState({ liked: i.checked });
  }

  onClickButton() {
    var result = this.state.liked ? "true" : "false";
    microsoftTeams.tasks.submitTask(result);
  }

  render() {
    const params = new URLSearchParams(this.props.location.search);
    const name = params.get("name");

    return (
      <div>
        <img className="preview" src={"pictures/" + params.get("category") + "/" + params.get("filename")} width="530" height="400" title={name as string} alt={name as string} />
        <div className="controls">
            <Checkbox label="Like this" checked={this.state.liked} toggle onChange={(e, i) => this.onChangeCheckbox(i)} />
            <span className="spacer" />
            <Button content="Done" primary onClick={() => this.onClickButton()} />
        </div>
      </div>
    );
  }
}
