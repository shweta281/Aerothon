import react from 'react'
import Side from "./Side"
import './Dashboard.css'
import Map from './Map'

export default function Dashboard(){
    return (
        <div className={'dash-space'}>
            <Side/>
            <Map />
        </div>
    )
}