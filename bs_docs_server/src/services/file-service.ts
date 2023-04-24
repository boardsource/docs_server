import glob from "glob"
import util from 'util'
import gitService from "./git-service";
import env from "../configurations/EnvVars"
import docRepo from "@src/repos/doc-repo";

const goodGlob = util.promisify(glob)
const crawlAndCreate = async () => {
    await gitService.pull()
    const fullPathfiles = await goodGlob(`${gitService.repoPath}/**/*.md`)
    fullPathfiles.forEach((path: string) => {
        let splitPath = path.split("/")
        const baseIndex = splitPath.indexOf(env.repoFolder)
        splitPath.splice(0, baseIndex + 1)
        const category = splitPath[0].endsWith("md") || splitPath[0].endsWith("mdx") ? "/" : splitPath[0]
        docRepo.add(`${gitService.repoPath}/${splitPath.join("/")}`, `${env.repoFolder}/${splitPath.join("/")}`, category)
    })
}
export default {
    crawlAndCreate,

} as const;


