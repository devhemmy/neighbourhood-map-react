import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';
import { MAP_KEY } from '../data/credentials';
import { mapStyles } from '../data/mapStyles.js';
import ListView from './ListView';
import foursquare from '../images/foursquare.png';

class App extends Component {

  // define the default proptypes for component
  static propTypes = {
    map: PropTypes.object,
    infowindow: PropTypes.object,
    bounds: PropTypes.object,
    mapCenter: PropTypes.object,
    mapReady :PropTypes.bool,
    mapError :PropTypes.bool
  }

  // component state
  state = {
    listOpen: true,
    map: {},
    infowindow: {},
    bounds: {},
    mapReady: false,
    mapCenter : { lat: 27.2578957, lng: 33.8116067 },// for future use when add location search
    mapError: false,
    width: window.innerWidth
  }

  // using the component life cycle
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillReceiveProps({isScriptLoadSucceed}){

    // Check if script is loaded and if map is defined
    if (isScriptLoadSucceed && !this.state.mapReady && MAP_KEY == "" || MAP_KEY == "AIzaSyAOyaSkquBkYcGxPsSunyRaT7e3GQDixnA" ) {

      // create map
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: this.state.mapCenter,
        styles: mapStyles
      });

      // set up bounds and infowindow to use later
      const bounds = new window.google.maps.LatLngBounds();
      const infowindow = new window.google.maps.InfoWindow({maxWidth: 300});

      this.setState({
        map: map,
        infowindow: infowindow,
        bounds: bounds,
        mapReady: true,
      });

    // alert user if map request fails
    } else if ( !this.state.mapReady ) {
      alert("Map did not load please check the console for more details")
      console.log("there was a problem with the map key please remove the key or use the original one");
      this.setState({mapError: true});
    }
  }

  toggleList = () => {

    const { width, listOpen, infowindow } = this.state;

    if (width < 600) {
      // close infowindow if listview is opening
      if (!listOpen) {
        infowindow.close();
      }
      this.setState( { listOpen: !listOpen});
    }
  }

  updateWidth = () => {
    const { map, bounds } = this.state;
    this.setState( { width: window.innerWidth });
    if (map && bounds) {
      map.fitBounds(bounds)
    }
  }

  render() {

    const { listOpen, map, infowindow, bounds, mapReady, mapCenter, mapError } = this.state;

    return (
      <div className="container" role="main">
        <nav id="list-toggle" className="toggle" onClick={this.toggleList}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
          </svg>
        </nav>
        <section
          id="restaurant-list"
          className={ listOpen ? "list open" : "list"}
          role="complementary"
          tabIndex={ listOpen ? '0' : '-1' }
          >
          <h1 className="app-title">Hemmy In Hurghada</h1>

          { /* render markers only when map has loaded */
            mapReady ?
            <ListView
              map={map}
              infowindow={infowindow}
              bounds={bounds}
              mapCenter={mapCenter}
              toggleList={this.toggleList}
              listOpen={listOpen}
            />
            // Show error message id map didn't load
            : <p>We are experiencing loading issues. Please check your internet connection</p>
          }

          <img src={foursquare} className="fs-logo" alt="foursquare" />
        </section>
        <section id="map" className="map" role="application">
          { mapError ?  // Show error message id map didn't load
            <div id="map-error" className="error" role="alert">
              Google Maps did not load.  Please try again later...
            </div>

              // load the map

            : <div className="loading-map">
                <h4 className="loading-message">Map is loading...</h4>

             </div>
        }

        </section>
      </div>
    );
  }
}

export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}`]
)(App);
