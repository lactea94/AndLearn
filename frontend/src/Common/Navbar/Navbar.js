import React from 'react'
import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='profile'>Profile</NavLink>
      <NavLink to='learn'>Learn</NavLink>
      <NavLink to='community'>Community</NavLink>
    </nav>
  )
};