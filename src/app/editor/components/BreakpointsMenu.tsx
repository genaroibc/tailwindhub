import { Breakpoint } from "@/app/editor/types";
import { breakpoints } from "@/app/editor/constants";
import {
  IconDeviceDesktop,
  IconDeviceIpadHorizontal,
  IconDeviceLaptop,
  IconDeviceMobile,
} from "@tabler/icons-react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onBreakpointChange: (breakpoint: Breakpoint) => void;
  currentBreakpoint: Breakpoint;
};

const BREAKPOINT_BUTTONS = [
  {
    breakpoint: breakpoints.mobile,
    icon: <IconDeviceMobile />,
    name: "mobile",
  },
  {
    breakpoint: breakpoints.tablet,
    icon: <IconDeviceIpadHorizontal />,
    name: "tablet",
  },
  {
    breakpoint: breakpoints.laptop,
    icon: <IconDeviceLaptop />,
    name: "laptop",
  },
  {
    breakpoint: breakpoints.desktop,
    icon: <IconDeviceDesktop />,
    name: "desktop",
  },
];

export function BreakpointsMenu({
  onBreakpointChange,
  currentBreakpoint,
}: Props) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex-none text-center text-xs leading-4 tabular-nums whitespace-pre text-gray-900 dark:text-gray-400">
        {currentBreakpoint.width}
        {"  "}×{"  "}
        {currentBreakpoint.height}
      </div>

      <menu className="flex items-center gap-2 justify-center w-fit mx-auto bg-blue-950/50 rounded-md">
        {BREAKPOINT_BUTTONS.map(({ breakpoint, icon, name }) => (
          <li key={name}>
            <button
              onClick={() => onBreakpointChange(breakpoint)}
              className={`${
                currentBreakpoint === breakpoints[name]
                  ? "text-blue-400 bg-blue-950"
                  : "bg-transparent"
              } p-2 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded-md`}
            >
              {icon}
            </button>
          </li>
        ))}
      </menu>
    </div>
  );
}
