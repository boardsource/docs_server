import { Doc } from "../models/Doc"
import fs from 'node:fs/promises';
import fm from 'front-matter'
import sequelize from "@src/configurations/sqlite";
import fileService from "@src/services/file-service";
import path from "node:path";
import env from "../configurations/EnvVars"

type Frontmatter = {
    attributes: {
        title?: string
        description: string
        author: string
        product_link: string
        subcategory: string
        draft: boolean
        tags: string[]
        banner: string
        thumbnail: string
    }
    body: string
}
const getSingle = async (handle: string) => {
    try {
        const docs = await Doc.findAll({
            where: {
                handle
            }
        })
        const readPath = path.join(process.cwd(), "git_repo", docs[0].path)
        const file = await fs.readFile(readPath, 'utf8')
        const frontmatter: Frontmatter = fm(file)
        return { ...frontmatter, attributes: { ...frontmatter.attributes, category: docs[0].category.replaceAll("_", " "), editLink: `${env.repoURL.slice(0, -4)}/${docs[0].path}` } }
    } catch (error) {
        return error
    }
}
const getAllCategories = async () => {
    try {
        const categories = await Doc.findAll({
            attributes: ["category"]
        });
        return categories
    } catch (error) {
        return error

    }
}
const getAll = async (): Promise<Doc[] | Error> => {
    try {
        const docs = await Doc.findAll()
        return docs
    } catch (error) {
        return error
    }
}
const get = async (category: string): Promise<Doc[] | Error> => {
    try {
        const docs = await Doc.findAll({
            where: {
                category
            }
        })
        return docs
    } catch (error) {
        return error
    }
}
const add = async (readPath: string, path: string, category: string) => {
    try {

        const file = await fs.readFile(readPath, 'utf8')
        const frontmatter: Frontmatter = fm(file)
        const { title, description, author, product_link, subcategory, draft, tags, banner, thumbnail } = frontmatter.attributes
        if (frontmatter.attributes.title) {
            const newDoc = await Doc.create({ path, category, title, description, author, product_link, subcategory, draft, tags: tags.join(","), banner, thumbnail, handle: path.replaceAll("/", "-").replaceAll(".md", "").replaceAll(".mdx", "").slice(5) })
        }

    } catch (error) {
        console.log(error)
    }
}

const updateAll = async () => {
    try {
        await sequelize.drop()
        await sequelize.sync();
        fileService.crawlAndCreate()
    } catch (error) {
        return error
    }
}
export default {
    getSingle,
    getAllCategories,
    get,
    getAll,
    updateAll,
    add
} as const;
