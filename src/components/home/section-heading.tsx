import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.22em] text-rose uppercase">
          <span aria-hidden="true" className="h-px w-6 bg-rose/50" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-serif text-3xl leading-[1.15] font-medium tracking-tight text-balance text-foreground sm:text-4xl lg:text-[2.85rem]",
          align === "center" && "max-w-2xl",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
