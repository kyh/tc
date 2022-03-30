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

const calculateBase = (base = "0") => {
  return parseFloat(base || "0");
};

const calculateBonus = (year = "1", signOnBonus = "0", targetBonus = "0") => {
  if (year === "1")
    return parseFloat(signOnBonus || "0") + parseFloat(targetBonus || "0");
  return parseFloat(targetBonus || "0");
};

const calculateStocks = (shares = "0", strikePrice = "0", shareValue = "0") => {
  return (
    parseFloat(shares || "0") * parseFloat(shareValue || "0") -
    parseFloat(shares || "0") * parseFloat(strikePrice || "0")
  );
};

export const useCompHooks = () => {
  const [data, setData] = useState(baseData);

  const [base, setBase] = useState("");
  const [signOnBonus, setSignOnBonus] = useState("");
  const [targetBonus, setTargetBonus] = useState("");

  const [shareType, setShareType] = useState("ISO");
  const [iso, setIso] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [rsu, setRsu] = useState("");

  const [sharesOutstanding, setSharesOutstanding] = useState("");
  const [expectedRevenue, setExpectedRevenue] = useState("");
  const [revenueMultiple, setRevenueMultiple] = useState("");

  const updateData = () => {
    setData((prevData) =>
      prevData.map((d) => ({
        ...d,
        base: calculateBase(base),
        bonus: calculateBonus(d.year, signOnBonus, targetBonus),
        stock:
          shareType === "ISO"
            ? calculateStocks(iso, strikePrice, "70")
            : calculateStocks(rsu, "0", "70"),
      }))
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
    sharesOutstanding,
    setSharesOutstanding,
    expectedRevenue,
    setExpectedRevenue,
    revenueMultiple,
    setRevenueMultiple,
  };
};
