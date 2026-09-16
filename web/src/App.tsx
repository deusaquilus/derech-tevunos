import { useState } from "react";

import { CircumscriptionView } from "./views/CircumscriptionView.tsx";
import { LatticeIntervalView } from "./views/LatticeIntervalView.tsx";

type ViewId = "circumscription" | "interval";

const VIEWS: readonly { readonly id: ViewId; readonly label: string }[] = [
  { id: "circumscription", label: "Said, or only implied?" },
  { id: "interval", label: "One unknown answer" },
];

export default function App() {
  const [view, setView] = useState<ViewId>("circumscription");

  return (
    <main className="page">
      <nav className="rail" aria-label="Visualization">
        <span className="rail__label">Derech Tevunos</span>
        {VIEWS.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            className={`rail__link${view === candidate.id ? " is-selected" : ""}`}
            aria-current={view === candidate.id}
            onClick={() => setView(candidate.id)}
          >
            {candidate.label}
          </button>
        ))}
      </nav>

      {view === "circumscription" ? <CircumscriptionView /> : <LatticeIntervalView />}
    </main>
  );
}
