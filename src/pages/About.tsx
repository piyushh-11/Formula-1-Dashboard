import Sidebar from '../components/Sidebar'

const About = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        About
      </div>
    </div>
  )
}

export default About