import { NextRequest, NextResponse } from 'next/server';
import appConfig from './app-config';
import i18config from '../next-i18next.config';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const defaultLanguage = appConfig.defaultLanguage.id;

  if (req.nextUrl.locale === defaultLanguage) {
    let locale = req.cookies.get('NEXT_LOCALE')?.value || defaultLanguage;
    if (locale !== defaultLanguage) {
      if (i18config.i18n.locales.findIndex((x) => locale === x) === -1) {
        locale = defaultLanguage;
      }

      const res = NextResponse.redirect(
        new URL(
          `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
          req.url
        )
      );

      res.cookies.set('NEXT_LOCALE', locale);
      return res;
    }
  }
}
