import React from 'react'

function SaveChanges({showSaveChanges,handleCancelChanges,whatsChanged,handleSaveChanges}) {
  return (
    <>
      {showSaveChanges && (
        <div
          className="sm:w-1/4 rounded-lg w-full z-30 absolute bottom-20 shadow-xl px-5 py-4 saveChangesBlock grid grid-cols-12"
          style={{ backgroundColor: "#292929" }}
        >
          <div className="col-span-6 text-white font-Vazirmatn text-sm py-2">
            ذخیره تغییرات
          </div>
          <div className="col-span-6 flex flex-row justify-center">
            <button
              onClick={(e) => handleSaveChanges(e, whatsChanged)}
              className="bg-green-500 ml-5 px-7 py-2 rounded-md font-Vazirmatn text-white text-sm"
            >
              ذخیره
            </button>
            <button
              onClick={(e) => handleCancelChanges(e, whatsChanged)}
              className="bg-red-600 px-7 py-2 rounded-md font-Vazirmatn text-white text-sm"
            >
              لغو
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SaveChanges
