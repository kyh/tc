import { RadioGroup, Listbox } from "@headlessui/react";
import NumberFormat from "react-number-format";
import { FormField } from "~/components/FormField";
import type { CompHooksType } from "~/lib/comp";
import {
  currencyInputFormatProps,
  staticInputFormatProps,
} from "~/lib/formProps";

type Props = {
  comp: CompHooksType;
};

export const CompForm = ({ comp }: Props) => (
  <form>
    <fieldset className="cash-section">
      <legend className="text-sm text-slate-300">Cash Compensation</legend>
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
    <fieldset className="equity-section mt-10">
      <legend className="flex justify-between w-full text-sm text-slate-300">
        <span>Equity Compensation</span>
        <RadioGroup
          className="flex gap-2"
          value={comp.shareType}
          onChange={(shareType) => {
            comp.setShareType(shareType);
            comp.setIso("");
            comp.setStrikePrice("");
            comp.setRsu("");
            comp.setExpectedGrowthMultiple("");
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
          <FormField label="Shares per year" name="shares" placeholder="1,000">
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
    <fieldset className="equity-value-section mt-10">
      <legend className="flex justify-between w-full text-sm text-slate-300">
        <span>Estimate Equity Value</span>
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
              onValueChange={({ value }) => comp.setPreferredSharePrice(value)}
              onBlur={() => comp.updateData()}
            />
          </FormField>
          <FormField
            className="rounded-t-none"
            label={
              comp.shareType === "rsu"
                ? "Expected Market Growth (per year)"
                : "Expected Growth over 4 years"
            }
            name="revenue-multiple"
            placeholder={comp.shareType === "rsu" ? "30%" : "5x"}
          >
            <NumberFormat
              {...staticInputFormatProps}
              allowNegative
              suffix={comp.shareType === "rsu" ? "%" : "x"}
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
              onValueChange={({ value }) => comp.setSharesOutstanding(value)}
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
              onValueChange={({ value }) => comp.setExpectedRevenue(value)}
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
              onValueChange={({ value }) => comp.setRevenueMultiple(value)}
              onBlur={() => comp.updateData()}
            />
          </FormField>
        </div>
      )}
    </fieldset>
  </form>
);
