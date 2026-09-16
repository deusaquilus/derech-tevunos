import { useCallback, useEffect, useMemo, useState } from "react";

import { DEFAULT_POLICY, type Policy } from "../../folding.ts";

const STORAGE_KEY = "sugya-lattice.fold-policy";

type Stored = { readonly openArrival: Policy["openArrival"] };

const read = (): Policy["openArrival"] => {
  if (typeof window === "undefined") return DEFAULT_POLICY.openArrival;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return DEFAULT_POLICY.openArrival;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_POLICY.openArrival;
    const { openArrival } = parsed as Partial<Stored>;
    return openArrival === "threads" || openArrival === "flat"
      ? openArrival
      : DEFAULT_POLICY.openArrival;
  } catch {
    return DEFAULT_POLICY.openArrival;
  }
};

const write = (openArrival: Policy["openArrival"]): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ openArrival } satisfies Stored));
  } catch {
    // Storage unavailable: the choice lasts for the session only.
  }
};

export type FoldPolicy = {
  readonly policy: Policy;
  /** The one switch the reader has: whether a challenge's arrival folds the finished threads behind it. */
  readonly threads: boolean;
  readonly setThreads: (on: boolean) => void;
};

/**
 * The fold policy as the reader left it. Only `openArrival` is switchable
 * from the page — it is the one rule whose two readings have to be compared
 * on the same sugya at the same step to be judged; `longReach` and `maxLanes`
 * are knobs in the code, not on the page.
 */
export const useFoldPolicy = (): FoldPolicy => {
  const [openArrival, setOpenArrival] = useState<Policy["openArrival"]>(read);

  useEffect(() => {
    write(openArrival);
  }, [openArrival]);

  const setThreads = useCallback((on: boolean) => setOpenArrival(on ? "threads" : "flat"), []);
  // One object per setting, so everything derived from the policy is memoised on it.
  const policy = useMemo<Policy>(() => ({ ...DEFAULT_POLICY, openArrival }), [openArrival]);

  return { policy, threads: openArrival === "threads", setThreads };
};
