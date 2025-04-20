import React from 'react'

type Driver = {
  code: string
  name: string
  number?: string
  nationality?: string
}

interface DriverCardProps {
  driver: string
  drivers: Driver[]
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, drivers }) => {
  if (!driver) {
    return (
      <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-2 flex flex-col h-full">
        <h2 className="text-xl font-bold text-center">Driver Info</h2>
      </div>
    )
  }

  const d = drivers.find(d => d.code === driver)
  if (!d) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md shadow-gray-200 flex flex-col">
      <h2 className="text-xl font-bold text-center pt-2">Driver Info</h2>
      <div className="w-88 h-82 self-center mt-2 relative">
        <img
          src={`/drivers/${driver}.jpeg`}
          alt={d.name}
          className="absolute inset-0 w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">{d.name}</span>
          {d.number && (
            <span className="text-gray-500 mt-0.5">{d.number}</span>
          )}
        </div>
        {d.nationality && (
          <span className="">{d.nationality}</span>
        )}
      </div>
    </div>
  )
}

export default DriverCard
