import { Modal } from "~/components/Modal";
import { FormField } from "~/components/FormField";
import type { Props as ModalProps } from "~/components/Modal";
import type { CompHooksType } from "~/lib/comp";

type Props = {
  shareType: CompHooksType["shareType"];
  shareCalcType: CompHooksType["shareCalcType"];
} & Omit<ModalProps, "title" | "children">;

const data: any[] = [];

export const CompModal = ({
  isOpen,
  closeModal,
  openModal,
  shareType,
  shareCalcType,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
      title="Terminology"
    >
      <div className="mt-3">
        <h2 className="text-slate-50 font-bold">Preferred Stock Price</h2>
        <p className="mt-1">
          The preferred stock price is the price at which investors currently
          pay for shares of the company. You can ask your recruiter what the
          current price is.
        </p>
      </div>
      <div className="mt-3">
        <h2 className="text-slate-50 font-bold">
          Expected Growth over 4 years
        </h2>
        <p className="mt-1">
          Depending on the stage of the company expected growth can vary.
          Investors typically expect a 10x return on average, so you can put a
          number between 5 to 15 here.
        </p>
        <p className="mt-2">
          Alternatively, you can estimate a growth rate by looking at
          competitors. The form below can help provide a reasonable estimate:
        </p>
        <p className="mt-4">
          <FormField
            className="rounded"
            label="Add a competitor"
            name="competitor"
            placeholder="Google"
          >
            <input />
          </FormField>
        </p>
        <table className="relative min-w-full divide-y divide-slate-600 text-sm mt-2">
          <thead className="font-semibold">
            <tr>
              <th scope="col" className="px-3 py-3.5 text-left table-cell">
                Company
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
            {data.map((c) => (
              <tr key={c.year}>
                <td className="px-3 py-3.5 table-cell">{c.year}</td>
                <td className="px-3 py-3.5 table-cell"></td>
                <td className="px-3 py-3.5 table-cell"></td>
                <td className="px-3 py-3.5 table-cell"></td>
                <td className="px-3 py-3.5 table-cell text-right text-white"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};
