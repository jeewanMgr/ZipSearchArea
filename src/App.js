import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


const URL ='http://ctp-zip-api.herokuapp.com/zip/';


function City(props) {
 // const {city, usstate,population,location} = this.props;
 const{namecity,statename,locationlong,locationlat,population,totalwage} = props;
  return(
    <div className="align-content-center">
    <div className="card-deck">
         <div className="card text-white bg-info mb-3">

            
              <div className="card-header text-center ">
                {namecity}
              </div>
              <ul>
              <div className="card-body">
                      <li>State:{statename}</li>
                      <li>Location: ({locationlat}, {locationlong})</li>
                      <li>Population (estimated):{population}</li>
                      <li>Total Wages: {totalwage}</li>
               </div>
               </ul>
         
        </div>  
</div>
</div>);

}

function Countsize(data)
{
  return data.length;
}

function ZipSearchField(props)  {
   return (
     <div className="Cetner" style={{padding:20}}>
   <div className="container text-center">
      <strong className="textinput">Enter your zip: </strong>
      
        <input type ="text" title="Enter Zip Code" placeholder="enter a zip code"  name= 'ZipCode' onChange ={props.eventHandler}/>
      
     </div>
     </div>
     );
}
function ErrorComponent()
{
  return (
    <div className="alert alert-success text-center" role="alert"  style={{padding:10}}>
    <h4 className="alert-heading">Zip Code Error!!!!!!!!!</h4>
    <p>Please check you Zip code and try again!!!!!!!!!!!</p>
     
    <p className="mb-0">Thanks for using jeewan Thapa Magar Zip search City Area.</p>
        <p>Thank to CUNY Tech Preap..</p>
        <button onClick="ZipSearchField()" > Return </button>
  </div>
  )
}

class FetchData extends React.Component{
   state ={
     isZipCodeFound : true,
     error : null,
     dataBody: []
   }
   
   GetData(event){
    let anotherinput = event.target.value;
    this.setState(
      {
      [event.target.name] : event.target.value,
      })
    // this.setState({isZipCodeFound:true})
     if(Countsize(anotherinput)!==5)
     {
       // console.log("enter your 5 digit zip code");
     } else
     { 
     fetch(URL+anotherinput)
       .then(respond=>respond.json())
       .then(Listdata=>{
        this.setState({
          dataBody:Listdata,
          isZipCodeFound:false
        })
       })
       .catch(event=> 
        {
          console.log("error");
          this.setState({
            isZipCodeFound:'false'
          })
        }
        )
      }
   }

 render(){
    if(this.state.isZipCodeFound === 'false'){
        return( <ErrorComponent />);
    } else {
        
    }

   return (
     <div className="datalisted">
       <ZipSearchField  eventHandler={(e)=>this.GetData(e) } />
         <div className="row justify-content-md-center" >
         {
         this.state.dataBody.map((list,RecordNumber)=>(
          
            <div className="col col-md-3 col-sm " key ={RecordNumber}>
                <City  
                namecity ={list.City}
                statename={list.State} 
                locationlong ={list.Long} 
                locationlat ={list.Lat}
                population ={list.EstimatedPopulation}
                totalwage={list.TotalWages}
                />
             </div>
           
         ))
        }
         </div>
      
     </div>
   )
 }  
  
}

class App extends Component {
   
  render()
   { 
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
         <FetchData />  
      </div>
    
    )  
  }
}

export default App;
