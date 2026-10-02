import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-display text-sm tracking-[0.16em] text-muted uppercase">
          Programming Club · IIT Indore
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-dim">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/software" className="hover:text-foreground">
            Software
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
