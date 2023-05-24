import React from 'react';
import { Link } from 'react-router-dom';
const index = () => {
  return (
    <div>
      Guest
      <Link to='/login'>Login page</Link>
    </div>
  );
};

export default index;
