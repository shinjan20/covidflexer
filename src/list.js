import React from 'react';
import {Card, CardContent, Typography,makeStyles} from '@material-ui/core';
import numeral from 'numeral';
import sortdata from './sort';
import './App.css';
const usestyles=makeStyles({
cardstyle:{
    overflow:'auto',height:"1400px",
    boxShadow:" 0 0 5px 5px #888888",
    backgroundColor:'rgba(70,130,180,0.8)',
    margin:'10px',
    maxWidth:'450px'
}
})
function list({countries}) {
    const data=sortdata(countries);
    const styles=usestyles();
    return (
        <div>
            <Card className={styles.cardstyle}>
             <CardContent>
                 <Typography variant="h6" style={{textAlign:"center",textDecoration:"underline"}}>Country-wise Current Stats</Typography>
                 <tr>
                 <td><Typography variant="subtitle1">Country</Typography></td>
                 <td><Typography variant="subtitle1">Total Cases</Typography></td>
                 <td><Typography variant="subtitle1">Total Deaths</Typography></td>
                 <td><Typography variant="subtitle1">Total Recoveries</Typography></td>
                 </tr>
                     {
                      data.map((country)=>{
                         return( 
                         <tr>
                         <td><h4 style={{fontFamily:"Roboto"}}>{country.name}</h4></td>
                         <td><Typography variant="subtitle2">{(country.cases>1000)?numeral(country.cases).format('0.0a'):country.cases}</Typography></td>
                         <td><Typography variant="subtitle2">{(country.deaths>1000)?numeral(country.deaths).format('0.0a'):country.deaths}</Typography></td>
                         <td><Typography variant="subtitle2">{(country.recovered>1000)?numeral(country.recovered).format('0.0a'):country.recovered}</Typography></td>
                         </tr>
                         )
                     })}
             </CardContent>
            </Card>
        </div>
    )
}

export default list
