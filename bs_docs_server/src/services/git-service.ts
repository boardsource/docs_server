import Git from "../configurations/git";
import env from "../configurations/EnvVars"
import path from 'path';
import { simpleGit, SimpleGit } from 'simple-git';

const repoPath = path.join(process.cwd(), "git_repo", env.repoFolder)
const clone = async () => {

    try {
        await Git.clone(env.repoURL)
        return repoPath
    } catch (error) {
        if (error.message.includes(`destination path '${env.repoFolder}' already exists and is not an empty directory`)) {
            pull()
        } else {
            throw error
        }
    }
}

const pull = async () => {

    try {
        const git: SimpleGit = simpleGit(repoPath);
        await git.pull();
    } catch (error) {
        console.log(error.message)
    }
}


export default {
    repoPath,
    clone,
    pull,
} as const;
