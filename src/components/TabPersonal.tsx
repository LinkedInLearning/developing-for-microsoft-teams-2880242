import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import * as appInfo from "../GeneratedAppInfo"
import Thumbnail from "./Thumbnail";
import { Dropdown, Checkbox } from '@fluentui/react-northstar'

/**
 * The 'PersonalTab' component renders the main tab content
 * of your app.
 */
class TabPersonal extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      context: {},
      category: appInfo.categories[0],
      listMode: false
    }
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context: microsoftTeams.Context) => {
      this.setState({
        context: context
      });
    });
    // Next steps: Error handling using the error object
  }

  onChange(e: any) {
    var value = e.target.value;
    if (value && value.length > 0) this.setState({ category: value });
  }

  onChangeDropdown(i: any) {
    // in FluentUI <Dropdown> component: onChange={(e,i)=>this.onChangeMode(i)}
    var value = i.value;
    if (value && value.length > 0) this.setState({ category: value });
  }

  onChangeCheckbox(i: any) {
    // in FluentUI <Checkbox> component: onChange={(e,i)=>this.onChangeMode(i)}
    this.setState({ listMode: i.checked });
  }

  render() {

    const entityId = this.state.category;

    var selector = (
      <Dropdown inline items={appInfo.categories} placeholder="Select category" onChange={(e,i)=>this.onChangeDropdown(i)} />
    );

    var pictures = <></>;
    if (entityId.length > 0) {
      for (var category in appInfo.categoryPictures) {
        if (category === entityId) {
          pictures = (
            <div>
              {appInfo.categoryPictures[entityId].map((filename: string) => <Thumbnail category={category} filename={filename} listview={this.state.listMode} />)}
            </div>
          );
          break;
        }
      }
    }

    return (
      <div id="container">
        <Checkbox label="Show as list" toggle onChange={(e,i)=>this.onChangeCheckbox(i)} />
        <h2>Pictures for the {selector} category:</h2>
        {pictures}
      </div>
    );
  }
}
export default TabPersonal;