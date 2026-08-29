import Reveal from "@/components/ui/Reveal";

/**
 * SectionHeader — the single source of truth for section eyebrows.
 * Every section renders the exact same structure: accent index, label,
 * hairline, optional right-side note. Guarantees vertical rhythm and
 * typography stay identical across the page.
 */
export default function SectionHeader({
  index,
  label,
  note,
}: {
  index: string;
  label: string;
  note?: string;
}) {
  return (
    <Reveal>
      <div className="eyebrow">
        <span className="text-accent">({index})</span>
        <span className="opacity-60">{label}</span>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-current opacity-15 md:block" />
        {note ? <span className="hidden opacity-60 md:inline">{note}</span> : null}
      </div>
    </Reveal>
  );
}
