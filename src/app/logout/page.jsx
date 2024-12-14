'use client'

import React, { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import axios from 'axios'

export default function page() {
  useEffect(() => {
    async function Logout() {
      const session = await getSession();
  
      let { data } = await axios.get("https://exam.elevateegy.com/api/v1/auth/logout", {
        headers: { token: session?.token },
      });
      console.log(data.data);
      
    }
    Logout();
  }, []);
  return (
    <div>page</div>
  )
}
