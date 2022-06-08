import NumberFormat from "react-number-format";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { Navigation } from "~/components/Navigation";
import { CompTable } from "~/components/CompTable";
import { CompForm } from "~/components/CompForm";
import Chart from "~/components/Chart";
import { useCompHooks } from "~/lib/comp";
import { currencyTextFormatProps } from "~/lib/formProps";

export default function Index() {
  const comp = useCompHooks();
  const totalTc = comp.data.reduce<number>(
    (acc, curr) => acc + curr.base + curr.bonus + curr.stock,
    0
  );
  const avgTc = totalTc / comp.data.length;

  return (
    <>
      <Navigation />
      <main className="relative max-w-7xl mx-auto mb-20 md:grid md:grid-cols-5">
        <section className="md:col-span-2 px-8 -ml-5">
          <div className="title-section">
            <h1 className="text-2xl font-bold tracking-tight">
              A layman's Total Compensation Calculator
            </h1>
            <p className="mt-3 text-slate-300">
              Understand your total compensation under current market
              conditions.
            </p>
          </div>
          <div className="mt-10">
            <CompForm comp={comp} />
          </div>
        </section>
        <section
          className={`py-10 md:col-span-3 md:px-20 md:py-0 sticky top-5 md:h-screen overflow-y-auto overflow-x-hidden transition-opacity ${
            avgTc ? "opacity-100" : "opacity-30 pointer-events-none"
          }`}
        >
          <p className="text-sm text-slate-400 px-3 md:px-0">
            Estimated Total Compensation
          </p>
          <div className="flex justify-between items-center mt-1 px-3 md:px-0">
            <div>
              <NumberFormat
                className="text-3xl font-bold tracking-tight"
                value={avgTc}
                {...currencyTextFormatProps}
              />
              {!!avgTc && (
                <span className="text-xs ml-1 text-slate-400">(per year)</span>
              )}
            </div>
          </div>
          <ParentSize
            className="mt-10"
            parentSizeStyles={{ height: "auto", width: "100%" }}
          >
            {({ width }) => (
              <Chart width={width} height={400} data={comp.data} />
            )}
          </ParentSize>
          <div className="relative w-full -mt-8 overflow-x-auto">
            <CompTable data={comp.data} />
          </div>
        </section>
      </main>
      <a
        href="https://www.producthunt.com/posts/total-compensation-calculator?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-total&#0045;compensation&#0045;calculator"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=347810&theme=dark"
          alt="Total&#0032;Compensation&#0032;Calculator - Your&#0032;total&#0032;compensation&#0032;under&#0032;current&#0032;market&#0032;conditions | Product Hunt"
          width="250"
          height="54"
          style={{ position: "fixed", bottom: 20, right: 20 }}
        />
      </a>
    </>
  );
}
