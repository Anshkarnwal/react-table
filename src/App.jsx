import { useEffect } from "react";
import axios from "axios"
import DataTable from "react-data-table-component";
import { useState } from "react";


const App = () => {
  const customStyles ={
    headRow:{
      style:{
        backgroundColor:"blue",
        color:"white"
      }
    },
    headcells:{
      style:{
        fontSize:"16px",
        fontWeight:'600',
        textTransform:"uppercase",

      }
    },
    cells:{
      style:{
        fontSize:"15px",
      }
    }
  }

 const column =[
  {
    name:"Country Name",
    selector:row=>row.name,
    sortable:true
  },
  {
    name:"Country Native Name",
    selector:row=>row.nativeName,
    sortable:true
  },
  {
    name:"Country Capital",
    selector:row=>row.capital,
    sortable:true
  },
  {
    name:"County Flag",
    selector:row=><img width={50} height={50} src={row.flag}/>
  },
  {
    name:"Action",
    cell:row=><button className="btn btn-primary" 
    onClick={()=>alert(row.name)}>Edit</button>
  }
 ]

 useEffect(()=>{
 const fetData = async()=>{
  axios.get('https://restcountries.com/v2/all')
  .then(res=>{
     setRecords(res.data)
     setFilterRecords(res.data)
    })
  .catch(err=>console.log(err));
 }
 fetData();
 },[])

 const [records,setRecords] =  useState([]) 
 const [filterRecords,setFilterRecords] =  useState([]) 
 const handleFilter=(event)=>{
  const newData=filterRecords.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
  setRecords(newData); 
}



  
  return (
    <>
   <div style={{}}>
    <h1>React Table</h1>
    <div style={{display:"flex", justifyContent:"right"}}>
    <input type="text" placeholder="Search..." onChange={handleFilter} style={{padding:'6px 10px'}}/>
    </div>
    <DataTable
    title="Country List"
    fixedHeader
    fixedHeaderScrollHeight="432px"
    highlightOnHover
    actions={
      <button className="btn btn-info">Export</button>
    }



     columns={column}
    data={records}
    customStyles={customStyles}
    pagination
    paginationRowsPerPageOptions={[5,10,20,30]}
    // paginationServerOptions
    selectableRowsHighlight

    selectableRows>
      
    </DataTable>
   
   </div>
    </>
  )
}

export default App