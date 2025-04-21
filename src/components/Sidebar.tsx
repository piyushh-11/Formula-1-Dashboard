import { NavLink } from 'react-router-dom'
import Logo from '../assets/f1_logo.png'

const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
]

const Sidebar = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`flex flex-col w-70 bg-white justify-between p-4 ${className}`}>
            {/* Top: Logo Placeholder */}
            <div>
                <div className="flex items-center justify-center mt-2 mb-4">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="rounded-lg w-24 object-cover"
                    />
                </div>
                {/* Navigation Buttons */}
                <nav className="flex flex-col gap-2 m-0">
                    {navItems.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `px-4 py-1 rounded transition text-center text-sm border m-0 ${isActive
                                    ? 'bg-gray-100 border-gray-200 shadow-sm shadow-gray-100'
                                    : 'hover:bg-gray-100 border-transparent'
                                }`
                            }
                            end
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            {/* Bottom: Back Home Button */}
            <div className="mb-2 m-0">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `block w-full px-4 py-2 rounded text-center text-sm transition shadow-md ${isActive ? 'text-white font-bold' : 'bg-red-500 hover:bg-red-600 text-white'
                        }`
                    }
                    end
                >
                    Back Home
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar