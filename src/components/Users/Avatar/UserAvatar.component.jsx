import React from 'react'

function UserAvatar({blog}) {
  return (
    <>
      <img
        src={blog.author?.media?.image}
        className="rounded-full sm:w-12 w-12 sm:h-12 h-10 mr-2 sm:mr-0 mt-1"
        />
    </>
  )
}

export {UserAvatar}
