import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

import { ReactComponent as DeckLogo } from '../../assets/deck-icon.svg'

import './header.styles.scss'

const Header = () => {

  return (
    <div className="header">
      <Link to='/' className="home-icon-container" >
        <HomeIcon sx={{ fontSize: 70 }} color='primary' />
      </Link>
      <div className="deck-logo-container">
        <Link to='/deck'>
          <DeckLogo className='deck-logo'/>
        </Link>
      </div>
    </div>
  )
}

export default Header