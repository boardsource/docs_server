import { IReq, IRes } from './shared/types';
import docsRoutes from './docs-routes';


async function serverInfo(req: IReq, res: IRes) {
  const routes = Object.values(docsRoutes.paths).map(path => {
    if (path !== docsRoutes.paths.update) {
      return `
      <li>
        GET:
        <a href="${docsRoutes.paths.basePath}${path}">
        ${docsRoutes.paths.basePath}${path}
        </a>
      </li>`
    } else {
      return `
      <li>
        POST:
        <a href="${docsRoutes.paths.basePath}${path}">
        ${docsRoutes.paths.basePath}${path}
        </a>
      </li>`
    }
  })
  res.setHeader("Content-Type", "text/html")
  res.send(`
  <h1>Boardsource Docs Server</h1>
  <h2>Available routes</h2>
  <p>
  This is not a website for you to view, this is simply a api server that serves up docs,
  for more info check the repo links.
  <a href="https://github.com/boardsource/docs_server">
 docs server github
 <br>
  </a>
  <a href="https://github.com/boardsource/docs">
  docs github
   </a>
   </p>
<ol>
${routes.join("")}
</ol>

  `)
};





export default {
  serverInfo
} as const;
