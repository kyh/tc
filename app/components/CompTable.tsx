import type { BaseDataType } from "~/lib/comp";
import NumberFormat from "react-number-format";
import { currencyTextFormatProps } from "~/lib/formProps";

type Props = {
  data: BaseDataType;
};

export const CompTable = ({ data }: Props) => (
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
      {data.map((c) => (
        <tr key={c.year}>
          <td className="px-3 py-3.5 table-cell">{c.year}</td>
          <td className="px-3 py-3.5 table-cell">
            <NumberFormat value={c.base} {...currencyTextFormatProps} />
          </td>
          <td className="px-3 py-3.5 table-cell">
            <NumberFormat value={c.bonus} {...currencyTextFormatProps} />
          </td>
          <td className="px-3 py-3.5 table-cell">
            <NumberFormat value={c.stock} {...currencyTextFormatProps} />
          </td>
          <td className="px-3 py-3.5 table-cell text-right text-white">
            <NumberFormat
              value={c.base + c.bonus + c.stock}
              {...currencyTextFormatProps}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
