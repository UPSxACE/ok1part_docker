import { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';

export default function ClientSideGauge({
  delay,
  randomizer,
}: {
  delay?: number;
  randomizer?: number;
}) {
  const [percentage, setPercentage] = useState(0.3);

  useEffect(() => {
    if (randomizer) {
      setTimeout(() => {
        const positiveOrNegative = Math.floor(Math.random() * 2); // number between 0 and 1
        const value = Math.floor(Math.random() * randomizer + 1); // number between 1 and Randomizer

        setPercentage((percentage) => {
          if (positiveOrNegative === 0) {
            if (percentage - value / 100 > 0) {
              return percentage - value / 100;
            } else {
              return percentage + 1 / 100;
            }
          }
          if (positiveOrNegative === 1) {
            if (percentage + value / 100 < 1) {
              return percentage + value / 100;
            } else {
              return percentage - 1 / 100;
            }
          }
          return percentage;
        });
      }, delay || 750);
    }
  }, [percentage, delay, randomizer]);
  return (
    <GaugeChart
      animDelay={0}
      animateDuration={750}
      nrOfLevels={420}
      arcsLength={[0.3, 0.5, 0.2]}
      colors={['#5BE12C', '#F5CD19', '#EA4228']}
      percent={percentage}
      arcPadding={0.02}
      style={{
        width: '50%',
      }}
    />
  );
}
