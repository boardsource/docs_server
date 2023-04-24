import { Router } from 'express';

import docsRoutes from './docs-routes';
import htmlRoutes from "./html-routes"

// **** Init **** //

// const apiRouter = Router();



const docsRouter = Router();


docsRouter.get(docsRoutes.paths.get, docsRoutes.getAll);
docsRouter.get(docsRoutes.paths.getBase, htmlRoutes.serverInfo);
docsRouter.get(docsRoutes.paths.categories, docsRoutes.getAllCategories);
docsRouter.get(docsRoutes.paths.getCategory, docsRoutes.getAllCategory);
docsRouter.get(docsRoutes.paths.getSingle, docsRoutes.getSingle);

docsRouter.post(
  docsRoutes.paths.update,

  docsRoutes.update,
);


export default docsRouter;
