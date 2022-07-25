import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ModalAlert({
  open,
  onClose,
  onCloseAll,
  children,
  title,
  path,
  message,
  type,
}) {
  const navigate = useNavigate();
  function escHandler({ key }) {
    if (key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  if (typeof document !== "undefined") {
    return createPortal(
      <div className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}>
        {/* backdrop */}
        <div
          className={`fixed inset-0 right-0 left-0 bg-black ${
            open ? "opacity-50" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
          onClick={onClose}
        />

        {/* content */}
        {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"> */}
        <div
          className={`fixed flex overflow-y-auto overflow-x-hidden ml-auto mr-auto items-center md:w-full md:inset-0 max-w-screen-sm p-4 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
          aria-hidden="true"
          tabIndex="-1"
        >
          <div>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <button
                    onClick={
                      type === "payment" || type === "apps"
                        ? onClose
                        : type === "expenses"
                        ? onCloseAll
                        : () => navigate(`${path}`)
                    }
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {children}
                  </span>
                  <br />
                  <br />
                  <span className="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                    {message}
                  </span>
                </div>
                <div className="flex items-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                  <button
                    data-modal-toggle="defaultModal"
                    onClick={
                      type === "payment" ||
                      type === "apps" ||
                      type === "expenses"
                        ? onClose
                        : () => navigate(`${path}`)
                    }
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    {type === "apps"
                      ? "Cancel"
                      : type === "expenses"
                      ? "Back"
                      : "Okay"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}
