"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, children, title, className = "" }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLDivElement>) ?? innerRef;

    const handleEscape = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      },
      [onClose]
    );

    const trapFocus = useCallback((e: KeyboardEvent) => {
      if (!resolvedRef.current || e.key !== "Tab") return;
      const focusable = Array.from(
        resolvedRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }, [resolvedRef]);

    useEffect(() => {
      if (!isOpen) return;
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", trapFocus);
      document.body.style.overflow = "hidden";

      const firstFocusable = resolvedRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      firstFocusable?.focus();

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", trapFocus);
        document.body.style.overflow = "";
      };
    }, [isOpen, handleEscape, trapFocus, resolvedRef]);

    if (!isOpen) return null;
    if (typeof window === "undefined") return null;

    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-navy-dark/70 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          ref={resolvedRef}
          className={[
            "relative z-10 bg-ivory rounded-3xl shadow-large w-full max-w-lg max-h-[90vh] overflow-y-auto",
            className,
          ].join(" ")}
        >
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-beige">
              <h2 className="text-xl font-semibold text-navy">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-beige transition-colors text-navy/60 hover:text-navy"
                aria-label="إغلاق"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
