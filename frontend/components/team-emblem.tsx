import Image from "next/image";
import logo from "../assets/logo.png";

export function TeamEmblem({ placement }: { placement: "header" | "cover" }) {
  const inHeader = placement === "header";

  return (
    <Image
      src={logo}
      alt=""
      sizes={inHeader ? "64px" : "(min-width: 640px) 192px, 144px"}
      loading={inHeader ? "eager" : "lazy"}
      className={
        inHeader
          ? "h-auto w-16 rounded-md bg-white p-1"
          : "h-auto w-36 max-w-full mix-blend-multiply sm:w-48"
      }
    />
  );
}
