'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Entry = {
  id: string
  text: string
  type: 'truth' | 'lie'
}

export default function Library() {

  const [entries, setEntries] = useState<Entry[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('entries');
    
    if(stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  return (
    
      <main className="flex items-center flex-col w-full">

        <Link className='absolute l-0 t-0' href="/">&lt; Home</Link>


        <ul className="flex flex-col w-9/10 mt-6">
          {entries.map(entry => (
            <li className="flex w-full bg-white/80 rounded-sm shadow-lg/5 p-3 mb-3 items-center" key={entry.id}>
              <span className="item-start">{entry.text}</span>
              {entry.type === 'truth' ? (
           <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-1/10" viewBox="0 0 48 48">
<path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
</svg>
         ) : (
           
<svg  className="w-1/10" viewBox="0 0 60.601004 60.601004"   version="1.1" xmlns="http://www.w3.org/2000/svg">
  
  <path d="m 8.4286277,35.764253 0,-10.9275 43.7450003,0 0,10.9275 -43.7450003,0 z M 30.299878,2.9592527 c -15.1,0 -27.3400003,12.2412503 -27.3400003,27.3412503 0,15.09875 12.2400003,27.34125 27.3400003,27.34125 15.1,0 27.34125,-12.2425 27.34125,-27.34125 0,-15.1 -12.24125,-27.3412503 -27.34125,-27.3412503" fill="#ff4b00" fillOpacity="1" fillRule='nonzero' stroke='none'/>
</svg>
         )}
            </li>
          ))}
        </ul>

      </main>
  );
}