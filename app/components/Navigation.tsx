import { Logo } from "~/components/Logo";
import { About, useAbout } from "~/components/About";

export const Navigation = () => {
  const aboutProps = useAbout();

  return (
    <nav className="relative max-w-7xl mx-auto flex justify-between mb-10">
      <a href="/" className="inline-flex py-5 px-3">
        <span className="sr-only">Logo</span>
        <Logo />
      </a>
      <div className="flex items-center md:gap-4">
        <button
          type="button"
          className="p-3"
          onClick={() => aboutProps.setRun(true)}
        >
          About
        </button>
        <a
          className="p-3"
          href="https://github.com/kyh/tc"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
      <About {...aboutProps} />
    </nav>
  );
};
