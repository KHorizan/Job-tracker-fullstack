import React, { useRef } from "react";
import  ReactApexChart  from "react-apexcharts";
import dayjs from "dayjs";


function ApplicationsOverTime({data}){
  const chartRef = useRef(null); 

  const last7DaysData = data.slice(-7);

 const categories = last7DaysData.map(item=>dayjs(item.date).format("DD MMM"));
 const series =[
    {
         name: "Applications",
        data: last7DaysData.map(item=>item.count),
    },
 ];


 const options={
  chart :{
    type:"area", toolbar:{show:false} },
    xaxis:{categories},
    yaxis:{title :{text:"Applications"}},
    colors: ["#5c6bc0"],

   stroke:{curve :"smooth"},
    fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.06
    }
  },
   dataLabels:{enabled:false},
  };

 return(
 
      <ReactApexChart 
       ref={chartRef}
       options={options} 
        series={series}
        type="area"
        height={300}/>
  
 );
}

export default ApplicationsOverTime;