import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
	Home,
	TrendingUp,
	CreditCard,
	MessageCircle,
	GraduationCap,
	Book,
	Newspaper,
	Settings as SettingsIcon,
	Sun,
	Moon,
	LogOut
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

export type NavItem = {
	label: string
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
	href: string
}

type NavGroup = {
	title: string
	items: NavItem[]
}

const navGroups: NavGroup[] = [
	{
		title: 'MAIN',
		items: [
			{ label: 'Dashboard', icon: Home, href: '/' },
			{ label: 'Assets', icon: TrendingUp, href: '/assets' },
			{ label: 'Expenses', icon: CreditCard, href: '/expenses' },
			{ label: 'AI Assistant', icon: MessageCircle, href: '/ai' },
			{ label: 'Loans', icon: GraduationCap, href: '/loans' }
		]
	},
	{
		title: 'OTHER',
		items: [
			{ label: 'Education', icon: Book, href: '/education' },
			{ label: 'News', icon: Newspaper, href: '/news' }
		]
	}
]

const Sidebar: React.FC = () => {
	const [isLightMode, setIsLightMode] = useState(() => {
		return !document.documentElement.classList.contains('dark')
	})
	const navigate = useNavigate()

	useEffect(() => {
		if (isLightMode) {
			document.documentElement.classList.remove('dark')
		} else {
			document.documentElement.classList.add('dark')
		}
	}, [isLightMode])

	const toggleLightMode = () => setIsLightMode((prev) => !prev)

	const handleLogout = () => {
		// TODO: implement logout logic (e.g., clear auth tokens)
		navigate('/login')
	}

	return (
		<motion.aside
			initial={{ width: 0 }}
			animate={{ width: 280 }}
			transition={{ duration: 0.4 }}
			className="flex flex-col h-screen bg-white shadow-xl p-6"
		>
			{/* Logo */}
			<div className="flex items-center mb-8">
				<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
					V
				</div>
				<span className="ml-3 text-2xl font-extrabold text-gray-800">Vestr</span>
			</div>

			{/* Main nav */}
			<nav className="flex-1 overflow-y-auto">
				{navGroups.map((group) => (
					<div key={group.title} className="mb-6">
						<h2 className="mb-2 px-2 text-xs font-semibold text-gray-500">{group.title}</h2>
						<ul className="space-y-1">
							{group.items.map((item) => (
								<li key={item.href}>
									<NavLink
										to={item.href}
										className={({ isActive }) =>
											`flex items-center p-2 rounded-lg transition-colors ${
												isActive ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'
											}`
										}
									>
										<item.icon className="h-5 w-5 mr-3 text-gray-600" />
										<span className="text-gray-800">{item.label}</span>
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				))}
			</nav>

			{/* Preferences */}
			<div className="mb-6">
				<div className="px-2 text-xs font-semibold text-gray-500">PREFERENCES</div>
				<ul className="space-y-1 mt-2">
					<li>
						<NavLink
							to="/settings"
							className={({ isActive }) =>
								`flex items-center p-2 rounded-lg transition-colors ${isActive ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`
							}
						>
							<SettingsIcon className="h-5 w-5 mr-3 text-gray-600" />
							<span className="text-gray-800">Settings</span>
						</NavLink>
					</li>
					<li>
						<button onClick={toggleLightMode} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 focus:outline-none">
							{isLightMode ? <Sun className="h-5 w-5 mr-3 text-gray-600" /> : <Moon className="h-5 w-5 mr-3 text-gray-600" />}
							<span className="text-gray-800">{isLightMode ? 'Dark Mode' : 'Light Mode'}</span>
						</button>
					</li>
				</ul>
			</div>

			{/* Logout at bottom */}
			<div className="mt-auto">
				<button onClick={handleLogout} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 focus:outline-none">
					<LogOut className="h-5 w-5 mr-3 text-gray-600" />
					<span className="text-gray-800">Logout</span>
				</button>
				<div className="mt-6 text-center text-xs text-gray-400">© {new Date().getFullYear()} Vestr</div>
			</div>
		</motion.aside>
	)
}

export default Sidebar
