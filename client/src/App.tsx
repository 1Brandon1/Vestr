import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import DashboardPage from './pages/DashboardPage'
import AssetsPage from './pages/AssetsPage'
import ExpensesPage from './pages/ExpensesPage'
import AIAssistantPage from './pages/AIAssistantPage'
import LoansPage from './pages/LoansPage'
import EducationPage from './pages/EducationPage'
import NewsPage from './pages/NewsPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

const App: React.FC = () => (
	<BrowserRouter>
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar />
			<main className="flex-1 p-6">
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/assets" element={<AssetsPage />} />
					<Route path="/expenses" element={<ExpensesPage />} />
					<Route path="/ai" element={<AIAssistantPage />} />
					<Route path="/loans" element={<LoansPage />} />
					<Route path="/education" element={<EducationPage />} />
					<Route path="/news" element={<NewsPage />} />
					<Route path="/settings" element={<SettingsPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</div>
	</BrowserRouter>
)

export default App
