import type { Group } from "../circumscription/reading.ts";

type Props = {
  readonly groups: readonly Group[];
  /** Keys of groups with no counterpart under the other reading. */
  readonly onlyHere: ReadonlySet<string>;
};

/**
 * The concept lattice, read as groups: a set of cases that answer every question
 * identically. Two cases in the same group are, as far as these questions go,
 * the same case.
 *
 * Membership that rests on a read-in fact is drawn dashed, so the reader can see
 * which part of the picture the source is not holding up.
 */
export function GroupPanel({ groups, onlyHere }: Props) {
  return (
    <ul className="groups">
      {groups.map((group) => (
        <li
          className={`group${onlyHere.has(group.key) ? " group--only-here" : ""}`}
          key={group.key}
        >
          <div className="group__head">
            <span className="group__title">{group.title}</span>
            <span className="group__count">
              {group.members.length} {group.members.length === 1 ? "case" : "cases"}
            </span>
          </div>
          <div className="group__members">
            {group.members.map((member) => (
              <span
                className={`chip${member.fragile ? " chip--fragile" : ""}`}
                key={member.term.id}
              >
                {member.term.chip}
                {member.fragile && <span className="chip__tag">read in</span>}
              </span>
            ))}
          </div>
          {onlyHere.has(group.key) && (
            <p className="group__note">This grouping exists only under this reading</p>
          )}
        </li>
      ))}
    </ul>
  );
}
