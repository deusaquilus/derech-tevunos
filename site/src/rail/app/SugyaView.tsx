import { Fragment, type JSX, type ReactNode } from "react";
import { createPortal } from "react-dom";

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
  /**
   * Where the legend and its switches render. Given an element, they go into
   * it — the site hands over the strip's panel, so the key takes no height on
   * the sheet and appears when the reader asks for it; every icon explains
   * itself on hover in the rows anyway. Absent, they render inline above the
   * state-of-play bar, for a page with no panel of its own.
   */
  readonly legendHost?: Element;
  /** Controller options, e.g. `{ beads: false }` to keep edge badges off the elbows. */
  readonly options?: ControllerOptions;
};

/**
 * One arrangement of {@link useSugyaController}: the waterfall as a sheet that
 * fills its region and does not scroll as a whole. Three things are pinned and
 * never move — the state-of-play bar at the top, the reveal control down the
 * right edge between the two, the foot control at the bottom — and the
 * staircase of rows between them, with its rails and connector overlays, is the
 * one scroll container. The legend goes wherever `legendHost` says. A different
 * page can reuse the controller and lay the same components out differently —
 * a compact timeline, a single movement, two sugyot side by side — without
 * touching this.
 */
export const SugyaView = ({ sugya, hint, header, legendHost, options }: SugyaViewProps): JSX.Element => {
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
  const legend = <LegendBar anatomy={legendAnatomy} fold={legendFold} />;

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

      {legendHost === undefined ? legend : createPortal(legend, legendHost)}

      <StateOfPlay entries={roots} party={party} />

      <div className="stage">
        {/* The one scroll container. The drawing inside it is the positioned
            box the overlays are laid over, kept free of padding so that their
            (0, 0) is the rows' (0, 0); the scroller carries the margins. */}
        <div className="stage-rows">
          <div className="stage-drawing">
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
        </div>

        {/* Pinned down the right edge, as tall as the space between the bar
            and the foot, outside the scroller: a map, not a gutter. */}
        <div className="rail-dock">
          <RevealRail
            count={total}
            value={revealed}
            onChange={seek}
            boundaries={movements.map((m) => m.start)}
            valueLabel={currentMovement?.opening.short}
            label={`Reveal ${sugya.tractate} ${sugya.folio}`}
          />
        </div>
      </div>

      {/* Always present and never moving: the one control that is in the same
          place at every step. It used to be sticky inside the scroller and
          rendered only on a long passage with sentences left, so it drifted
          with the sheet's bottom padding and vanished at the end. */}
      <div className="sheet-foot">
        <button
          type="button"
          className="advance advance-lead"
          onClick={advance}
          disabled={revealed >= total}
        >
          next sentence
        </button>
        {long && movementEnd > revealed ? (
          <button type="button" className="advance" onClick={() => seek(movementEnd)}>
            rest of this movement
          </button>
        ) : null}
        <span className="sheet-foot-count">
          {revealed} of {total}
        </span>
      </div>
    </article>
  );
};
