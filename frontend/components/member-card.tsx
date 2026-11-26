import Image from "next/image";
import type { Locale, Member } from "../data/team";

export function MemberCard({ member, lang }: { member: Member; lang: Locale }) {
  const name = member.name[lang];
  const words = name.split(" ");
  const initials = words[0][0] + words[lang === "ru" ? 1 : words.length - 1][0];

  return (
    <article className="member-card h-full rounded-2xl border border-line bg-panel p-6 lg:p-7">
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
        <span className="caption text-muted">{member.group}</span>
      </div>
      <h3 className="card-title max-w-[23ch]">
        {name}
      </h3>
      <p lang="en" className="body-copy mt-2 text-lilac">{member.role}</p>
      <ul
        aria-label={lang === "ru" ? "Достижения" : "Achievements"}
        className="body-copy mt-4 list-disc space-y-2 pl-5 text-muted"
      >
        {member.achievements.map((achievement) => (
          <li key={achievement.en}>{achievement[lang]}</li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-2">
        {member.skills.map((skill) => (
          <li key={skill.ru} className="tag">
            {skill[lang]}
          </li>
        ))}
      </ul>
    </article>
  );
}
