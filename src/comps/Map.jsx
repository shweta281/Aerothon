import './Map.css'

export default function Map(){
    return (
        <center >
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
            </ul>
            <div className='map-class'>
                {/* insert map comp here */}
            </div>
        </center>
    )
}