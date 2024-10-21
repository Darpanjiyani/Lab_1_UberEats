// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard'; // Import the Dashboard 
// import Profile from './components/Profile';
// import restProfile from './components/restProfile';
// import restDashboard from './components/restDashboard';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Navigate to="/signup" />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
          
//           {/* Customer dashboard route */}
//           <Route path="/customer/dashboard" element={<Dashboard />} />
//           <Route path="/customer/profile" element={<Profile />} />
//           {/* Restaurant dashboard route */}
//           <Route path="/restaurant/dashboard" element={<restDashboard />} />
//           <Route path="/restaurant/profile" element={< restProfile />} />
          
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup'; 
import Login from './components/Login';
import Dashboard from './components/Dashboard'; 
import Profile from './components/Profile';
import restProfile from './components/restProfile';
import restDashboard from './components/restDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} /> {/* Single Signup page */}
          <Route path="/login" element={<Login />} />
          
          {/* Customer dashboard route */}
          <Route path="/customer/dashboard" element={<Dashboard />} />
          <Route path="/customer/profile" element={<Profile />} />
          
          {/* Restaurant dashboard route */}
          <Route path="/restaurant/dashboard" element={<restDashboard />} />
          <Route path="/restaurant/profile" element={<restProfile />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
