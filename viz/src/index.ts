/**
 * Public surface of the sugya-lattice package.
 *
 * Three layers, importable independently:
 *   1. the model and its analysis — framework-free, no DOM (`sugya`, `folding`,
 *      `taxonomy`, `verdict`, `markers`);
 *   2. the geometry and static renderer (`layout`, `icons`, `theme`, `render`);
 *   3. the React visualization — the headless controller, the components it
 *      drives, and the shell/router.
 *
 * A consumer building a new page reaches for `useSugyaController` plus the
 * presentational components; one wanting an image reaches for `renderSugya`;
 * one wanting only the analysis reaches for `analyze`. Styles ship separately at
 * `sugya-lattice/src/app/styles.css` — import them once at your app root.
 */

// --- model + analysis -------------------------------------------------------
export { analyze, COLLECTIONS, maxDepth, prefixOf, movementsOf, labelBasis, PROVENANCES } from "./sugya.ts";
export type {
  Analysis,
  Collection,
  LabelBasis,
  Movement,
  Provenance,
  Standing,
  Status,
  Sugya,
  Unit,
} from "./sugya.ts";

export {
  LONG_REACH,
  DEFAULT_POLICY,
  EMPTY,
  anchorOf,
  arrive,
  arrivesFolded,
  assertLaminar,
  captionOf,
  closesBusiness,
  decompose,
  expose,
  frameFor,
  frameStateOf,
  insert,
  isLongReach,
  isRow,
  landingStart,
  layout,
  nameOf,
  press,
  railsOf,
  reachOf,
  replay,
  slotOf,
  summarizeFold,
  toggle,
  treeOf,
} from "./folding.ts";
export type {
  Band,
  FoldRange,
  FoldState,
  FoldSummary,
  FrameState,
  Policy,
  Rail,
  Slot,
  Tree,
} from "./folding.ts";

export {
  describe,
  effectOf,
  ELEMENT_GLOSS,
  ELEMENTS,
  iconOf,
  ICONS,
  isUndefinedInSource,
  keyOf,
  LEAVES,
  MOVE_KEYS,
  SUBTYPES,
  UNDEFINED_IN_SOURCE,
} from "./taxonomy.ts";
export type { Effect, Element, Icon, LeafInfo, Move, MoveKey } from "./taxonomy.ts";

export { standingOpacity, standingVerdict, statusVerdict, verdictFor } from "./verdict.ts";
export type { Tone, Verdict } from "./verdict.ts";

export { MARKERS, markersFor, unmarkedLeaves } from "./markers.ts";
export type { Marker } from "./markers.ts";

// --- chapters 1–8: the anatomy vocabulary -----------------------------------
export {
  ANATOMY,
  ANATOMY_KEYS,
  annotationErrors,
  badgesOf,
  BASES,
  basisOf,
  FAMILIES,
  FAMILY_ORDER,
  GROUND_ELEMENTS,
  GROUND_OF_PROVENANCE,
  groundBadge,
  hueOf,
  PARTIES,
  speakerBadge,
} from "./anatomy.ts";
export type {
  AnatomyInfo,
  AnatomyKey,
  Annotation,
  Badge,
  Family,
  FamilyInfo,
  Hue,
  Level,
  Party,
} from "./anatomy.ts";

export {
  BUSY_GLYPHS,
  GLYPHS,
  glyphAspect,
  glyphBox,
  SQUARE_BOX,
  TILE_GLYPH,
  WIDE_BOX,
  WIDE_GLYPHS,
} from "./glyphs.ts";

// --- geometry + static renderer --------------------------------------------
export {
  BEAD_MIN_RUN,
  beadFits,
  beadPoint,
  beadRadius,
  connectorPath,
  connectorStyle,
  iconX,
  indentFor,
  INDENT,
  isLongRun,
  LANE_GAP,
  laneX,
  LATTICE_BUDGET,
  LATTICE_MARGIN,
  latticeWidth,
  LONG_RUN,
  marginFor,
  MIN_INDENT,
  railBranch,
  railPath,
  RAIL_WIDTH,
  RAIL_X,
} from "./layout.ts";
export type { ConnectorCap, ConnectorStyle, Point } from "./layout.ts";

export { ICON_RADIUS, ICON_SHAPES, resolveFill, shapesFor, TINT_OPACITY } from "./icons.ts";
export type { IconFill, IconPrimitive, ResolvedFill } from "./icons.ts";

export { LIGHT } from "./theme.ts";
export type { Palette } from "./theme.ts";

export { renderSugya, STANDALONE } from "./render.ts";
export type { RenderOptions, Theme } from "./render.ts";

// --- the file format --------------------------------------------------------
export { FORMAT, FORMAT_VERSION, parseSugya, stringify, SugyaFormatError, toJson } from "./format.ts";
export type { AnnotationJson, MoveJson, SugyaJson, UnitJson } from "./format.ts";

