import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import './Side.css'
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdFlight } from "react-icons/md";

export default function Side(){
  return(
    <Sidebar >
        <Menu >
          {/* <SubMenu label="Charts" >
            <MenuItem> Map </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu> */}
          <MenuItem ><Link to="/dash" className={'link-map'}><FaMapMarkedAlt className='icon'/>  Map</Link></MenuItem>
          <MenuItem><Link to="/flite" className={'link-flight'}><MdFlight className='icon'/> Airport Details</Link></MenuItem>
        </Menu>
      </Sidebar>
  )
}
