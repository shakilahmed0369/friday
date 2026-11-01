type ArrowDirection = 'right' | 'left' | 'up' | 'down' | 'up-right'

export function ArrowIcon({ direction = 'right' }: { direction?: ArrowDirection }) {
  const paths: Record<ArrowDirection, string> = {
    right: 'M5 12h14m-5-5 5 5-5 5',
    left: 'M19 12H5m5-5-5 5 5 5',
    up: 'M12 19V5m-5 5 5-5 5 5',
    down: 'M12 5v14m-5-5 5 5 5-5',
    'up-right': 'M6 18 18 6M8 6h10v10',
  }
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[direction]} fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.75" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path d="m15.5 15.5 4 4" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

export function PlayIcon() {
  return (
    <svg className="icon icon-play" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 5.5 18 12l-9.5 6.5Z" fill="currentColor" />
    </svg>
  )
}
