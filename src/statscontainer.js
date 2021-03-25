import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react'
import './App.css';
function statscontainer({title,new_cases,Color,total_cases,active,...props}) {
    return (
        <div onClick={props.onClick} className={active&&`active`} >
            <Card style={{width:'340px',height:'170px',
    opacity:(active)?1:0.2,
    boxShadow:" 0 0 5px 5px #888888",
    cursor:'pointer'}}>
                <CardContent>
                    <Typography variant="h4" color="textPrimary">
                       <strong>{title}</strong>
                    </Typography>
                    <Typography color="textPrimary" variant="h4">
                      {total_cases}
                    </Typography>
                    <h2 style={{color:Color,fontFamily:"Roboto"}}>
                     {(new_cases)?"+"+new_cases:""}
                    </h2>
                </CardContent>
            </Card>
        </div>
    )
}

export default statscontainer;
