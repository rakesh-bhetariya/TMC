import { useState } from 'react'
import ModeToggle from '../ModeToggle'

export default function ModeToggleExample() {
  const [mode, setMode] = useState<'bhari' | 'bars'>('bhari')
  
  return <ModeToggle mode={mode} onModeChange={setMode} />
}
