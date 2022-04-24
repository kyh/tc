import { Tab } from "@headlessui/react";

const selectedTabClassName = ({ selected }: { selected: boolean }) =>
  `w-full py-2.5 text-sm leading-5 font-medium text-emerald-600 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-emerald-400 ring-white ring-opacity-60 ${
    selected ? "bg-white shadow" : "hover:text-emerald-300"
  }`;

export const About = () => (
  <>
    <p className="mt-5">
      The term <strong>Total Compensation</strong> captures all the different
      ways you are financially compensated by your employer: base salary, bonus,
      equity, benefits, etc.
    </p>
    <p className="mt-2">
      Because of the differences in these forms of compensation, it can be hard
      to know ahead of time what compensation package is truly paying you.
    </p>
    <p className="mt-2 font-bold text-emerald-400">
      This calculator tries to normalize all these differences into numbers you
      can truly understand and compare against (at a private or public company)
    </p>
    <p className="mt-5">
      Broadly speaking, your compensation can be divided into 2 categories:
    </p>
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-1 bg-emerald-50/20 rounded-xl mt-2">
        <Tab className={selectedTabClassName}>Cash Compensation</Tab>
        <Tab className={selectedTabClassName}>Equity Compensation</Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque,
            iusto! Perferendis asperiores deserunt aliquam obcaecati quas, omnis
            iusto dicta odio molestias. Libero aliquam voluptas eligendi aperiam
            eius nesciunt culpa voluptatum!
          </p>
          <p className="mt-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque,
            iusto! Perferendis asperiores deserunt aliquam obcaecati quas, omnis
            iusto dicta odio molestias. Libero aliquam voluptas eligendi aperiam
            eius nesciunt culpa voluptatum!
          </p>
        </Tab.Panel>
        <Tab.Panel>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque,
            iusto! Perferendis asperiores deserunt aliquam obcaecati quas, omnis
            iusto dicta odio molestias. Libero aliquam voluptas eligendi aperiam
            eius nesciunt culpa voluptatum!
          </p>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  </>
);
