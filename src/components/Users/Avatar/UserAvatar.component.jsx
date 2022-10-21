import React from 'react'

function UserAvatar({blog}) {
  return (
    <>
      <img
        src={blog.author?.media?.image}
        className="rounded-full sm:w-[70px] w-12 sm:h-[70px] h-10 mr-2 sm:mr-0 mt-1"
        />
    </>
  )
}

export {UserAvatar}
