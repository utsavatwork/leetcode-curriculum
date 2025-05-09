import React from "react";
import ReactDOMServer from "react-dom/server";
import type { Compiler } from "webpack";

import { App } from "../../app/components/App.tsx";

export class WriteIndexHtmlWebpackPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.constructor.name,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          compilation.emitAsset(
            "index.html",
            new compiler.webpack.sources.RawSource(
              "<!DOCTYPE html>\n" +
                ReactDOMServer.renderToStaticMarkup(
                  <html lang="en-US">
                    <head>
                      <meta charSet="utf-8" />
                      <title>Simon Game</title>
                      <script async src="main.js" />
                      <script async src="dependencies.js" />
                    </head>
                    <body>
                      <div id="main">
                        <App />
                      </div>
                    </body>
                  </html>,
                ) +
                "\n",
            ),
          );
        },
      );
    });
  }
}
