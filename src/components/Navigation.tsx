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
      <div className="flex items-center gap-5 pr-2 md:gap-6">
        <button
          type="button"
          className="hover:underline"
          onClick={() => aboutProps.setRun(true)}
        >
          About
        </button>
        <a
          className="hover:underline"
          href="https://docs.google.com/spreadsheets/d/1MorR4RBtiFMexFv91w9sKcqBRIkLyv7tb394j8BHlig/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Spreadsheet
        </a>
        <a
          className="hover:underline"
          href="https://github.com/kyh/tc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
      <About {...aboutProps} />
    </nav>
  );
};
