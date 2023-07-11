import appConfig from '@/app-config';
import { useTranslation } from 'next-i18next';
import { Carousel } from 'react-responsive-carousel';
import ScreenshotText from './screenshot-text';

export default function ScreenshotCarousel() {
  const { t } = useTranslation();

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      autoPlay
      interval={3000}
      infiniteLoop
    >
      {appConfig.screenshots.map((screenshot) => {
        return (
          <ScreenshotText
            key={screenshot.title}
            title={t(screenshot.title)}
            desc={t(screenshot.desc)}
            imgPath={screenshot.imgPath}
          />
        );
      })}
    </Carousel>
  );
}
