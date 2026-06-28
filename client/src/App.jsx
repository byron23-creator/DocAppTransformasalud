import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login           from './pages/Login'
import Dashboard       from './pages/Dashboard'
import NewAppointment  from './pages/NewAppointment'
import Documentation   from './pages/Documentation'
import PatientHistory  from './pages/PatientHistory'
import PrivateRoute    from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/nueva-cita" element={
          <PrivateRoute><NewAppointment /></PrivateRoute>
        } />
        <Route path="/documentacion" element={
          <PrivateRoute><Documentation /></PrivateRoute>
        } />
        <Route path="/documentacion/:patient_id" element={
          <PrivateRoute><PatientHistory /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
