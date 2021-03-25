import {Pie} from 'react-chartjs-2';
import React,{useEffect,useState} from 'react';
import Axios from 'axios';

function Piechart({Country}) {
    let url=(Country==="worldwide")?"https://disease.sh/v3/covid-19/historical/all?lastdays=1":`https://disease.sh/v3/covid-19/historical/${Country}?lastdays=1`;
    const[stats,setStats]= useState([]);
    useEffect(()=>{
     const searchinfo=async()=>{
        const res=[];
        const res2=[];
        const data=await Axios.get(url);
       for(let types in data.data){
           res.push(data.data[types]);
       }
        res.forEach(result=>{
            for(let date in result){
                res2.push(result[date]);
            }
        })
       setStats(res2);
     }
     searchinfo();
    },[])
    useEffect(() => {
        const searchinfo=(Country==='worldwide')?async()=>{
            const res=[];
            const res2=[];
            const data=await Axios.get(url);
           for(let types in data.data){
               res.push(data.data[types]);
           }
            res.forEach(result=>{
                for(let date in result){
                    res2.push(result[date]);
                }
            })
           setStats(res2);
         }:async()=>{
            const res=[];
            const res2=[];
            const res3=[];
            const data=await Axios.get(url);
            for(let types in data.data){
                res.push(data.data[types]);
            }
            const demo=res[2];
                 for(let result in demo){
                     res2.push(demo[result]);
                 }
                res2.forEach(result=>{
                    for(let date in result){
                        res3.push(result[date]);
                    }  
                })
            setStats(res3);
         }
        searchinfo();
    }, [Country])
    const options={
        legend:{display:true,position:'bottom'},
        maintainAspectRatio:true,
        title:{
            display:true,
            text:`Covid-19 Current Situation `,
            position:'bottom',
            fontSize:20,
            fontColor:'black'
        },
        responsive:false
    }
    const data={
        labels:['Total Cases','Deaths','Recoveries'],
        datasets:[{
            data:stats,
            backgroundColor:[
                'rgba(255,120,0,0.5)',
                'rgba(255,0,0,0.5)',
                'rgba(0,255,0,0.5)'
            ],
            hoverBackgroundColor:[
                'rgba(255,120,0,1)',
                'rgba(255,0,0,1)',
                'rgba(0,255,0,1)'
            ],
            borderColor:'black',
            borderWidth:3,
            hoverBorderWidth:5
        }]
    }
    return (
        <div>
          <Pie data={data} options={options} height={340}/>
        </div>
    )
}

export default Piechart;
