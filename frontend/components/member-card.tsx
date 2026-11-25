import { Card } from "@astryxdesign/core/Card";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Token } from "@astryxdesign/core/Token";
import { team, type Locale, type Member } from "../data/team";

export function MemberCard({ member, lang }: { member: Member; lang: Locale }) {
  const name = member.name[lang];
  const contact = member.contact ?? team.captainContact;
  return (
    <Card
      padding={5}
      elevation="none"
      className="h-full rounded-xl border border-border bg-card"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <Avatar name={name} src={member.photo} size={48} tooltip={false} />
        <span className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-secondary">
          {member.group}
        </span>
      </div>
      <h3 className="text-xl leading-tight font-semibold">{name}</h3>
      <p className="mt-2 font-medium">{member.role[lang]}</p>
      <p className="mt-3 text-sm leading-relaxed text-secondary">
        {member.contribution[lang]}
      </p>
      {member.skills?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <li key={skill}>
              <Token label={skill} size="sm" />
            </li>
          ))}
        </ul>
      ) : null}
      {contact && (
        <a href={contact} className="mt-4 inline-block underline">
          {member.contact
            ? name
            : lang === "ru"
              ? "Написать капитану"
              : "Contact the captain"}
        </a>
      )}
    </Card>
  );
}
