import React from 'react'

function App3() {
  
  const handleStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  }


  return (
    <div className='flex justify-center items-center h-80'>
      <input type="range" onVolumeChangeCapture={handleStart} />
    </div>
  )
}

export default App3
