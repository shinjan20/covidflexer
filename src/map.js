import React from 'react'
import{MapContainer,TileLayer,useMap,CircleMarker, Popup} from 'react-leaflet';
import numeral from 'numeral';
import './map.css';
import './responsive.css';
function ChangeView({ center,zoom}) {
    const map = useMap();
    map.setView(center,zoom);
    return null;
  }
function map({Center,zoom,Countries}) {
    return(
        <div>
        <MapContainer className='map' center={Center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={Center} zoom={zoom}/>
        {Countries.map((country1)=>
        {
      return(<CircleMarker center={[country1.lat,country1.long]} fillOpacity={0.3} fillColor={'rgb(255,0,0)'} radius={Math.sqrt(Math.sqrt(country1.cases*2))*0.65}>
       <Popup>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <img src={country1.flag} style={{width:'100px'}}/>
        <div style={{fontFamily:'cursive',fontWeight:'bolder',fontSize:'15px'}}>{country1.name}</div>
        <div style={{fontFamily:'cursive'}}>Cases:<span style={{color:"rgb(255,150,0)"}}>{(country1.cases>1000)?numeral(country1.cases).format('0.0a'):country1.cases}</span></div>
        <div style={{fontFamily:'cursive'}}>Deaths:<span style={{color:"rgb(255,0,0)"}}>{(country1.deaths>1000)?numeral(country1.deaths).format('0.0a'):country1.deaths}</span></div>
        <div style={{fontFamily:'cursive'}}>Recovered:<span style={{color:"rgb(0,255,0)"}}>{(country1.recovered>1000)?numeral(country1.recovered).format('0.0a'):country1.recovered}</span></div>
        </div>
       </Popup>
        </CircleMarker>)
      })}
        <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
        </div>
    )
}

export default map
