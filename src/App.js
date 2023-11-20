import { useRef } from "react"
import "./App.css"
import Key from "./components/Key"

const noteFrequencies = {
  a: 440, // Ля (A4)
  b: 493.88, // Си (B4)
  c: 261.63, // До (C4)
}

function App() {
  const audioContextRef = useRef(new AudioContext())
  const oscillatorsRef = useRef({})

  const playNote = (note) => {
    if (oscillatorsRef.current[note]) {
      return
    } else {
      const oscillator = audioContextRef.current.createOscillator()

      const noteFrequency = noteFrequencies[note]
      oscillator.frequency.setValueAtTime(noteFrequency, audioContextRef.current.currentTime)

      oscillator.type = "sine"
      oscillator.connect(audioContextRef.current.destination)
      oscillator.start()
      oscillatorsRef.current[note] = oscillator
    }
  }

  const stopNote = (note) => {
    if (oscillatorsRef.current[note]) {
      oscillatorsRef.current[note].stop()
      oscillatorsRef.current[note].disconnect()
      delete oscillatorsRef.current[note]
    }
  }

  return (
    <div className="App">
      <Key note="a" playNote={playNote} stopNote={stopNote} />
      <Key note="b" playNote={playNote} stopNote={stopNote} />
      <Key note="c" playNote={playNote} stopNote={stopNote} />
    </div>
  )
}

export default App
