import { useEffect } from "react"

function Key({ note, playNote, stopNote }) {
  const startPlaying = () => {
    playNote(note)
  }

  const stopPlaying = () => {
    stopNote(note)
  }

  const handleKeyDown = (event) => {
    if (event.key === note) {
      startPlaying()
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === note) {
      stopPlaying()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return (
    <button onPointerDown={startPlaying} onPointerUp={stopPlaying}>
      {note}
    </button>
  )
}

export default Key
