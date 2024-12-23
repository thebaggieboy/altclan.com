import React from 'react'

export default function test() {
    async function test() {
        await fetch("/api/emails", {method:'POST'})
    }    
  return (
    <div className='p-10 text-center '>

        <button className='bg-black text-white p-3' onClick={test}>send email</button>
    </div>
  )
}
