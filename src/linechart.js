import Axios from 'axios';
import React,{useEffect,useState} from 'react'
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

function Linechart({Country,Type}) {
    let url=(Country==="worldwide")?"https://disease.sh/v3/covid-19/historical/all?lastdays=151":`https://disease.sh/v3/covid-19/historical/${Country}?lastdays=151`;
    const[labels,setlabels]=useState([]);
    const[dataset,setdataset]=useState([]);
    useEffect(() => {
        const searched=async()=>{
            const data=await Axios.get(url);
            const dates=[];
            const cases=[];
            if(Type==="cases")
            { 
                for(const date in data.data['cases']){
                    dates.push(date);
                    cases.push(data.data['cases'][date]);
                 }
            }
            else if(Type==="recovered"){
            for(const date in data.data["recovered"]){
                dates.push(date);
                cases.push(data.data["recovered"][date]);
             }}
             else if(Type==="deaths"){
             for(const date in data.data["deaths"]){
                dates.push(date);
                cases.push(data.data["deaths"][date]);
             }}
            setlabels(dates);
            setdataset(cases);
        }
        searched();
    }, [])
    useEffect(() => {
            const searched=async()=>{
            const data=await Axios.get(url);
            const dates=[];
            const cases=[];
                if(Country==="worldwide"){
                if(Type==="cases")
                { 
                    for(const date in data.data['cases']){
                        dates.push(date);
                        cases.push(data.data['cases'][date]);
                     }
                }
                else if(Type==="recovered"){
                for(const date in data.data["recovered"]){
                    dates.push(date);
                    cases.push(data.data["recovered"][date]);
                 }}
                 else if(Type==="deaths"){
                 for(const date in data.data["deaths"]){
                    dates.push(date);
                    cases.push(data.data["deaths"][date]);
                 }}
                setlabels(dates);
                setdataset(cases);
            }
        else{
             if(Type==="cases"&& data.data.timeline)
                {
                   
                    for(const date in data.data.timeline["cases"]){
                        dates.push(date);
                        cases.push(data.data.timeline["cases"][date]);
                     }
                }
                else if(Type==="recovered" &&data.data.timeline){
                for(const date in data.data.timeline["recovered"]){
                    dates.push(date);
                    cases.push(data.data.timeline["recovered"][date]);
                 }}
                 else if(Type==="deaths"&&data.data.timeline){
                 for(const date in data.data.timeline["deaths"]){
                    dates.push(date);
                    cases.push(data.data.timeline["deaths"][date]);
                 }}
                setlabels(dates);
                setdataset(cases);
            }
        }
        searched();
    }, [Country,Type]);
    let x=labels.slice(0);
    let y=[]
    for(let i=1;i<150;i++){
      y[i-1]=dataset[i]-dataset[i-1]
    }
    const data={
        labels:x,
        datasets:[
            {
                label:`Daily change in Covid-19 ${Type} in last 150 days`,
                data:y,
                backgroundColor:(Type==='cases')?"rgba(255,69,0,0.6)":(Type==='recovered')?'rgba(0,255,0,0.6)':'rgba(255,0,0,0.6)',
                borderColor:(Type==='cases')?'rgba(255,69,0,1)':(Type==='recovered')?'rgba(0,255,0,1)':'rgba(255,0,0,1)',
                borderWidth:3,
                hoverBorderColor:'rgba(0,0,0,1)',
                hoverBorderWidth:6,
                pointRadius:0,
                lineTension:0
            }
        ]
    }
    const options={
        legend:{display:false},
        elements:{
            points:{
                radius:0
            }
        },
        responsive:false,
        maintainAspectRatio:true,
        tooltips: {
            mode:'index',
            intersect: false,
            callbacks: {
              label: function (tooltipItem,data) {
               return numeral(tooltipItem.value).format("+0,0");
              },
            },
          },
        title:{
            display:true,
            text:`Daily change in Covid-19 ${Type} in last 150 days`,
            position:'bottom',
            fontSize:20,
            fontColor:(Type=='cases')?'orange':(Type=='recovered')?'green':'red'
        }, 
        scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                },
                type: "time",
                time: {
                  format: "MM/DD/YY",
                  tooltipFormat: "ll",
                },
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                },
                ticks: {
                  callback: function (value) {
                    return numeral(value).format("0a");
                  },
                },
              },
            ]
        }
    }
    return (
        <div>
            <Line data={data} options={options} height={360} width={360}/>
        </div>
    )
}

export default Linechart
