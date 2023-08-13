import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { UseUserRoles } from './UseUserRoles';

export function RolesAuthRoute({ children, roles }) {
  const userRoles = UseUserRoles();

  const canAccess = userRoles.some((userRole) => roles.includes(userRole));

  if (canAccess) return <Fragment>{children}</Fragment>;

  return <Navigate to='/login-employee' />;
}
