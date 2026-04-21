import React from 'react';

const ContentView = ( { children }: { children: React.ReactNode } ) => {
  return (
    <div className="content-view">
      <h1>Content View</h1>
      <p>This is the content view component.</p>
      {children}
    </div>
  );
}

export default ContentView;
