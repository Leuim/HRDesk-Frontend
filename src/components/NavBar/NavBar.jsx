import React, { useContext } from 'react'
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
const NavBar = () => {
  const { user } = useContext(UserContext)
  return (
    <nav>
      <ul>{user ? (
        <li><Link to='/sign-up'>Sign Up</Link></li>) :
        (<>
          <li><Link>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </>)}
      </ul>
    </nav>
  )
}

export default NavBar