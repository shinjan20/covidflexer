import React from 'react';
import {useState,useEffect} from 'react';
import './App.css';
import './responsive.css';
import { FormControl, makeStyles,MenuItem,Select} from '@material-ui/core';
import Axios from 'axios';
import Statscontainer from './statscontainer';
import List from './list';
import Line from './linechart';
import Piechart from './pie';
import Map from './map';
import 'leaflet/dist/leaflet.css'
const customStyle=makeStyles(()=>({
  cardstyle:{
    backgroundColor:'steelBlue',
    display:"inline-block",
    minWidth:'300px',
    height:"65px",
    textAlign:'center',
    margin:'2px'
  },
  formstyle:{
    minWidth:'300px',
    backgroundColor:'#dfd7d7',
    border:'4px solid steelblue',
    borderRadius:'10px',
    margin:'2px'
  }
}))
function App() {
  const styles=customStyle();
  const[countries,setcountries]=useState([]);
  const[countrytobeshown,settobeshowncountry]=useState("worldwide");
  const[countrystat,setcountrystat]=useState({});  
  const[countrycenter,setcountrycenter]=useState([40.52,34.34]);
  const[zoom,setZoom]=useState(3);
  const[casetype,setcasetype]=useState('cases');
  useEffect(()=>{
    const getcountryinfo=async()=>{
      const url='https://disease.sh/v3/covid-19/all';
    const data=await Axios.get(url);
    setcountrystat(data.data);
  };
  getcountryinfo();
  },[])   
  useEffect(()=>{
    const getcountries=async()=>{
    const countries=await Axios.get('https://disease.sh/v3/covid-19/countries');
    setcountries(countries.data.map(data=>{
      return({
        name:data.country,
        value:data.countryInfo.iso2,
        iso3:data.countryInfo.iso3,
        lat:data.countryInfo.lat,
        long:data.countryInfo.long,
        flag:data.countryInfo.flag,
        cases:data.cases,
        todayCases:data.todayCases,
        deaths:data.deaths,
        todayDeaths:data.todayDeaths,
        recovered:data.recovered,
        todayRecovered:data.todayRecovered,
        active:data.active,
      })}));
  }
  getcountries();
},[]);
  const handlechange=async(e)=>{
    let url=((e.target.value)==='worldwide')?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${e.target.value}`;
    settobeshowncountry(e.target.value);
    const data=await Axios.get(url);
    setcountrystat(data.data);
    setcountrycenter((e.target.value==='worldwide')?[40.52,34.34]:[data.data.countryInfo.lat,data.data.countryInfo.long]);
    setZoom((e.target.value==='worldwide')?3:8);
  }
  return (
    <div className="App">
      <div className='first'>
      <div className='first-1'>
     <card variant="contained"className={styles.cardstyle}>
     <h1 style={{fontWeight:"bolder",fontFamily:'Roboto'}}>CovidFlexer</h1>
     <p variant="caption" style={{letterSpacing:'3px',fontSize:17,fontFamily:'arial',fontWeight:'lighter',color:'#dfd7d7'}}>Analytics made easy</p>
     </card>
     <FormControl  variant="outlined" className={styles.formstyle}>
       <Select value={countrytobeshown} onChange={handlechange}>
       <MenuItem value="worldwide">Worldwide</MenuItem>
        {countries.map(country=>{ return(<MenuItem value={country.value} key={country.iso3}>{country.name}</MenuItem>)  })}
       </Select>
     </FormControl>
     </div>
     <Map Center={countrycenter} Countries={countries} zoom={zoom} Cases={casetype} country={countrytobeshown}/>
     <div className='relation'>
     <div className='cards'>
     <Statscontainer onClick={e=>{setcasetype('cases');}} title="Total Cases" new_cases={countrystat.todayCases} total_cases={countrystat.cases} Color='orange' active={casetype==='cases'}/>
     <Statscontainer onClick={e=>setcasetype('recovered')} title="Recovery Cases" new_cases={countrystat.todayRecovered} total_cases={countrystat.recovered} Color='green' active={casetype==='recovered'}/>
     <Statscontainer onClick={e=>setcasetype('deaths')} title="Death Cases" new_cases={countrystat.todayDeaths} total_cases={countrystat.deaths} Color='red' active={casetype==='deaths'} /> 
     </div>
     <div className='graphs'>
     <Line className='line' Country={countrytobeshown} Type={casetype}/>
     <Piechart className='pie'Country={countrytobeshown}/>
     </div>
     </div>
     </div>
      <div className='second'>
        <List countries={countries}/>
     </div>
     </div>
  );
}

export default App;
