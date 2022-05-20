import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postDirectory = join(process.cwd(), '_posts')
/**
 * _postsDirectroy以下のディレクトリ名を取得する。
 * @returns 
 */
const getPostSlugs = () => {
    const allDirents = fs.readdirSync(postDirectory, { withFileTypes: true})
    return allDirents
        .filter(dirent => dirent.isDirectory())
        .map(({ name }) => name);
}

const getPostBySlug = (slug: string, fields: string[] = []) => {
    const fullPath = join(postDirectory, slug, 'index.md')
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(fileContents) 

    type Items = {
        [key: string]: string
    }

    const items: Items = {}
    fields.forEach(field => {
        if (field === 'slug') {
            items[field] = slug
        }
        if (field === 'content') {
            items[field] = content 
        }
        if (typeof data[field] !== 'undefined') {
            items[field] = data[field]
        }
    })
    return items
}

const getAllPosts = (fields: string[]) => {
    const slugs = getPostSlugs()
    const posts = slugs
        .map(slug => getPostBySlug(slug, fields))
        .sort((post1, post2) => post1.date > post2.date ? -1 : 1)
    return posts
}

export { getAllPosts }