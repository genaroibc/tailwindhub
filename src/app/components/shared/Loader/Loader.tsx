import styles from "./Loader.module.css";

export function Loader({ color = "#000" }) {
  return (
    <div
      className={styles.container}
      style={
        {
          "--uib-color": color,
        } as React.CSSProperties
      }
    >
      <svg width="0" height="0" className={styles.container__loader}>
        <defs>
          <filter id="uib-jelly-ooze">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="6.25"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
