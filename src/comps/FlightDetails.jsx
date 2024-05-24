import React, {useRef, useState, useEffect} from 'react';
import './FlightDetails.css';
import { MdFlight } from "react-icons/md";

const FlightDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [airport, setAirPort] = useState("CYUL");

//   useEffect(() => {
//     setLoading(true);
//   }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://applications.icao.int/dataservices/api/doc7910?api_key=45f14a4b-fae7-4fa6-aa11-17ed20b6b96c&airports=${airport}&format=json`;
    // const url='https://dummy.restapiexample.com/api/v1/employees';
      const response = await fetch(url);
    //   if (0) {
        if (!response.ok) {
          throw new Error("API calls Finished please request a new key");
        }
        const result = await response.json(); //console.log(result, '<>>>>>>>')
        // console.log(result, "<<<<<<<<<<<");
        
        const airData = (result && result.length) ?  {
          lat: result[0]?.Latitude,
          long: result[0]?.Longitude,
          stateName: result[0]?.State_Name,
          location: result[0]?.Location_Name,
        } : {};
      setData(airData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

//   airData = AFTN
//   : 
//   ""
//   IATA_Code
//   : 
//   "YUL"
//   ICAO_Code
//   : 
//   "CYUL"
//   Lat
//   : 
//   "45:28:14N"
//   Latitude
//   : 
//   "45.4704611111111"
//   Location_Name
//   : 
//   "MONTREAL/PIERRE ELLIOT TRUDEAU INTL,  QC"
//   Long
//   : 
//   "073:44:27W"
//   Longitude
//   : 
//   "-73.7409305555556"
//   State_Name
//   : 
//   "CANADA"
//   Terr_code
//   : 
//   "CY"
//   codcoun
//   : 
//   "CYCanad"
//   ctry_code
//   : 
//   "CAN"

  if (loading){ 
    return (
        <center>
            <div class="loader">
                <div>
                    {/* <p>Loading...</p> */}
                </div>
                <div>
                    <div class="box box-1">
                        <div class="side-left"></div>
                        <div class="side-right"></div>
                        <div class="side-top"></div>
                    </div>
                    <div class="box box-2">
                        <div class="side-left"></div>
                        <div class="side-right"></div>
                        <div class="side-top"></div>
                    </div>
                    <div class="box box-3">
                        <div class="side-left"></div>
                        <div class="side-right"></div>
                        <div class="side-top"></div>
                    </div>
                    <div class="box box-4">
                        <div class="side-left"></div>
                        <div class="side-right"></div>
                        <div class="side-top"></div>
                    </div>
                </div>
            </div>
        </center>

    );}
  if (error) return( 
    <center>
        <div className='head'>Error: {error.message}</div>
    </center>
);
  return (
    <center className='flight-home'>
        <div className='flight-page'>
            <h1 className='flight-text'>Search for Airport <MdFlight className='icon'/></h1>
            <form  className='flight-form' onSubmit={(event) => {
                    event.preventDefault();
                    fetchData();
                }}>
                <input
                type="text"
                placeholder=" CYUL,KJFK,LFPG..."
                onChange={({ target }) => setAirPort(target.value)}
                />
                <input 
                // className='input'
                className='flight-button'
                type="submit" />
            </form>{console.log(data, 'DATAAAAAAAAA')}
            {/* <p>{JSON.stringify(data)}</p> */}
                <ul className='flight-details'>
                    {/* {data.stateName ? <li>{`State Name: ${data.stateName || ''}`}</li> : <li></li>}
                    {data.stateName ? <li>{`Latitude: ${data.lat || ''}`}</li> : <li></li>}
                    {data.stateName ? <li>{`Longitude: ${data.long || ''}`}</li> : <li></li>}
                    {data.stateName ? <li>{`Location: ${data.location || ''}`}</li> : <li></li>} */}
                    <li>{`State Name: ${data.stateName || ''}`}</li>
                    <li>{`Latitude: ${data.lat || ''}`}</li>
                    <li>{`Longitude: ${data.long || ''}`}</li>
                    <li>{`Location: ${data.location || ''}`}</li>
                </ul>
                {/* data[0]. */}
            <div>

            </div>
        </div>
    </center>
  );
}
export default FlightDetails;