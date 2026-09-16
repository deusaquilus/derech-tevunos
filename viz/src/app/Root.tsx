import type { JSX } from "react";

import { GalleryPage } from "./pages/GalleryPage.tsx";
import { OpenPage } from "./pages/OpenPage.tsx";
import { SugyaPage } from "./pages/SugyaPage.tsx";
import { Link, matchRoute, useRoute } from "./router.tsx";
import { useSugyot } from "./sugyot.ts";

/**
 * The shell: title, a passage switcher, and whichever page the route selects.
 * `#/open` is a different page entirely — its own chrome, not another tab in
 * this strip — so it is handed the whole window and does not share this markup.
 */
export const Root = (): JSX.Element => {
  const route = useRoute();
  const sugyot = useSugyot();
  const sugyaMatch = matchRoute("/sugya/:id", route);
  const openMatch = matchRoute("/open/:id", route);
  if (route === "/open" || openMatch !== undefined) {
    return <OpenPage id={openMatch?.id} />;
  }

  return (
    <div className="app">
      <header className="app-head">
        <h1>
          <Link to="/" className="app-home">
            Sugya lattice
          </Link>
        </h1>
        <p>
          Every sentence of a sugya, labelled with the move it makes, following the taxonomy in
          chapter 9 of the Ramchal&rsquo;s <em>Derech Tevunos</em>.
        </p>
      </header>

      <nav className="tabs" aria-label="Choose a passage">
        <Link
          to="/"
          className={`tab${route === "/" ? " tab-on" : ""}`}
          aria-current={route === "/" ? "page" : undefined}
        >
          <span className="tab-cite">Gallery</span>
          <span className="tab-title">all passages</span>
        </Link>
        {sugyot.map((sugya) => {
          const active = sugyaMatch?.id === sugya.id;
          return (
            <Link
              key={sugya.id}
              to={`/sugya/${sugya.id}`}
              className={`tab${active ? " tab-on" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="tab-cite">
                {sugya.tractate} {sugya.folio}
              </span>
              <span className="tab-title">{sugya.title}</span>
            </Link>
          );
        })}
      </nav>

      {sugyaMatch === undefined ? <GalleryPage /> : <SugyaPage id={sugyaMatch.id!} />}
    </div>
  );
};
