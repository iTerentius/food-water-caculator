import { useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, title, children, blocking = false }) {
  // Lock body scroll only if open AND blocking
  useEffect(() => {
    if (!isOpen || !blocking) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, blocking]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const escapeClose = (ev) => {
      if (ev.key === "Escape") onClose();
    };
    window.addEventListener("keydown", escapeClose);

    return () => {
      window.removeEventListener("keydown", escapeClose);
    };
  }, [isOpen, onClose]);

  // Don't render anything if closed
  if (!isOpen) return null;

  const modalContent = (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`border-2 rounded-lg border-gray-200 bg-white z-[1000] ${
        !blocking
          ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl"
          : "m-auto"
      }`}
    >
      {(title || onClose) && (
        <div className="flex items-center justify-end p-2 mr-2">
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-2xl leading-none p-0 text-gray-500 hover:text-black"
          >
            &times;
          </button>
        </div>
      )}
      <div className="p-5 pt-0 overflow-auto space-y-10">{children}</div>
    </div>
  );

  return createPortal(
    blocking ? (
      <div
        onClick={onClose}
        className="backdrop inset-0 fixed bg-black/50 z-[1000]"
      >
        {modalContent}
      </div>
    ) : (
      modalContent
    ),
    document.body
  );
}

export default Modal;
