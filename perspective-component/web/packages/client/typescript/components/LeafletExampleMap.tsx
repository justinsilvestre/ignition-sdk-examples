import * as React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

type State = {
  lat: number;
  lng: number;
  zoom: number;
};

type Props = {
  height: number;
};

export class SimpleExample extends React.Component<Props, State> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };

  render() {
    const position: [number, number] = [this.state.lat, this.state.lng];
    const { height } = this.props;
    
    return (
      <Map center={position} zoom={this.state.zoom} style={{ height: `${height}px` }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> 
      </Map>
    );
  }
}
