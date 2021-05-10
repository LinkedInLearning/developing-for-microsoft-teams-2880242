import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import * as appInfo from "../GeneratedAppInfo"

/**
 * The 'Config' component is used to display your group tabs
 * user configuration options.  Here you will allow the user to 
 * make their choices and once they are done you will need to validate
 * their choices and communicate that to Teams to enable the save button.
 */
class TabConfig extends React.Component<any, any> {
  constructor(props: any){
    super(props)
    this.state = { category: appInfo.categories[0] };
  }

  componentDidMount() {
    microsoftTeams.settings.getSettings(settings => {
      if(settings.entityId && settings.entityId.length > 0)
        this.setState({ category: settings.entityId });
    });
  }

  render() {
    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
      const baseUrl = `https://${window.location.hostname}:${window.location.port}`;
      microsoftTeams.settings.setSettings({
        "suggestedDisplayName": "Context",
        "entityId": "",
        "contentUrl": baseUrl + "/tab",
        "websiteUrl": baseUrl + "/tab"
      });
      saveEvent.notifySuccess();
    });

    // enable the save button in the configuration page
    microsoftTeams.settings.setValidityState(true);

    return (
      <div>
        <h1>Nothing to see here...</h1>
      </div>
    );
  }
}

export default TabConfig;