const LABELS = ['', 'Faint chill', 'Uneasy', 'Spooky', 'Very haunted', 'Terrifying']

export default function FrightMeter({ value }) {
  return (
    <span className="fright" title={`Fright meter: ${value}/5 (${LABELS[value]})`} aria-label={`Fright meter ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= value ? 'ghost on' : 'ghost'} aria-hidden="true">👻</span>
      ))}
      <span className="fright-label">{LABELS[value]}</span>
    </span>
  )
}
