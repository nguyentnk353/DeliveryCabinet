import { useNavigate } from 'react-router-dom';
import Auth from './Auth';

export default function LogoutCustomer() {
  const navigate = useNavigate();
  const auth = Auth();

  async function Logout() {
    await auth.signOut();
    localStorage.clear('loginUser');
    navigate('/home', { replace: true });
  }
  return Logout;
}
