import Image from "next/image";
import { team, type Locale, type Member } from "../data/team";

export function MemberCard({ member, lang }: { member: Member; lang: Locale }) {
  const name = member.name[lang];
  const words = name.split(" ");
  const initials = words[0][0] + words[lang === "ru" ? 1 : words.length - 1][0];
  const contactLabel = member.contact
    ? lang === "ru"
      ? "Личный контакт"
      : "Personal contact"
    : lang === "ru"
      ? "Через команду"
      : "Via the team";

  return (
    <article className="member-card flex h-full flex-col rounded-2xl border border-line bg-panel p-6 lg:p-7">
      <div className="mb-8 flex items-center justify-between gap-4">
        {member.photo ? (
          <Image
            src={member.photo}
            alt=""
            width={52}
            height={52}
            unoptimized
            className="size-13 rounded-full object-cover"
          />
        ) : (
          <span aria-hidden="true" className="avatar">
            {initials}
          </span>
        )}
        <span className="meta text-muted">{member.group}</span>
      </div>
      <h3 className="max-w-[23ch] text-2xl leading-tight font-medium tracking-tight">
        {name}
      </h3>
      <p className="mt-2 text-lilac">{member.role[lang]}</p>
      <p className="mt-4 leading-relaxed text-muted">
        {member.contribution[lang]}
      </p>
      <ul className="mt-5 mb-7 flex flex-wrap gap-2">
        {member.skills.map((skill) => (
          <li key={skill.ru} className="tag">
            {skill[lang]}
          </li>
        ))}
      </ul>
      <a
        href={member.contact ?? team.contact}
        className="text-link mt-auto self-start"
      >
        {contactLabel}
        <span className="sr-only"> - {name}</span>
      </a>
    </article>
  );
}
