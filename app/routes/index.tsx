import NumberFormat from "react-number-format";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { FormField } from "~/components/FormField";
import { Navigation } from "~/components/Navigation";
import Chart from "~/components/Chart";
import { useCompHooks } from "~/lib/comp";

const currencyNumberFormatProps = {
  prefix: "$",
  decimalSeparator: ".",
  displayType: "input" as "input",
  thousandSeparator: true,
  isNumericString: true,
  allowNegative: false,
};

const staticNumberFormatProps = {
  displayType: "input" as "input",
  thousandSeparator: true,
  isNumericString: true,
  allowNegative: false,
};

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
      <main className="relative container mx-auto mb-20 md:grid md:grid-cols-5">
        <section className="md:col-span-2 px-8 -ml-5">
          <h1 className="text-2xl font-bold tracking-tight">
            A layman's Total Compensation Calculator
          </h1>
          <p className="mt-5 text-slate-300">
            Understand your startup total compensation by looking through a VC
            lens.
          </p>
          <form action="" className="mt-10">
            <fieldset>
              <legend className="text-sm text-slate-300">
                Cash Compensation
              </legend>
              <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                <FormField
                  className="rounded-b-none"
                  label="Base Salary"
                  name="base"
                  placeholder="$100,000.00"
                >
                  <NumberFormat
                    {...currencyNumberFormatProps}
                    value={comp.base}
                    onValueChange={({ value }) => comp.setBase(value)}
                    onBlur={() => comp.updateData()}
                  />
                </FormField>
                <FormField
                  className="rounded-none"
                  label="Sign on bonus"
                  name="signon"
                  placeholder="$10,000.00"
                >
                  <NumberFormat
                    {...currencyNumberFormatProps}
                    value={comp.signOnBonus}
                    onValueChange={({ value }) => comp.setSignOnBonus(value)}
                    onBlur={() => comp.updateData()}
                  />
                </FormField>
                <FormField
                  className="rounded-t-none"
                  label="Yearly bonus target"
                  name="target"
                  placeholder="$10,000.00"
                >
                  <NumberFormat
                    {...currencyNumberFormatProps}
                    value={comp.targetBonus}
                    onValueChange={({ value }) => comp.setTargetBonus(value)}
                    onBlur={() => comp.updateData()}
                  />
                </FormField>
              </div>
            </fieldset>
            <fieldset className="mt-10">
              <legend className="text-sm text-slate-300">
                Stock Compensation
              </legend>
              <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                <FormField
                  className="rounded-b-none"
                  label="Number of stock options (per year)"
                  name="shares"
                  placeholder="1,000"
                >
                  <NumberFormat
                    {...staticNumberFormatProps}
                    value={comp.shares}
                    onValueChange={({ value }) => comp.setShares(value)}
                    onBlur={() => comp.updateData()}
                  />
                </FormField>
                <FormField
                  className="rounded-t-none"
                  label="Strike Price per share"
                  name="strike"
                  placeholder="$10"
                >
                  <NumberFormat
                    {...currencyNumberFormatProps}
                    value={comp.strikePrice}
                    onValueChange={({ value }) => comp.setStrikePrice(value)}
                    onBlur={() => comp.updateData()}
                  />
                </FormField>
              </div>
            </fieldset>
            <fieldset className="mt-10">
              <legend className="text-sm text-slate-300">
                Estimate Stock Value
              </legend>
              <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                <FormField
                  className="rounded-b-none"
                  label="Shares Outstanding"
                  name="outstanding"
                  placeholder="10,000,000"
                >
                  <NumberFormat
                    {...staticNumberFormatProps}
                    value={comp.sharesOutstanding}
                    onValueChange={({ value }) =>
                      comp.setSharesOutstanding(value)
                    }
                    onBlur={() => comp.updateData()}
                  />
                </FormField>
                <FormField
                  className="rounded-none"
                  label="Expected Company Revenue"
                  name="revenue"
                  placeholder="$100,000,000"
                >
                  <NumberFormat
                    {...currencyNumberFormatProps}
                    value={comp.expectedRevenue}
                    onValueChange={({ value }) =>
                      comp.setExpectedRevenue(value)
                    }
                    onBlur={() => comp.updateData()}
                  />
                </FormField>
                <FormField
                  className="rounded-t-none"
                  label="Revenue Multiple"
                  name="revenue-multiple"
                  placeholder="15"
                >
                  <NumberFormat
                    {...staticNumberFormatProps}
                    value={comp.revenueMultiple}
                    onValueChange={({ value }) =>
                      comp.setRevenueMultiple(value)
                    }
                    onBlur={() => comp.updateData()}
                  />
                </FormField>
              </div>
            </fieldset>
          </form>
        </section>
        <section className="md:col-span-3 px-20 -mr-5 sticky top-5 h-[600px]">
          <p className="text-sm text-slate-400">Estimated Total Compensation</p>
          <div className="flex justify-between items-center mt-1">
            <div>
              <NumberFormat
                className="text-3xl font-bold tracking-tight"
                value={avgTc}
                displayType="text"
                thousandSeparator
                prefix="$"
              />
              {!!avgTc && (
                <span className="text-xs ml-1 text-slate-400">(per year)</span>
              )}
            </div>
          </div>
          <ParentSize className="mt-10">
            {({ width }) => (
              <Chart width={width} height={400} data={comp.data} />
            )}
          </ParentSize>
        </section>
      </main>
    </>
  );
}
