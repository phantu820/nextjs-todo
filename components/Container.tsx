import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='container'>
      <div className='flex flex-col'>{children}</div>
    </div>
  );
};

export default Container;
