import { Logo } from "~/components/Logo";

export const Navigation = () => (
  <nav className="relative container mx-auto flex justify-between mb-10">
    <a href="/" className="inline-flex py-5 px-3">
      <span className="sr-only">Logo</span>
      <Logo />
    </a>
    <div className="flex items-center">
      <a
        className="p-3"
        href="https://github.com/kyh/tc"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </div>
  </nav>
);
