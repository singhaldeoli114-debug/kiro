import { Monogram } from "@/components/art/Monogram";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <Monogram initials="&" size={64} />
      <h1 className="font-display text-[2rem] leading-tight text-ink">
        This invitation could not be found
      </h1>
      <p className="max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">
        The link may have expired or been mistyped. Please use the personal link the family sent
        you, or ask the wedding coordinator to resend it.
      </p>
    </main>
  );
}
