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
              Understand your total compensation from the eyes of an investor.
            </p>
          </div>
          <div className="mt-10">
            <CompForm comp={comp} />
          </div>
        </section>
        <section
          className={`py-10 md:col-span-3 md:px-20 md:py-0 sticky top-5 h-screen overflow-scroll transition-opacity ${
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
          <CompTable data={comp.data} />
        </section>
      </main>
    </>
  );
}
