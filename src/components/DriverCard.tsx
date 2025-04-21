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
  // If no driver is selected, show a placeholder message
  if (!driver) {
    return (
      <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-2 flex flex-col h-full">
        <h2 className="text-xl font-bold text-center">Driver Info</h2>
        <div className="text-center text-muted-foreground py-8">No driver selected.</div>
      </div>
    )
  }

  // Find the driver object from the drivers array using the driver code
  const d = drivers.find(d => d.code === driver)
  // If driver is not found, show an error message
  if (!d) {
    return (
      <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-2 flex flex-col h-full">
        <h2 className="text-xl font-bold text-center">Driver Info</h2>
        <div className="text-center text-muted-foreground py-8">Driver not found or data unavailable.</div>
      </div>
    )
  }

  // Render the driver card with image and details
  return (
    <div className="bg-white rounded-lg shadow-md shadow-gray-200 flex flex-col">
      <h2 className="text-xl font-bold text-center pt-2">Driver Info</h2>
      {/* Driver image */}
      <div className="w-88 h-82 self-center mt-2 relative rounded border border-gray-200 overflow-hidden">
        <img
          src={`/drivers/${driver}.jpeg`}
          alt={d.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Driver details: name, number, nationality */}
      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">{d.name}</span>
          {/* Show driver number if available */}
          {d.number && (
            <span className="text-gray-500 mt-0.5">{d.number}</span>
          )}
        </div>
        {/* Show nationality if available */}
        {d.nationality && (
          <span className="">{d.nationality}</span>
        )}
      </div>
    </div>
  )
}

export default DriverCard
