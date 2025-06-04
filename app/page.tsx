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

const options = [
  { label: 'Truth', value: 'truth' },
  { label: 'Lie', value: 'lie' }
];

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
    
<div className="h-full">
      

      <main className="flex flex-col w-full items-center -mt-8 rounded-full">

        
        

        
        <button onClick={generateSet} className="text-slate-900 mt-0">Generate Random Set</button>

        {
          randomSet && (
            <div className="w-9/10 flex flex-col mt-6">              
              {randomSet.map(entry => (
                <div key={entry.id} className="flex w-full bg-white/80 rounded-sm shadow-lg/5 p-3 mt-3 mb-1 items-center">{entry.text}</div>
              ))}
            </div>
          )
        }

        <Link className="mt-8" href="/library">View My Library &gt;</Link>

      </main>

      <div className="fixed w-full bottom-0 text-center pb-6">

        <div className="flex flex-col w-full justify-center items-center">
          <div onTouchEnd={e => {e.preventDefault(); alert('I have...')}} className="inline bg-white border-gray-900 rounded-full p-3 mb-2">I have...</div>
          <div onTouchEnd={e => e.preventDefault()} className="inline bg-white border-gray-900  rounded-full p-3 mb-2">I have never...</div>
        </div>

        

        <div className="flex flex-wrap w-full justify-center">
              

            {options.map((option) => (
                    <div key={option.value}>
                      <input
                        className="font-inherit tracking-tight appearance-none"
                        type="radio"
                        id={option.value}
                        name="dynamicRadio"
                        value={option.value}
                        checked={type === option.value}
                        onChange={e => setType(e.target.value as 'truth' | 'lie')}
                      />
                      <label className={` ${type === option.value ? `active` : ``} radio-label font-[Inter]`} htmlFor={option.value}>{option.label}</label>
                    </div>
                  ))}

            </div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder={`Enter a new ${type}...`} className="w-9/10 rounded-lg border border-1 border-gray-200 bg-white tracking-tight font-extrabold px-8 py-10"></input> 

              <button onClick={addEntry} className="bg-blue-600 mt-2">Add New {type}</button>


      </div>

      

      </div>
  );
}
