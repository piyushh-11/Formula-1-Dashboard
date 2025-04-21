import React, { useEffect, useState } from 'react'
import { fetchRaceStandings } from '../utils/api'

interface RaceSummaryProps {
  season: string
  race: string
  currentDriverId?: string
}

const RaceSummary: React.FC<RaceSummaryProps> = ({ season, race, currentDriverId }) => {
  const [standings, setStandings] = useState<
    { position: string; name: string; time: string | null; code?: string }[]
  >([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!season || !race) {
      setStandings([])
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    fetchRaceStandings(season, race)
      .then((data) => {
        setStandings(data)
        if (!data || data.length === 0) setError("No race standings available.")
      })
      .catch(() => setError("Failed to load race standings."))
      .finally(() => setLoading(false))
  }, [season, race])

  // Find the current driver in the standings
  let displayStandings = standings
  if (currentDriverId && standings.length > 0) {
    const idx = standings.findIndex(s => s.code === currentDriverId)
    if (idx === -1) {
      displayStandings = standings.slice(0, 5)
    } else if (idx < 5) {
      displayStandings = standings.slice(0, 5)
    } else {
      displayStandings = [
        ...standings.slice(0, 4),
        standings[idx]
      ]
    }
  } else {
    displayStandings = standings.slice(0, 5)
  }

  // Helper to extract last name
  const getLastName = (fullName: string) => {
    const parts = fullName.trim().split(' ')
    return parts.length > 1 ? parts[parts.length - 1] : fullName
  }

  return (
    <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-2 flex flex-col w-full h-full">
      <h2 className="text-xl font-bold text-center mb-3">Final Standings</h2>
      {loading ? (
        <div className="text-center text-muted-foreground py-8">Loading...</div>
      ) : error ? (
        <div className="text-center text-muted-foreground py-8">{error}</div>
      ) : displayStandings.length > 0 ? (
        <table className="mx-2 mb-2 text-sm rounded shadow-sm overflow-hidden">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-6 py-2 text-left border-r">Pos</th>
              <th className="px-6 py-2 text-left border-r">Driver</th>
              <th className="px-6 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {displayStandings.map((s) => {
              const highlight = currentDriverId && s.code === currentDriverId
              return (
                <tr key={s.position + s.code} className={highlight ? 'bg-gray-100' : ''}>
                  <td className="font-semibold px-6 py-3 border-b border-r">{s.position}</td>
                  <td className="px-6 py-3 border-b border-r">{getLastName(s.name)}</td>
                  <td className="px-6 py-3 border-b">{s.time ?? '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-muted-foreground py-8">No race standings available.</div>
      )}
    </div>
  )
}

export default RaceSummary
