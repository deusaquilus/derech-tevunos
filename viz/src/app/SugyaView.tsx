import { Fragment, type JSX, type ReactNode } from "react";

import type { Sugya } from "../sugya.ts";
import { BeadLayer } from "./components/BeadLayer.tsx";
import { ConnectorLayer } from "./components/ConnectorLayer.tsx";
import { FoldBand } from "./components/FoldBand.tsx";
import { LegendBar } from "./components/LegendBar.tsx";
import { RailLayer } from "./components/RailLayer.tsx";
import { RevealRail } from "./components/RevealRail.tsx";
import { StateOfPlay } from "./components/StateOfPlay.tsx";
import { UnitRow } from "./components/UnitRow.tsx";
import { SugyaHeader } from "./SugyaHeader.tsx";
import { useSugyaController, type ControllerOptions } from "./useSugyaController.ts";

export type SugyaViewProps = {
  readonly sugya: Sugya;
  /** Override the instructional line in the header; see `SugyaHeader`. */
  readonly hint?: ReactNode;
  /** Drop the built-in header entirely, e.g. when the page supplies its own. */
  readonly header?: false;
  /** Controller options, e.g. `{ beads: false }` to keep edge badges off the elbows. */
  readonly options?: ControllerOptions;
};

/**
 * One arrangement of {@link useSugyaController}: the waterfall as a full sheet,
 * with header, legend, state-of-play strip, the staircase of rows with its rails
 * and connector overlays, the reveal control, and a footer. A different page can
 * reuse the controller and lay the same components out differently — a compact
 * timeline, a single movement, two sugyot side by side — without touching this.
 */
export const SugyaView = ({ sugya, hint, header, options }: SugyaViewProps): JSX.Element => {
  const {
    units,
    total,
    long,
    revealed,
    peeked,
    hotEdge,
    hotBead,
    anatomy,
    annotated,
    party,
    badgesAt,
    beads,
    hasBead,
    targetOrdinal,
    hoverEdge,
    deepest,
    indent,
    lanes,
    margin,
    width,
    movements,
    movementAt,
    currentMovement,
    movementEnd,
    rendered,
    slots,
    bandViews,
    onRail,
    rails,
    handles,
    columns,
    connectors,
    ticks,
    roots,
    coverage,
    rowsRef,
    register,
    height,
    seek,
    advance,
    retreat,
    collapseTo,
    toggleFold,
    pressHandle,
    toggleBand,
    setPeeked,
    peekRail,
    verdictAt,
    standingAt,
    depthAt,
    foldPolicy,
  } = useSugyaController(sugya, options);

  // Only when the passage has something for the layer to show.
  const legendAnatomy = annotated
    ? { on: anatomy.on, onToggle: anatomy.setOn, lenses: anatomy.lenses, onLens: anatomy.toggleLens }
    : undefined;
  // Only when a rail can appear: the switch changes nothing on a short passage.
  const legendFold = lanes > 1 ? { threads: foldPolicy.threads, onToggle: foldPolicy.setThreads } : undefined;

  return (
    <article className={`sheet${long ? " sheet-long" : ""}`}>
      {header === false ? null : (
        <SugyaHeader
          sugya={sugya}
          total={total}
          movementCount={movements.length}
          deepest={deepest}
          coverage={coverage}
          long={long}
          hint={hint}
        />
      )}

      <LegendBar anatomy={legendAnatomy} fold={legendFold} />

      <StateOfPlay entries={roots} sticky={long} party={party} />

      <div className="stage">
        <div className="stage-rows">
          <ol
            className="rows"
            ref={rowsRef}
            style={{
              ["--lattice-w" as string]: `${width}px`,
              ["--lattice-margin" as string]: `${margin}px`,
            }}
          >
            {slots.map((slot) => {
              if (slot.kind === "band") {
                const view = bandViews.get(slot.band.key);
                return view === undefined ? null : (
                  <FoldBand
                    key={slot.band.key}
                    bandKey={slot.band.key}
                    kind={view.kind}
                    summary={view.summary}
                    caption={view.caption}
                    depth={view.depth}
                    inset={margin + view.depth * indent}
                    onToggle={() => toggleBand(slot.band.key)}
                    onPeek={(on) => setPeeked(on ? view.anchorId : undefined)}
                  />
                );
              }
              const i = slot.index;
              const unit = units[i]!;
              const movement = long ? movementAt.get(i) : undefined;
              return (
                <Fragment key={unit.id}>
                  {movement === undefined ? null : (
                    <li className={`movement${i < revealed ? "" : " movement-pending"}`}>
                      <button
                        type="button"
                        className="movement-button"
                        onClick={() =>
                          collapseTo(i < revealed ? i + 1 : movement.start + movement.units.length)
                        }
                      >
                        <span className="movement-name">
                          {movement.opening.short ?? movement.opening.en.slice(0, 48)}
                        </span>
                        <span className="movement-size">{movement.units.length}</span>
                      </button>
                    </li>
                  )}
                  <UnitRow
                    unit={unit}
                    ordinal={i + 1}
                    depth={depthAt(unit.id)}
                    indent={indent}
                    standing={standingAt(unit.id)}
                    verdict={verdictAt(unit, i)}
                    revealed={i < revealed}
                    frontier={i === revealed - 1}
                    remaining={total - revealed}
                    handle={handles.get(unit.id)}
                    peeked={peeked === unit.id}
                    onRail={onRail.has(unit.id)}
                    iconRef={register(unit.id)}
                    onAdvance={advance}
                    onRetreat={retreat}
                    onCollapseTo={() => collapseTo(i + 1)}
                    onHandle={() => pressHandle(unit.id)}
                    onPeek={setPeeked}
                    badges={badgesAt(unit)}
                    targetOrdinal={targetOrdinal(unit)}
                    hot={hotEdge === unit.id}
                    beadDrawn={hasBead(unit.id)}
                    hinted={hotBead === unit.id}
                    onEdgeHover={(on) => hoverEdge(on ? unit.id : undefined)}
                  />
                </Fragment>
              );
            })}

            {rendered < total ? (
              <li className="horizon">
                <button type="button" className="horizon-button" onClick={advance}>
                  {total - rendered} further sentences, not yet drawn
                </button>
              </li>
            ) : null}
          </ol>

          <ConnectorLayer
            connectors={connectors}
            width={width}
            height={height}
            columns={columns}
            indent={indent}
            hotEdge={hotEdge}
          />

          <RailLayer
            rails={rails}
            lanes={lanes}
            width={width}
            height={height}
            onToggle={toggleFold}
            onPeek={peekRail}
          />

          <BeadLayer
            beads={beads}
            width={width}
            height={height}
            hotEdge={hotEdge}
            onHover={(id) => hoverEdge(id, "bead")}
          />
        </div>

        <div className={long ? "rail-dock" : undefined}>
          <RevealRail
            count={total}
            value={revealed}
            onChange={seek}
            ticks={ticks}
            boundaries={movements.map((m) => m.start)}
            variant={long ? "map" : "aligned"}
            valueLabel={currentMovement?.opening.short}
            label={`Reveal ${sugya.tractate} ${sugya.folio}`}
          />
        </div>
      </div>

      {long && revealed < total ? (
        <div className="sheet-foot">
          <button type="button" className="advance advance-lead" onClick={advance}>
            next sentence
          </button>
          {movementEnd > revealed ? (
            <button type="button" className="advance" onClick={() => seek(movementEnd)}>
              rest of this movement
            </button>
          ) : null}
          <span className="sheet-foot-count">
            {revealed} of {total}
          </span>
        </div>
      ) : null}
    </article>
  );
};
