import type { SeriesPoint } from "@visx/shape/lib/types";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { Grid } from "@visx/grid";
import { AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import NumberFormat from "react-number-format";

type CompTypes = "base" | "bonus" | "stock";

type Comp = {
  year: string;
  base: number;
  bonus: number;
  stock: number;
};

type Data = Comp[];

type TooltipData = {
  bar: SeriesPoint<Comp>;
  key: CompTypes;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};

export type BarStackProps = {
  data: Data;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const base = "#059669";
const bonus = "#0ea5e9";
const stock = "#f59e0b";
const defaultMargin = { top: 0, right: 0, bottom: 0, left: 0 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.8)",
  borderRadius: "0.5rem",
};

let tooltipTimeout: number;

export default function Chart({
  data,
  width,
  height,
  margin = defaultMargin,
}: BarStackProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });

  const keys = Object.keys(data[0]).filter((d) => d !== "year") as CompTypes[];

  const totals = data.reduce((all, current) => {
    const tc = keys.reduce((d, k) => {
      d += Number(current[k]);
      return d;
    }, 0);
    all.push(tc);
    return all;
  }, [] as number[]);

  const xScale = scaleBand<string>({
    domain: data.map((d) => d.year),
    padding: 0.2,
  });

  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...totals)],
    nice: true,
  });

  const colorScale = scaleOrdinal<CompTypes, string>({
    domain: keys,
    range: [base, bonus, stock],
  });

  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  xScale.rangeRound([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={containerRef} width={width} height={height}>
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          stroke="white"
          strokeOpacity={0.1}
        />
        <Group top={margin.top}>
          <BarStack
            data={data}
            keys={keys}
            x={(d) => d.year}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x + bar.width / 4}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width / 2}
                    fill={bar.color}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={(event) => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      const eventSvgCoords = localPoint(event);
                      const left = bar.x + bar.width / 2;
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: eventSvgCoords?.y,
                        tooltipLeft: left,
                      });
                    }}
                  />
                ))
              )
            }
          </BarStack>
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          scale={xScale}
          tickFormat={(d) => `Year ${d}`}
          stroke="#64748b"
          tickStroke="#64748b"
          tickLabelProps={() => ({
            fill: "#64748b",
            fontSize: 10,
            textAnchor: "middle",
          })}
        />
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <p className="text-xs text-slate-400">
            Year {tooltipData.bar.data["year"]}
          </p>
          <p className="mt-1 text-xs text-slate-50 capitalize">
            {tooltipData.key} compensation
          </p>
          <NumberFormat
            style={{ color: colorScale(tooltipData.key) }}
            className="text-xl mt-1"
            thousandSeparator
            displayType="text"
            prefix="$"
            value={tooltipData.bar.data[tooltipData.key]}
          />
        </TooltipInPortal>
      )}
    </div>
  );
}
