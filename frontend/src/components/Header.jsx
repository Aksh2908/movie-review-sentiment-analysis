import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <NavLink to="/" className="text-2xl font-bold tracking-tight">
          🎬 Sentiment Analyzer
        </NavLink>
        <ul className="flex gap-6 text-lg font-medium">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? "text-orange-300" : "hover:text-orange-300 transition"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/text-review" className={({ isActive }) => isActive ? "text-orange-300" : "hover:text-orange-300 transition"}>
              Text Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/audio-review" className={({ isActive }) => isActive ? "text-orange-300" : "hover:text-orange-300 transition"}>
              Audio Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" className={({ isActive }) => isActive ? "text-orange-300" : "hover:text-orange-300 transition"}>
              Stats
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
