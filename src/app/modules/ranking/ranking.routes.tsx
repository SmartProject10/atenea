import { Route, Routes } from 'react-router-dom'
import { Ranking as RankingPage } from './components/rankingpage'

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
