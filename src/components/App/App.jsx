import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Proposal from '../../pages/Proposal';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proposal" element={<Proposal />} />
        </Routes>
    );
}

export default App;