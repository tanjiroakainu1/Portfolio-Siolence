import { useEffect, useId, useMemo, useState } from "react";
import {
  expertiseCoverage,
  portfolioEnvelope,
  type ExpertiseCoverageItem,
} from "../data/portfolioData";
import { SkillIcon } from "../icons";

const RADAR_CX = 100;
const RADAR_CY = 100;
const RADAR_MAX_R = 68;

function radarPoints(items: ExpertiseCoverageItem[], radius: number): string {
  const n = items.length;
  if (n === 0) return "";
  return items
    .map((item, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = (item.coverage / 100) * radius;
      const x = RADAR_CX + r * Math.cos(angle);
      const y = RADAR_CY + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");
}

function axisPoint(index: number, count: number, radius: number) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  return {
    x: RADAR_CX + radius * Math.cos(angle),
    y: RADAR_CY + radius * Math.sin(angle),
  };
}

export function ExpertiseCoverageChart({
  className = "",
  variant = "gate",
  liteMode = false,
}: {
  className?: string;
  variant?: "gate" | "embedded";
  liteMode?: boolean;
}) {
  const [ready, setReady] = useState(liteMode);
  const fillGradId = useId();
  const strokeGradId = useId();
  const items = expertiseCoverage;
  const count = items.length;

  const radarFill = useMemo(() => radarPoints(items, RADAR_MAX_R), [items]);
  const gridRings = useMemo(
    () =>
      (liteMode ? [50, 100] : [25, 50, 75, 100]).map((pct) =>
        radarPoints(items.map((i) => ({ ...i, coverage: pct })), RADAR_MAX_R)
      ),
    [items, liteMode]
  );

  useEffect(() => {
    if (liteMode) {
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [liteMode]);

  return (
    <section
      className={`expertise-coverage ${variant === "embedded" ? "expertise-coverage--embedded" : ""} ${variant === "gate" ? "expertise-coverage--gate" : ""} ${liteMode ? "expertise-coverage--lite" : ""} ${className}`.trim()}
      aria-label={portfolioEnvelope.coverageTitle}
    >
      <header className="expertise-coverage__head">
        <p className="expertise-coverage__kicker">
          <span className="expertise-coverage__kicker-dot" aria-hidden />
          Stack clearance
          <span className="expertise-coverage__kicker-dot" aria-hidden />
        </p>
        <h2 className="expertise-coverage__title">{portfolioEnvelope.coverageTitle}</h2>
        <p className="expertise-coverage__sub">Icons = live languages · bars = expertise depth</p>
      </header>

      <div className="expertise-coverage__body">
        <div className={`expertise-coverage__radar-wrap ${ready ? "is-ready" : ""}`}>
          <svg className="expertise-coverage__radar" viewBox="0 0 200 200" role="img" aria-hidden>
            <defs>
              <linearGradient id={fillGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(244, 114, 182, 0.45)" />
                <stop offset="55%" stopColor="rgba(168, 85, 247, 0.35)" />
                <stop offset="100%" stopColor="rgba(232, 121, 249, 0.2)" />
              </linearGradient>
              <linearGradient id={strokeGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#e879f9" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>

            {gridRings.map((points, i) => (
              <polygon
                key={i}
                className="expertise-coverage__grid-ring"
                points={points}
              />
            ))}

            {items.map((_, i) => {
              const outer = axisPoint(i, count, RADAR_MAX_R);
              return (
                <line
                  key={`axis-${i}`}
                  className="expertise-coverage__axis"
                  x1={RADAR_CX}
                  y1={RADAR_CY}
                  x2={outer.x}
                  y2={outer.y}
                />
              );
            })}

            <polygon
              className="expertise-coverage__radar-fill"
              points={radarFill}
              fill={`url(#${fillGradId})`}
              stroke={`url(#${strokeGradId})`}
            />

            {items.map((item, i) => {
              const pt = axisPoint(i, count, RADAR_MAX_R + 16);
              if (liteMode) {
                return (
                  <g key={item.label} className="expertise-coverage__radar-dot">
                    <title>{`${item.label} — ${item.coverage}%`}</title>
                    <circle cx={pt.x} cy={pt.y} r="2.8" />
                  </g>
                );
              }
              return (
                <g
                  key={item.label}
                  className="expertise-coverage__radar-icon"
                  transform={`translate(${pt.x - 11}, ${pt.y - 11})`}
                >
                  <title>{`${item.label} — ${item.coverage}%`}</title>
                  <foreignObject width="22" height="22">
                    <div className="expertise-coverage__icon-slot">
                      <SkillIcon name={item.icon} className="h-[18px] w-[18px] text-fuchsia-200" />
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        <ul className="expertise-coverage__bars" aria-label="Language expertise bars" hidden={liteMode}>
          {items.map((item) => (
            <li key={item.label} className="expertise-coverage__row" title={item.tags}>
              <span className="expertise-coverage__row-icon" aria-hidden>
                <SkillIcon name={item.icon} className="h-4 w-4 text-fuchsia-200" />
              </span>
              <span className="expertise-coverage__row-label">{item.label}</span>
              <span className="expertise-coverage__track" aria-hidden>
                <span
                  className="expertise-coverage__fill"
                  style={{ width: ready ? `${item.coverage}%` : "0%" }}
                />
              </span>
              <span className="expertise-coverage__pct" aria-label={`${item.coverage} percent`}>
                {item.coverage}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
