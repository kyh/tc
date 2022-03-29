import { FormField } from "~/components/FormField";
import { Logo } from "~/components/Logo";

export default function Index() {
  return (
    <>
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
      <main className="relative container mx-auto mb-20 md:grid md:grid-cols-5">
        <section className="md:col-span-2 px-8 -ml-5">
          <h1 className="text-2xl font-bold tracking-tight">
            A layman's Total Compensation Calculator
          </h1>
          <p className="mt-5 text-gray-300">
            Understand your total compensation by factoring in company growth,
            competitor stock prices, and
          </p>
          <form action="" className="mt-10">
            <fieldset>
              <legend className="text-sm text-gray-300">
                Cash Compensation
              </legend>
              <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                <FormField
                  className="rounded-b-none"
                  label="Base Salary"
                  name="base"
                  placeholder="$100,000.00"
                />
                <FormField
                  className="rounded-none"
                  label="Sign on bonus"
                  name="signon"
                  placeholder="$10,000.00"
                />
                <FormField
                  className="rounded-t-none"
                  label="Yearly bonus target"
                  name="target"
                  placeholder="$10,000.00"
                />
              </div>
            </fieldset>
            <fieldset className="mt-10">
              <legend className="text-sm text-gray-300">
                Stock Compensation
              </legend>
              <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                <FormField
                  className="rounded-b-none"
                  label="Number of shares"
                  name="shares"
                  placeholder="1,000"
                />
                <FormField
                  className="rounded-t-none"
                  label="Strike Price per share"
                  name="strike"
                  placeholder="$10"
                />
              </div>
            </fieldset>
            <fieldset className="mt-10">
              <legend className="text-sm text-gray-300">Company Details</legend>
              <div className="isolate -space-y-px rounded-md shadow-sm mt-2">
                <FormField
                  className="rounded-b-none"
                  label="Shares Outstanding"
                  name="outstanding"
                  placeholder="10,000,000"
                />
                <FormField
                  className="rounded-none"
                  label="Expected Company Revenue"
                  name="revenue"
                  placeholder="$100,000,000"
                />
                <FormField
                  className="rounded-t-none"
                  label="Revenue Multiple"
                  name="revenue-multiple"
                  placeholder="15"
                />
              </div>
            </fieldset>
          </form>
        </section>
        <section className="md:col-span-3 px-8 -mr-5"></section>
      </main>
    </>
  );
}
