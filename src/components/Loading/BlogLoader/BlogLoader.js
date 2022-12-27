import React from 'react'

function BlogLoader() {
  return (
    <div className="flex flex-row justify-center items-center">
      <span className="text-xl pl-3 mb-3">... loading data </span>
      <div className="loader"></div>
    </div>
  );
}

export {BlogLoader}
