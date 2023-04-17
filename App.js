import { StatusBar } from 'expo-status-bar';
import AuthProvider from './context/AuthContext';
import AppNavigation from './screens/AppNavigation';
export default function App() {
  return (
    <AuthProvider>
      <StatusBar style='dark'  />
      <AppNavigation />
    </AuthProvider>
  );
}


