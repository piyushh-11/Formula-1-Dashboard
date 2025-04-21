import { useNavigate } from 'react-router-dom'
import BG from '../assets/bg.jpg'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-cover bg-center min-h-screen w-screen flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <button
        onClick={() => navigate('/dashboard')}
        className="rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-2 cursor-pointer shadow-lg text-white font-semibold transition hover:bg-white/30 hover:border-white/50]"
      >
        Go to Dashboard
      </button>
    </div>
  )
}

export default Home