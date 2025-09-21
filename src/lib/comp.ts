import { useState } from "react";

const baseData = [
  {
    year: "1",
    base: 0,
    bonus: 0,
    stock: 0,
  },
  {
    year: "2",
    base: 0,
    bonus: 0,
    stock: 0,
  },
  {
    year: "3",
    base: 0,
    bonus: 0,
    stock: 0,
  },
  {
    year: "4",
    base: 0,
    bonus: 0,
    stock: 0,
  },
];

export type BaseDataType = typeof baseData;

const calculateBase = (base = "0") => {
  return parseFloat(base || "0");
};

const calculateBonus = (year = "1", signOnBonus = "0", targetBonus = "0") => {
  if (year === "1")
    return parseFloat(signOnBonus || "0") + parseFloat(targetBonus || "0");
  return parseFloat(targetBonus || "0");
};

const calculateStocks = (shares = "0", strikePrice = "0", shareValue = "0") => {
  const total =
    parseFloat(shares || "0") * parseFloat(shareValue || "0") -
    parseFloat(shares || "0") * parseFloat(strikePrice || "0");
  return total > 0 ? total : 0;
};

const compoundInterest = (
  principle: number = 0,
  rate: number = 0,
  time: number = 1,
  n: number = 1
) => {
  const amount = principle * Math.pow(1 + rate / n, n * time);
  const interest = amount - principle;
  return interest;
};

const calculateShareValueFromMultiple = (
  preferredSharePrice = "0",
  multiple = "0",
  calcTotal = true,
  year = "1"
) => {
  const price = parseFloat(preferredSharePrice || "0");
  const rate = parseFloat(multiple || "0");

  if (calcTotal) return (price * rate || 1).toFixed(2);

  const interest = compoundInterest(price, rate / 100, parseInt(year));
  return (price + interest).toFixed(2);
};

const calculateShareValueFromRevenue = (
  sharesOutstanding = "0",
  expectedRevenue = "0",
  revenueMultiple = "0"
) => {
  const valuation =
    parseFloat(expectedRevenue || "0") * parseFloat(revenueMultiple || "0");
  const shareValue = valuation / parseInt(sharesOutstanding || "1");

  return shareValue.toFixed(2);
};

export const useCompHooks = () => {
  const [data, setData] = useState(baseData);

  // cash comp
  const [base, setBase] = useState("");
  const [signOnBonus, setSignOnBonus] = useState("");
  const [targetBonus, setTargetBonus] = useState("");

  // stock info
  const [shareType, setShareType] = useState("iso");
  const [iso, setIso] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [rsu, setRsu] = useState("");

  // stock comp
  const [shareCalcType, setShareCalcType] = useState("current");
  // common
  const [preferredSharePrice, setPreferredSharePrice] = useState("");
  const [expectedGrowthMultiple, setExpectedGrowthMultiple] = useState("");
  // revenue
  const [sharesOutstanding, setSharesOutstanding] = useState("");
  const [expectedRevenue, setExpectedRevenue] = useState("");
  const [revenueMultiple, setRevenueMultiple] = useState("");

  const updateData = () => {
    setData((prevData) =>
      prevData.map((d) => {
        const sv =
          shareCalcType === "current"
            ? calculateShareValueFromMultiple(
                preferredSharePrice,
                expectedGrowthMultiple,
                shareType === "iso",
                d.year
              )
            : calculateShareValueFromRevenue(
                sharesOutstanding,
                expectedRevenue,
                revenueMultiple
              );

        return {
          ...d,
          base: calculateBase(base),
          bonus: calculateBonus(d.year, signOnBonus, targetBonus),
          stock:
            shareType === "iso"
              ? calculateStocks(iso, strikePrice, sv)
              : calculateStocks(rsu, "0", sv),
        };
      })
    );
  };

  return {
    data,
    updateData,
    base,
    setBase,
    signOnBonus,
    setSignOnBonus,
    targetBonus,
    setTargetBonus,

    shareType,
    setShareType,

    iso,
    setIso,
    rsu,
    setRsu,
    strikePrice,
    setStrikePrice,

    shareCalcType,
    setShareCalcType,

    preferredSharePrice,
    setPreferredSharePrice,
    expectedGrowthMultiple,
    setExpectedGrowthMultiple,

    sharesOutstanding,
    setSharesOutstanding,
    expectedRevenue,
    setExpectedRevenue,
    revenueMultiple,
    setRevenueMultiple,
  };
};

export type CompHooksType = ReturnType<typeof useCompHooks>;
