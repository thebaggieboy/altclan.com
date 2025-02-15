// 'use client';

import { RiExternalLinkLine } from '@remixicon/react';
import { AreaChart, Card } from '@tremor/react';

function valueFormatter(number) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(number);
}

const data = [
  {
    date: 'Jan 23',
    Balance: 38560,
  },
  {
    date: 'Feb 23',
    Balance: 40320,
  },
  {
    date: 'Mar 23',
    Balance: 50233,
  },
  {
    date: 'Apr 23',
    Balance: 55123,
  },
  {
    date: 'May 23',
    Balance: 56000,
  },
  {
    date: 'Jun 23',
    Balance: 100000,
  },
  {
    date: 'Jul 23',
    Balance: 85390,
  },
  {
    date: 'Aug 23',
    Balance: 80100,
  },
  {
    date: 'Sep 23',
    Balance: 75090,
  },
  {
    date: 'Oct 23',
    Balance: 71080,
  },
  {
    date: 'Nov 23',
    Balance: 68041,
  },
  {
    date: 'Dec 23',
    Balance: 60143,
  },
];

export default function Example() {
  return (
    <>
      <Card className="p-0 sm:mx-auto sm:w-full">
        <div className="p-6">
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Balance
          </p>
          <p className="text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            $60,143
          </p>
          <AreaChart
            data={data}
            index="date"
            categories={['Balance']}
            showLegend={false}
            showGradient={false}
            yAxisWidth={45}
            valueFormatter={valueFormatter}
            className="mt-8 hidden h-60 sm:block"
          />
          <AreaChart
            data={data}
            index="date"
            categories={['Balance']}
            showLegend={false}
            showGradient={false}
            showYAxis={false}
            startEndOnly={true}
            valueFormatter={valueFormatter}
            className="mt-8 h-48 sm:hidden"
          />
        </div>
        <div className="rounded-b-tremor-default border-t border-tremor-border bg-tremor-background-muted px-6 py-4 dark:border-dark-tremor-border dark:bg-dark-tremor-background">
          <div className="flex justify-between">
            <span className="inline-flex select-none items-center rounded-tremor-small bg-tremor-background px-2 py-1 text-tremor-label font-medium text-tremor-content-strong ring-1 ring-inset ring-tremor-ring dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong dark:ring-tremor-content-emphasis">
              Team access
            </span>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="flex items-center gap-1.5 text-tremor-default text-tremor-brand hover:underline hover:underline-offset-4 dark:text-dark-tremor-brand"
              >
                View transactions
                <RiExternalLinkLine className="size-4" aria-hidden={true} />
              </a>
              <span
                className="hidden h-6 w-px bg-tremor-border dark:bg-dark-tremor-border sm:block"
                aria-hidden={true}
              />
              <a
                href="#"
                className="hidden items-center gap-1.5 text-tremor-default text-tremor-brand hover:underline hover:underline-offset-4 dark:text-dark-tremor-brand sm:flex"
              >
                View statements
                <RiExternalLinkLine className="size-4" aria-hidden={true} />
              </a>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}