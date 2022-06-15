import { Navigate } from 'react-router-dom';

import { ROUTES } from 'config';

const PublicRoute = () => {
  return <Navigate to={ROUTES.HOME.absolutePath} />;
};

export default PublicRoute;
