import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { Layout } from "antd";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";

const RootDocument = () => (
  <Html lang="en">
    <Head />
    <body>
      <Layout>
        <Layout.Content
          style={{
            margin: "12px 8px 0",
            overflow: "initial",
            height: "calc(100vh - 55px)",
          }}
        >
          <div style={{ padding: 12, textAlign: "center" }}>
            <Main />
          </div>
        </Layout.Content>
        {/* <Layout.Footer style={{ textAlign: "center", marginBottom: "6px" }}>
          Created by Lamber project ©{new Date().getFullYear()}
        </Layout.Footer> */}
      </Layout>
      <NextScript />
    </body>
  </Html>
);

RootDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default RootDocument;
