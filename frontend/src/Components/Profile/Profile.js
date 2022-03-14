import React from 'react'
import { useParams } from 'react-router-dom'

export function Profile() {
  const { userId } = useParams();

  return (
    <div>{userId} Profile</div>
  )
};
