import React, { useEffect, useState } from 'react'
import { fetchTrackInfo } from '../utils/api'

interface TrackInfoProps {
  season: string
  round: string
}

const TrackInfo: React.FC<TrackInfoProps> = ({ season, round }) => {
  const [track, setTrack] = useState<{ circuitId: string, name: string; city: string; country: string } | null>(null)

  useEffect(() => {
    async function loadTrack() {
      if (!season || !round) {
        setTrack(null)
        return
      }
      const info = await fetchTrackInfo(season, round)
      setTrack(info)
    }
    loadTrack()
  }, [season, round])

  return (
    <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-2 flex flex-col">
      <h2 className="text-xl font-bold text-center">Track Info</h2>
      {track ? (
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
        <div className="text-center text-gray-500"></div>
      )}
    </div>
  )
}

export default TrackInfo
