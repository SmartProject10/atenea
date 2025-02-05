import { Route, Routes } from 'react-router-dom'
import { Socios } from './pages/sociosdash';
import { Auditors } from './pages/pauditor/audi';
import { Partners } from './pages/others/partners';
import { Developers } from './pages/develop/developers';

export const SociosRoutes = () => (
    <Routes>
        <Route
            path="socios"
            element={<Socios />}
        />
        <Route
            index
            element={<Socios />}
        />
    </Routes>
)

export const AuditorsRoutes = () => (
    <Routes>
        <Route
            path="pauditor"
            element={<Auditors />}
        />
        <Route
            index
            element={<Auditors />}
        />
    </Routes>
)

export const PartnersRoutes = () => (
    <Routes>
        <Route
            path="partners"
            element={<Partners />}
        />
        <Route
            index
            element={<Partners />}
        />
    </Routes>
)

export const DevelopersRoutes = () => (
    <Routes>
        <Route
            path="developers"
            element={<Developers />}
        />
        <Route
            index
            element={<Developers />}
        />
    </Routes>
)