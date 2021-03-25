const sortdata=(data)=>{
    const sorteddata=[...data];
    return sorteddata.sort((a,b)=>(a.cases>b.cases)?-1:1);
}
export default sortdata;