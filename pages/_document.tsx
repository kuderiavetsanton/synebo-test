import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export const desktopBgImage = process.env.GITHUB_ACTIONS
  ? "https://kuderiavetsanton.imgix.net/bg-desktop-light.jpg"
  : "/bg-desktop-light.jpg";
export const mobileBgImage = process.env.GITHUB_ACTIONS
  ? "https://kuderiavetsanton.imgix.net/bg-mobile-light.jpg"
  : "/bg-mobile-light.jpg";
const favIcon = process.env.GITHUB_ACTIONS
  ? "https://kuderiavetsanton.imgix.net/favicon.png"
  : "/favicon.png";
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ) as any,
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href={favIcon} />
          <link rel="preload" as="image" href={desktopBgImage} />
          <link rel="preload" as="image" href={mobileBgImage} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
