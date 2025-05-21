import { Camera, ChartBarIncreasing } from "lucide-react";

const menuOptions = [
  {
    name: "Dashboard",
    icon: <ChartBarIncreasing />,
    href: "/",
  },
  {
    name: "Otro",
    icon: <Camera />,
    href: "/",
  },
];

export const DashboardMenu = () => {
  return (
    <aside
      className={`bg-gradient-to-br from-gray-800 to-gray-900 inset-0 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300`}
    >
      <div className="relative border-b border-white/20">
        <a className="flex items-center gap-4 py-6 px-8" href="#/">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Dashboard Ransomware
          </h6>
        </a>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {menuOptions.map((option) => (
            <li key={option.name}>
              <a className="active" href={option.href}>
                <button
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  {option.icon}
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    {option.name}
                  </p>
                </button>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
