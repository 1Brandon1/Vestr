import React, { useState, useEffect, useCallback } from 'react'
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
	LogOut,
	Menu,
	X,
	Sun,
	Moon
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

// Custom hook for dark mode
function useDarkMode(): [boolean, () => void] {
	const [isDark, setIsDark] = useState<boolean>(() => document.documentElement.classList.contains('dark'))

	const toggle = useCallback(() => {
		const html = document.documentElement
		const next = !isDark
		html.classList.toggle('dark', next)
		localStorage.setItem('theme', next ? 'dark' : 'light')
		setIsDark(next)
	}, [isDark])

	// Sync on mount (e.g., from preflight script)
	useEffect(() => {
		const stored = localStorage.getItem('theme')
		if (stored) {
			const next = stored === 'dark'
			document.documentElement.classList.toggle('dark', next)
			setIsDark(next)
		}
	}, [])

	return [isDark, toggle]
}

const Sidebar: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(true)
	const [isDarkMode, toggleDarkMode] = useDarkMode()
	const navigate = useNavigate()

	const toggleCollapse = useCallback(() => setIsCollapsed((prev) => !prev), [])
	const handleLogout = useCallback(() => navigate('/login'), [navigate])

	// Renders navigation groups
	const renderNav = useCallback(
		(group: NavGroup) => (
			<div key={group.title} className="mb-6">
				<h2 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">{group.title}</h2>
				<ul className="space-y-1">
					{group.items.map((item) => (
						<li key={item.href}>
							<NavLink
								to={item.href}
								className={({ isActive }) =>
									`flex items-center p-2 rounded-lg transition-colors ${
										isActive ? 'bg-gray-100 font-medium dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
									}`
								}
							>
								<item.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
								<span className="ml-3 text-gray-800 dark:text-gray-100">{item.label}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		),
		[]
	)

	return (
		<>
			{isCollapsed && (
				<button
					onClick={toggleCollapse}
					className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg focus:outline-none dark:bg-gray-800"
				>
					<Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
				</button>
			)}

			<motion.aside
				initial={{ x: isCollapsed ? -300 : 0 }}
				animate={{ x: isCollapsed ? -300 : 0 }}
				transition={{ type: 'tween', duration: 0.3 }}
				className="fixed top-0 left-0 z-40 flex flex-col h-screen bg-white shadow-xl w-64 rounded-tr-md rounded-br-md dark:bg-gray-900"
			>
				{!isCollapsed && (
					<button
						onClick={toggleCollapse}
						className="absolute top-4 right-4 p-2 rounded-md bg-white shadow-lg focus:outline-none dark:bg-gray-800"
					>
						<X className="h-6 w-6 text-gray-800 dark:text-gray-200" />
					</button>
				)}

				<div className="flex items-center p-4">
					<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
						V
					</div>
					<span className="ml-3 text-2xl font-extrabold text-gray-800 dark:text-gray-100">Vestr</span>
				</div>

				<nav className="flex-1 overflow-y-auto px-2 mt-2">{navGroups.map(renderNav)}</nav>

				<div className="mb-6 px-2">
					<h2 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">PREFERENCES</h2>
					<ul className="space-y-1">
						<li>
							<NavLink
								to="/settings"
								className={({ isActive }) =>
									`flex items-center p-2 rounded-lg transition-colors ${
										isActive ? 'bg-gray-100 font-medium dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
									}`
								}
							>
								<SettingsIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
								<span className="ml-3 text-gray-800 dark:text-gray-100">Settings</span>
							</NavLink>
						</li>
						<li>
							<button
								onClick={toggleDarkMode}
								className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
							>
								{isDarkMode ? (
									<Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
								) : (
									<Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
								)}
								<span className="ml-3 text-gray-800 dark:text-gray-100">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
							</button>
						</li>
					</ul>
				</div>

				<div className="mt-auto px-4 mb-4">
					<button
						onClick={handleLogout}
						className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
					>
						<LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
						<span className="ml-3 text-gray-800 dark:text-gray-100">Logout</span>
					</button>
					<div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">© {new Date().getFullYear()} Vestr</div>
				</div>
			</motion.aside>
		</>
	)
}

export default Sidebar
