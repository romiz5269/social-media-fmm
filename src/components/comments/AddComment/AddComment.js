
function AddComment() {
  return (
    <div className="mx-auto flex flex-row justify-between py-5 border-2">
      <form className="w-4/5 mx-auto flex flex-row justify-between">
        <textarea className="w-4/5 border-2 px-3 pt-3 text-xs font-Vazirmatn" placeholder="افزودن نظر ...">
            
        </textarea>
        <button className="bg-blue-500 px-5 font-Vazirmatn text-white text-sm rounded-xl shadow-md">
          درج
        </button>
      </form>
    </div>
  );
}

export {AddComment}
