export default function SectionLabel({ children, className = '' }) {
  return (
    <p
      className={`px-[14px] pt-5 pb-2 text-[11px] font-medium uppercase tracking-wide ${className}`}
      style={{ color: 'var(--c-t3)' }}
    >
      {children}
    </p>
  )
}
