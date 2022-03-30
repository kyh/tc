import { useState } from "react";

export const calculateBase = (base = "0") => {
  return parseFloat(base);
};

export const calculateBonus = (
  year = "1",
  signOnBonus = "0",
  targetBonus = "0"
) => {
  if (year === "1") return parseFloat(signOnBonus) + parseFloat(targetBonus);
  return parseFloat(targetBonus);
};

export const calculateStocks = (
  shares = "0",
  strikePrice = "0",
  shareValue = "0"
) => {
  return (
    parseFloat(shares) * parseFloat(shareValue) -
    parseFloat(shares) * parseFloat(strikePrice)
  );
};

export const useCompHooks = () => {
  const [data, setData] = useState([
    {
      year: "1",
      base: 100000,
      bonus: 20000,
      stock: 30000,
    },
    {
      year: "2",
      base: 100000,
      bonus: 0,
      stock: 30000,
    },
    {
      year: "3",
      base: 100000,
      bonus: 0,
      stock: 30000,
    },
    {
      year: "4",
      base: 100000,
      bonus: 0,
      stock: 30000,
    },
  ]);

  const [base, setBase] = useState("");
  const [signOnBonus, setSignOnBonus] = useState("");
  const [targetBonus, setTargetBonus] = useState("");

  const [shares, setShares] = useState("");
  const [strikePrice, setStrikePrice] = useState("");

  const [sharesOutstanding, setSharesOutstanding] = useState("");
  const [expectedRevenue, setExpectedRevenue] = useState("");
  const [revenueMultiple, setRevenueMultiple] = useState("");

  const updateData = () => {
    setData(
      data.map((d) => {
        return {
          ...d,
          base: calculateBase(base),
          bonus: calculateBonus(d.year, signOnBonus, targetBonus),
          stock: calculateStocks(shares, strikePrice, "70"),
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
    shares,
    setShares,
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
