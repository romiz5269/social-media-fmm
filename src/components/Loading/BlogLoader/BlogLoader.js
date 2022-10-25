import React from 'react'

function BlogLoader() {
  return (
    <div className="flex flex-row">
      <span className="text-xl pl-3 mb-3">... loading data </span>
      <div className="loader"></div>
    </div>
  );
}

export {BlogLoader}
