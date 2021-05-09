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
      context: {},
      category: appInfo.categories[0],
      liked: [] // array of liked images
    }
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    // Get the user context from Teams and set it in the state
    microsoftTeams.getContext((context: microsoftTeams.Context) => {
      this.setState({
        context: context,
        liked: ["Aircraft_Wing__picturematic.com.jpg", "barley_field__picturematic.com.jpg"]
      });
    });
    // Next steps: Error handling using the error object
  }

  onChange(e: any) {
    var value = e.target.value;
    if (value && value.length > 0) this.setState({ category: value });
  }

  onChangeLike(like: Boolean, filename: string) {
    console.log("onChangeLike");
    if(like) {
      var newliked = this.state.liked;
      newliked.push(filename);
      this.setState({liked: newliked});
    }
    else {
      this.setState({liked: this.state.liked.filter((v:string) => v != filename)});
    }
  }

  render() {

    const entityId = this.state.category;

    var selector = (
      <select onChange={e => this.onChange(e)} value={this.state.category}>
        {appInfo.categories.map(category => <option>{category}</option>)}
      </select>
    );
    
    var pictures = <></>;
    if (entityId.length > 0) {
      for (var category in appInfo.categoryPictures) {
        if (category === entityId) {
          pictures = (
            <div>
              {appInfo.categoryPictures[entityId].map((filename: string) => <Thumbnail category={category} filename={filename} liked={this.state.liked.includes(filename)} onChangeLike={(l: Boolean, f: string)=>this.onChangeLike(l,f)} />)}
            </div>
          );
          break;
        }
      }
    }

    return (
      <div id="container">
        <h2>Pictures for the {selector} category:</h2>
        {pictures}
      </div>
    );
  }
}
export default TabPersonal;