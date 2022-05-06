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
  const isoCurrent = shareType === "iso" && shareCalcType == "current";
  const rsuCurrent = shareType === "rsu" && shareCalcType == "current";
  const isoRevenue = shareType === "iso" && shareCalcType == "revenue";
  const rsuRevenue = shareType === "rsu" && shareCalcType == "revenue";
  return (
    <Modal
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
      title="Terminology"
    >
      {isoCurrent && (
        <div className="mt-3">
          <h2 className="text-slate-50 font-bold">Preferred Stock Price</h2>
          <p className="mt-1">
            The preferred stock price is the price at which investors currently
            pay for shares of the company. You can ask your recruiter what the
            current price is.
          </p>
        </div>
      )}
      {rsuCurrent && (
        <div className="mt-3">
          <h2 className="text-slate-50 font-bold">Current Market Price</h2>
          <p className="mt-1">
            The current market price is the price at which the company on the
            market.
          </p>
        </div>
      )}
      {(isoRevenue || rsuRevenue) && (
        <div className="mt-3">
          <h2 className="text-slate-50 font-bold">Shares Outstanding</h2>
          <p className="mt-1">
            The shares outstanding is the number of shares that the company has
          </p>
        </div>
      )}
      <div className="mt-3">
        {isoCurrent && (
          <>
            <h2 className="text-slate-50 font-bold">
              Expected Growth over 4 years
            </h2>
            <p className="mt-1">
              Depending on the stage of the company expected growth can vary.
              Investors typically expect a 10x return on average, so you can put
              a number between 5 to 15 here.
            </p>
          </>
        )}
        {rsuCurrent && (
          <>
            <h2 className="text-slate-50 font-bold">Expected Market Growth</h2>
            <p className="mt-1"></p>
          </>
        )}
        {(isoRevenue || rsuRevenue) && (
          <>
            <h2 className="text-slate-50 font-bold">
              Expected Company Revenue
            </h2>
            <p className="mt-1"></p>
            <h2 className="text-slate-50 font-bold mt-3">Revenue Multiple</h2>
            <p className="mt-1"></p>
          </>
        )}
        <p className="mt-3 italic">
          Alternatively, you can estimate reasonable numbers by looking at
          competitors:
        </p>
        <form className="mt-2">
          <FormField
            className="rounded"
            label="Add your company or a competitor"
            name="competitor"
            placeholder="Google"
          >
            <input />
          </FormField>
        </form>
        <table className="relative min-w-full divide-y divide-slate-600 text-sm mt-2">
          <thead className="font-semibold">
            <tr>
              <th scope="col" className="px-3 py-3.5 text-left table-cell">
                Company
              </th>
              {isoCurrent && (
                <th scope="col" className="px-3 py-3.5 text-left table-cell">
                  Growth over 4 years
                </th>
              )}
              {rsuCurrent && (
                <th scope="col" className="px-3 py-3.5 text-left table-cell">
                  Current Market Value
                </th>
              )}
              {rsuCurrent && (
                <th scope="col" className="px-3 py-3.5 text-left table-cell">
                  Average Growth per year
                </th>
              )}
              {(isoRevenue || rsuRevenue) && (
                <>
                  <th scope="col" className="px-3 py-3.5 text-left table-cell">
                    Shares Outstanding
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left table-cell">
                    Revenue
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left table-cell">
                    Revenue Multiple
                  </th>
                </>
              )}
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
