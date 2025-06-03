'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type Entry = {
  id: string
  text: string
  type: 'truth' | 'lie'
}

export default function Library() {

  const [text, setText] = useState('');
  const [type, setType] = useState<'truth' | 'lie'>('truth');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [randomSet, setRandomSet] = useState<Entry[] | null>(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('entries');
    
    if(stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('entries', 
      JSON.stringify(entries))
  }, [entries]);

  const addEntry = () => {
    if(!text.trim()) return
    const newEntry = { id: uuidv4(), text: text.trim(), type }
    setEntries(prev => [...prev, newEntry])
    setText("");
  }

  const generateSet = () => {
    const truths = entries.filter(e => e.type === 'truth');
    const lies = entries.filter(e => e.type === 'lie');

    if(truths.length < 2 || lies.length < 1) {
      alert("Need at least 2 truths and 1 lie");
      return;
    }

    const pickRandom = (arr: Entry[], n: number) => [...arr].sort(() => 0.5 - Math.random()).slice(0,n);

    const set = [...pickRandom(truths, 2), ...pickRandom(lies, 1)].sort(() => 0.5 - Math.random());

    setRandomSet(set);
  }

  return (
    

      

      <main className="flex flex-col w-full items-center">

        <div className="flex flex-wrap w-full justify-center">
              <div className="w-full text-center">Enter a New</div>
              <select value={type} onChange={e => setType(e.target.value as 'truth' | 'lie')} className='p-2 rounded flex'>
                <option className="w-50" value="truth">Truth</option>
                <option className="w-50" value="lie">Lie</option>
              </select>
            </div>

        
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter a statement..." className="w-9/10 rounded-full bg-white tracking-tight font-extrabold px-15 py-10"></input>

        

        <button onClick={addEntry} className="bg-blue-600 text-white rounded capitalize">Add New {type}</button>

        <button onClick={generateSet} className="bg-green-600 text-white rounded">Generate Random Set</button>

        {
          randomSet && (
            <div className="space-y-3 mb-8">              
              {randomSet.map(entry => (
                <div key={entry.id} className="bg-gray-100 p-3 rounded shadow">{entry.text}</div>
              ))}
            </div>
          )
        }

        <Link href="/library">View My Library &gt;</Link>

      </main>
  );
}
