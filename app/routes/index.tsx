import { RadioGroup, Listbox } from "@headlessui/react";
import NumberFormat from "react-number-format";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { FormField } from "~/components/FormField";
import { Navigation } from "~/components/Navigation";
import Chart from "~/components/Chart";
import { useCompHooks } from "~/lib/comp";

const currencyInputFormatProps = {
  prefix: "$",
  decimalSeparator: ".",
  displayType: "input" as "input",
  thousandSeparator: true,
  isNumericString: true,
  allowNegative: false,
};

const currencyTextFormatProps = {
  prefix: "$",
  decimalSeparator: ".",
  displayType: "text" as "text",
  thousandSeparator: true,
  isNumericString: true,
  allowNegative: false,
  decimalScale: 2,
  fixedDecimalScale: true,
};

const staticInputFormatProps = {
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
      <main className="relative max-w-7xl mx-auto mb-20 md:grid md:grid-cols-5">
        <section className="md:col-span-2 px-8 -ml-5">
          <h1 className="text-2xl font-bold tracking-tight">
            A layman's Total Compensation Calculator
          </h1>
          <p className="mt-5 text-slate-300">
            Understand your total compensation through a VC lens.
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
                    {...currencyInputFormatProps}
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
                    {...currencyInputFormatProps}
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
                    {...currencyInputFormatProps}
                    value={comp.targetBonus}
                    onValueChange={({ value }) => comp.setTargetBonus(value)}
                    onBlur={() => comp.updateData()}
                  />
                </FormField>
              </div>
            </fieldset>
            <fieldset className="mt-10">
              <legend className="flex justify-between w-full text-sm text-slate-300">
                <span>Stock Compensation</span>
                <RadioGroup
                  className="flex gap-2"
                  value={comp.shareType}
                  onChange={(shareType) => {
                    comp.setShareType(shareType);
                    comp.setIso("");
                    comp.setStrikePrice("");
                    comp.setRsu("");
                  }}
                  onBlur={() => comp.updateData()}
                >
                  <RadioGroup.Option value="iso">
                    {({ checked }) => (
                      <span
                        className={`cursor-pointer transition ${
                          checked ? "text-emerald-600" : ""
                        }`}
                      >
                        ISO
                      </span>
                    )}
                  </RadioGroup.Option>
                  <RadioGroup.Option value="rsu">
                    {({ checked }) => (
                      <span
                        className={`cursor-pointer transition ${
                          checked ? "text-emerald-600" : ""
                        }`}
                      >
                        RSU
                      </span>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
              </legend>
              {comp.shareType === "iso" && (
                <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                  <FormField
                    className="rounded-b-none"
                    label="Stock options per year"
                    name="shares"
                    placeholder="1,000"
                  >
                    <NumberFormat
                      {...staticInputFormatProps}
                      value={comp.iso}
                      onValueChange={({ value }) => comp.setIso(value)}
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
                      {...currencyInputFormatProps}
                      value={comp.strikePrice}
                      onValueChange={({ value }) => comp.setStrikePrice(value)}
                      onBlur={() => comp.updateData()}
                    />
                  </FormField>
                </div>
              )}
              {comp.shareType === "rsu" && (
                <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                  <FormField
                    label="Shares per year"
                    name="shares"
                    placeholder="1,000"
                  >
                    <NumberFormat
                      {...staticInputFormatProps}
                      value={comp.rsu}
                      onValueChange={({ value }) => comp.setRsu(value)}
                      onBlur={() => comp.updateData()}
                    />
                  </FormField>
                </div>
              )}
            </fieldset>
            <fieldset className="mt-10">
              <legend className="flex justify-between w-full text-sm text-slate-300">
                <span>Estimate Stock Value</span>
                <Listbox
                  value={comp.shareCalcType}
                  onChange={(shareCalcType) => {
                    comp.setShareCalcType(shareCalcType);
                    comp.setPreferredSharePrice("");
                    comp.setExpectedGrowthMultiple("");
                    comp.setSharesOutstanding("");
                    comp.setExpectedRevenue("");
                    comp.setRevenueMultiple("");
                  }}
                >
                  <div className="relative">
                    <Listbox.Button className="text-emerald-500">
                      {comp.shareCalcType === "current"
                        ? "Growth Based"
                        : comp.shareCalcType === "revenue"
                        ? "Revenue Based"
                        : null}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 w-[200px] right-0 mt-1 overflow-auto text-sm bg-black rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Listbox.Option
                        value="current"
                        className={({ active }) =>
                          `cursor-pointer select-none relative py-2 px-4 ${
                            active ? "text-emerald-100 bg-emerald-900" : ""
                          }`
                        }
                      >
                        Growth Based
                      </Listbox.Option>
                      <Listbox.Option
                        value="revenue"
                        className={({ active }) =>
                          `cursor-pointer select-none relative py-2 px-4 ${
                            active ? "text-emerald-100 bg-emerald-900" : ""
                          }`
                        }
                      >
                        Revenue Based
                      </Listbox.Option>
                    </Listbox.Options>
                  </div>
                </Listbox>
              </legend>
              {comp.shareCalcType === "current" && (
                <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                  <FormField
                    className="rounded-b-none"
                    label={
                      comp.shareType === "rsu"
                        ? "Current Market Value"
                        : "Preffered Stock Price"
                    }
                    name="preferredSharePrice"
                    placeholder="$10.00"
                  >
                    <NumberFormat
                      {...currencyInputFormatProps}
                      value={comp.preferredSharePrice}
                      onValueChange={({ value }) =>
                        comp.setPreferredSharePrice(value)
                      }
                      onBlur={() => comp.updateData()}
                    />
                  </FormField>
                  <FormField
                    className="rounded-t-none"
                    label="Expected Growth Multiple"
                    name="revenue-multiple"
                    placeholder="5"
                  >
                    <NumberFormat
                      {...staticInputFormatProps}
                      value={comp.expectedGrowthMultiple}
                      onValueChange={({ value }) =>
                        comp.setExpectedGrowthMultiple(value)
                      }
                      onBlur={() => comp.updateData()}
                    />
                  </FormField>
                </div>
              )}
              {comp.shareCalcType === "revenue" && (
                <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                  <FormField
                    className="rounded-b-none"
                    label="Shares Outstanding"
                    name="outstanding"
                    placeholder="10,000,000"
                  >
                    <NumberFormat
                      {...staticInputFormatProps}
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
                      {...currencyInputFormatProps}
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
                      {...staticInputFormatProps}
                      value={comp.revenueMultiple}
                      onValueChange={({ value }) =>
                        comp.setRevenueMultiple(value)
                      }
                      onBlur={() => comp.updateData()}
                    />
                  </FormField>
                </div>
              )}
            </fieldset>
          </form>
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
          <table className="relative min-w-full divide-y divide-slate-600 text-sm -mt-8">
            <thead className="font-semibold">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left table-cell">
                  Year
                </th>
                <th scope="col" className="px-3 py-3.5 text-left table-cell">
                  Base
                </th>
                <th scope="col" className="px-3 py-3.5 text-left table-cell">
                  Bonus
                </th>
                <th scope="col" className="px-3 py-3.5 text-left table-cell">
                  Stock
                </th>
                <th scope="col" className="px-3 py-3.5 text-right table-cell">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-500">
              {comp.data.map((c) => (
                <tr key={c.year}>
                  <td className="px-3 py-3.5 table-cell">{c.year}</td>
                  <td className="px-3 py-3.5 table-cell">
                    <NumberFormat value={c.base} {...currencyTextFormatProps} />
                  </td>
                  <td className="px-3 py-3.5 table-cell">
                    <NumberFormat
                      value={c.bonus}
                      {...currencyTextFormatProps}
                    />
                  </td>
                  <td className="px-3 py-3.5 table-cell">
                    <NumberFormat
                      value={c.stock}
                      {...currencyTextFormatProps}
                    />
                  </td>
                  <td className="px-3 py-3.5 table-cell text-right">
                    <NumberFormat
                      value={c.base + c.bonus + c.stock}
                      {...currencyTextFormatProps}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
