import { Route, Routes } from 'react-router-dom'
import { Ranking as RankingPage } from './pages/rankingpage'

export const Ranking = () => (
    <Routes>
        <Route
            path="ranking"
            element={<RankingPage />}
        />
        <Route
            index
            element={<RankingPage />}
        />
    </Routes>
)
