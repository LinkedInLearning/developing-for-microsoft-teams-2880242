// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import * as appInfo from "../GeneratedAppInfo"
import Thumbnail from "./Thumbnail";

/**
 * The 'PersonalTab' component renders the main tab content
 * of your app.
 */
class TabPersonal extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      context: {}
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

  render() {

    const entityId = Object.keys(this.state.context).length > 0 ? this.state.context['entityId'] : "";

    var pictures = <></>;
    if(entityId.length > 0) {
      for(var category in appInfo.categoryPictures) {
        if(category === entityId) {
          pictures = (
            <div>
              {appInfo.categoryPictures[entityId].map((filename:string) => <Thumbnail category={category} filename={filename} />)}
            </div>
            );
          break;
        }
      }
    }

    return (
      <div id="container">
        <h2>Pictures for the <em>{entityId}</em> category:</h2>
        {pictures}
      </div>
    );
  }
}
export default TabPersonal;