// --- data -------------------------------------------------------------------
// The passages the app ships with, read from `sugyot/*.json`.
export { ofCollection, SUGYOT, sugyaById } from "./sugyot/index.ts";
// The same passages as TypeScript, the oracle the JSON files are checked against.
export {
  bavaKammaToldos,
  bavaMetziaOchazin,
  bavaMetziaYeush,
  berachosYaakov,
  FIXTURES,
  gittinBefanai,
  pesachimLiquids,
  pesachimOr,
  RAMCHAL_FIXTURES,
  RESEARCH_FIXTURES,
  yebamosChalitzah,
  yebamosDeafMute,
} from "./fixtures/index.ts";

// --- React: controller ------------------------------------------------------
export { BEADS_ON_ELBOWS, HORIZON, LONG_SUGYA, useSugyaController } from "./app/useSugyaController.ts";
export type {
  BandView,
  Bead,
  ControllerOptions,
  HotFrom,
  RowBadges,
  SugyaController,
} from "./app/useSugyaController.ts";

export { useIconPositions } from "./app/hooks/useIconPositions.ts";
export type { IconPositions } from "./app/hooks/useIconPositions.ts";

export { ALL_LENSES, DEFAULT_LAYER, useAnatomyLayer } from "./app/hooks/useAnatomyLayer.ts";
export type { AnatomyLayer, AnatomyLayerState, Lenses } from "./app/hooks/useAnatomyLayer.ts";

export { useFoldPolicy } from "./app/hooks/useFoldPolicy.ts";
export type { FoldPolicy } from "./app/hooks/useFoldPolicy.ts";

// --- React: the visualization and its parts ---------------------------------
export { SugyaView } from "./app/SugyaView.tsx";
export type { SugyaViewProps } from "./app/SugyaView.tsx";

export { SugyaHeader } from "./app/SugyaHeader.tsx";
export type { SugyaHeaderProps } from "./app/SugyaHeader.tsx";

export { UnitRow } from "./app/components/UnitRow.tsx";
export type { Handle, UnitRowProps } from "./app/components/UnitRow.tsx";

export { ConnectorLayer } from "./app/components/ConnectorLayer.tsx";
export type { Connector, ConnectorLayerProps, DepthColumn } from "./app/components/ConnectorLayer.tsx";

export { RailLayer } from "./app/components/RailLayer.tsx";
export type { DrawnRail, RailLayerProps } from "./app/components/RailLayer.tsx";

export { FoldBand } from "./app/components/FoldBand.tsx";
export type { FoldBandProps } from "./app/components/FoldBand.tsx";

export { RevealRail } from "./app/components/RevealRail.tsx";
export type { RailVariant, RevealRailProps } from "./app/components/RevealRail.tsx";

export { StateOfPlay } from "./app/components/StateOfPlay.tsx";
export type { StateOfPlayEntry, StateOfPlayProps } from "./app/components/StateOfPlay.tsx";

export { LegendBar } from "./app/components/LegendBar.tsx";
export type { LegendAnatomyProps, LegendBarProps, LegendFoldProps } from "./app/components/LegendBar.tsx";

export { VerdictPill } from "./app/components/VerdictPill.tsx";
export type { VerdictPillProps } from "./app/components/VerdictPill.tsx";

export { ElementIcon } from "./app/components/ElementIcon.tsx";
export type { ElementIconProps } from "./app/components/ElementIcon.tsx";

// --- React: the anatomy layer -----------------------------------------------
export { Tooltip } from "./app/components/Tooltip.tsx";
export type { TooltipProps } from "./app/components/Tooltip.tsx";

export { Glyph } from "./app/components/Glyph.tsx";
export type { GlyphProps } from "./app/components/Glyph.tsx";

export { AnatomyBadge } from "./app/components/AnatomyBadge.tsx";
export type { AnatomyBadgeProps } from "./app/components/AnatomyBadge.tsx";

export { BadgeTip } from "./app/components/BadgeTip.tsx";
export type { BadgeTipProps, BadgeWhere } from "./app/components/BadgeTip.tsx";

export { BeadLayer } from "./app/components/BeadLayer.tsx";
export type { BeadLayerProps } from "./app/components/BeadLayer.tsx";

// --- React: shell + router --------------------------------------------------
export { Root } from "./app/Root.tsx";
export { GalleryPage } from "./app/pages/GalleryPage.tsx";
export { SugyaPage } from "./app/pages/SugyaPage.tsx";
export type { SugyaPageProps } from "./app/pages/SugyaPage.tsx";
export { OpenPage } from "./app/pages/OpenPage.tsx";
export type { OpenPageProps } from "./app/pages/OpenPage.tsx";

export { forgetOne, forgetOpened, openSugya, useOpened, useSugyot } from "./app/sugyot.ts";
export type { Opened } from "./app/sugyot.ts";

export { Link, matchRoute, navigate, useQuery, useRoute } from "./app/router.tsx";
export type { LinkProps } from "./app/router.tsx";
