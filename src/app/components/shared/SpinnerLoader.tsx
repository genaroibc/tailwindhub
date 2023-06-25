type Props = {
  size: number;
};

export function SpinnerLoader({ size }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      overflow="visible"
      fill="currentColor"
      stroke="none"
    >
      <defs>
        <rect
          id="loader"
          x="46.5"
          y="40"
          width="7"
          height="20"
          rx="2"
          ry="2"
          transform="translate(0 -30)"
        />
      </defs>
      <use xlinkHref="#loader" transform="rotate(30 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.08s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(60 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.17s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(90 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.25s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(120 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.33s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(150 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.42s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(180 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.50s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(210 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.58s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(240 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.67s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(270 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.75s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(300 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.83s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(330 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="0.92s"
          repeatCount="indefinite"
        ></animate>
      </use>
      <use xlinkHref="#loader" transform="rotate(360 50 50)">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          begin="1.00s"
          repeatCount="indefinite"
        ></animate>
      </use>
    </svg>
  );
}
