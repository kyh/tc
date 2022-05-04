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
      title={
        shareCalcType === "current"
          ? "Growth Based Estimate"
          : "Revenue Based Estimate"
      }
    >
      <p className="mt-5">
        Find a reasonable number for your equity value based off competitors:
      </p>
      <p className="mt-2">
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
    </Modal>
  );
};
