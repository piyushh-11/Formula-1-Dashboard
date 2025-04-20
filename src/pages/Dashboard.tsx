import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        Dashboard
      </div>
    </div>
  )
}

export default Dashboard