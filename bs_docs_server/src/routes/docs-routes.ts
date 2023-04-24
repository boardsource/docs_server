import HttpStatusCodes from '@src/configurations/HttpStatusCodes';
import docRepo from '@src/repos/doc-repo';
import { IReq, IRes } from './shared/types';


// **** Variables **** //

// Paths
const paths = {
  categories: '/categories',
  basePath: '/docs_api',
  get: '/all',
  getBase: '/',
  update: '/update',
  getCategory: "/:id",
  getSingle: "/single/:id"
} as const;

async function getSingle(req: IReq, res: IRes) {
  const docs = await docRepo.getSingle(req.params.id)
  if (Object.keys(docs).length > 0) {

    return res.status(HttpStatusCodes.OK).json(docs);
  } else {
    return res.status(HttpStatusCodes.NOT_FOUND).end();

  }
}

async function getAll(req: IReq, res: IRes) {
  const docs = await docRepo.getAll()
  if (Array.isArray(docs)) {

    return res.status(HttpStatusCodes.OK).json(docs.map(doc => {
      const { title, description, author, product_link, subcategory, draft, tags, banner, thumbnail, category, id, path, handle } = doc
      return { title, description, author, product_link, subcategory, draft, banner, thumbnail, category, id, tags: tags.split(","), route: `${req.protocol}://${req.get('host')}/${path}`, handle }
    }));
  } else {
    return res.status(HttpStatusCodes.NOT_FOUND).end();

  }
}

async function getAllCategories(req: IReq, res: IRes) {
  const docs = await docRepo.getAllCategories()
  if (Array.isArray(docs)) {
    return res.status(HttpStatusCodes.OK).json([...new Set(docs.map(category => (category.dataValues.category)))]);
  } else {
    return res.status(HttpStatusCodes.NOT_FOUND).end();

  }
}
async function getAllCategory(req: IReq, res: IRes) {

  const docs = await docRepo.get(req.params.id)
  if (Array.isArray(docs)) {
    console.log("docs", docs)
    return res.status(HttpStatusCodes.OK).json(docs.map(doc => {
      const { title, description, author, product_link, subcategory, draft, tags, banner, thumbnail, category, id, path } = doc
      return { title, description, author, product_link, subcategory, draft, banner, thumbnail, category, id, tags: tags.split(","), route: `${req.protocol}://${req.get('host')}/${path}` }
    }));
  } else {
    return res.status(HttpStatusCodes.NOT_FOUND).end();

  }
}

async function update(_: IReq, res: IRes) {

  const error = await docRepo.updateAll()
  if (error) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end()
  }
  return res.status(HttpStatusCodes.OK).end();
}



// **** Export default **** //

export default {
  paths,
  getSingle,
  getAllCategory,
  getAllCategories,
  getAll,
  update,
} as const;
