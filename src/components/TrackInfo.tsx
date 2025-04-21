import React, { useEffect, useState } from 'react'
import { fetchTrackInfo } from '../utils/api'

interface TrackInfoProps {
  season: string
  round: string
}

const TrackInfo: React.FC<TrackInfoProps> = ({ season, round }) => {
  const [track, setTrack] = useState<{ circuitId: string, name: string; city: string; country: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Loads track information for the specified season and round.
  useEffect(() => {
    async function loadTrack() {
      if (!season || !round) {
        setTrack(null)
        setError(null)
        return
      }
      setLoading(true)
      setError(null)
      try {
        const info = await fetchTrackInfo(season, round)
        setTrack(info)
        if (!info) setError("No track info available.")
      } catch (e) {
        setError("Failed to load track info.")
        setTrack(null)
      } finally {
        setLoading(false)
      }
    }
    loadTrack()
  }, [season, round])

  return (
    <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-2 flex flex-col">
      <h2 className="text-xl font-bold text-center">Track Info</h2>
      {loading ? (
        <div className="text-center text-muted-foreground py-8">Loading...</div>
      ) : error ? (
        <div className="text-center text-muted-foreground py-8">{error}</div>
      ) : track ? (
        <>
          <div className="p-2">
            <div className="font-semibold">{track.name}</div>
            <div className="text-gray-600">{track.city}, {track.country}</div>
          </div>
          <img
            src={`/tracks/${track.circuitId}.jpeg`}
            alt={`Track layout for ${track.name}`}
            className="w-88 h-52 rounded border border-gray-200 items-center self-center relative absolute inset-0 object-cover rounded"
          />
        </>
      ) : (
        <div className="text-center text-muted-foreground py-8">No track info available.</div>
      )}
    </div>
  )
}

export default TrackInfo
