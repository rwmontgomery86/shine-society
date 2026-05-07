export function FloatingCTA() {
  return (
    <a className="ss-fab" href="#book" aria-label="Book a detail">
      <span className="ss-fab__pulse" aria-hidden="true" />
      <span className="ss-fab__lbl">Book a detail</span>
      <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true">
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
