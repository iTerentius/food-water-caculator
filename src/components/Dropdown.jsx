import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import { twMerge as tm } from "tailwind-merge";

export default function Dropdown({ options, value, onSelect, placeholder = "Select", className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const listId = useId();

  const selectedIndex = options.findIndex((o) => o.value === value?.value);

  const open = () => {
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  const choose = (option) => {
    close();
    onSelect?.(option);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) return open();
        setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) return open();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        if (isOpen) { e.preventDefault(); setHighlightedIndex(0); }
        break;
      case "End":
        if (isOpen) { e.preventDefault(); setHighlightedIndex(options.length - 1); }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        // Stop App's Enter-to-next-field handler from moving focus away
        e.stopPropagation();
        if (!isOpen) return open();
        if (options[highlightedIndex]) choose(options[highlightedIndex]);
        break;
      case "Escape":
      case "Tab":
        close();
        break;
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      // composedPath() sees through the shadow DOM in the widget build
      if (!e.composedPath().includes(dropdownRef.current)) close();
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={tm("flex w-30 items-center justify-between gap-2 px-2 py-1 border border-gray-300 rounded-md bg-white", className)}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={isOpen && highlightedIndex >= 0 ? `${listId}-${highlightedIndex}` : undefined}
      >
        <span className="truncate">{value?.label || placeholder + "..."}</span>
        <ChevronDown className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 top-full z-20 mt-1 w-full py-1 text-left bg-white border border-gray-300 rounded-md shadow-lg"
        >
          {options.map((item, index) => (
            <li
              id={`${listId}-${index}`}
              key={item.value}
              role="option"
              aria-selected={index === selectedIndex}
              className={`px-2 py-1 cursor-pointer ${index === highlightedIndex ? "bg-amber-100" : ""} ${index === selectedIndex ? "font-bold" : ""}`}
              onMouseEnter={() => setHighlightedIndex(index)}
              // mousedown + preventDefault keeps focus on the button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
