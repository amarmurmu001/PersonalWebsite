/**
 * Marquee — seamless infinite strip.
 *
 * The track renders its children TWICE; a CSS keyframe translates the
 * track exactly -50%, so copy A hands over to copy B at the loop point.
 * Direction/speed are controlled per-instance via CSS custom props.
 *
 * Pure CSS → runs even while JS is hydrating, and the global
 * prefers-reduced-motion rule freezes it automatically.
 */
export default function Marquee({
  children,
  reverse = false,
  duration = 32,
  className = "",
}: {
  children: React.ReactNode;
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : undefined,
          } as React.CSSProperties
        }
      >
        {/* Two identical copies = the -50% translate loops seamlessly */}
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
