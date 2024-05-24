import './Map.css'
import MapContainer from './MapContainer'

export default function Map(){
    return (
        <center className='map-container'>
            <ul className='search-list'>
                <li>
                    <div class="InputContainer">
                        <input placeholder="Source.." id="input" class="input" name="text" type="text"/>
                    </div>
                </li>
                <li>
                    <div class="InputContainer">
                        <input placeholder="Destination.." id="input" class="input" name="text" type="text"/>
                    </div>
                </li>
                <li>
                    <div >
                        <input placeholder="Destination.." class='map-button' name="text" type="submit"/>
                    </div>
                </li>

            </ul>
            <div className='map-class'>
                <MapContainer/>
                {/* insert map comp here */}
            </div>
        </center>
    )
}