export const staticInputFormatProps = {
  displayType: "input" as "input",
  thousandSeparator: true,
  isNumericString: true,
  allowNegative: false,
};

export const currencyInputFormatProps = {
  prefix: "$",
  decimalSeparator: ".",
  displayType: "input" as "input",
  thousandSeparator: true,
  isNumericString: true,
  allowNegative: false,
};

export const currencyTextFormatProps = {
  prefix: "$",
  decimalSeparator: ".",
  displayType: "text" as "text",
  thousandSeparator: true,
  isNumericString: true,
  allowNegative: false,
  decimalScale: 2,
  fixedDecimalScale: true,
};
