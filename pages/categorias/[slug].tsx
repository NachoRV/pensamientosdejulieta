import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Tags from '../../components/tags'
import { getAllPostByCategory, getCategories, getPostAndMorePosts } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'
import Link from 'next/link'

export default function Category({ posts, preview, category, allCategories }) {
  const router = useRouter()

  if (!router.isFallback && !category) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-1">
          <div className="col-span-4 mt-2">
            {posts.length > 0 && <MoreStories posts={posts} subTitle={category} />}
          </div>
          <div className="ml-8 mt-64">
          <ul className="list-inside">
            {allCategories.map(category =>
              <li
                key={category.slug}
                className='m-0 mb-2'>
                <Link href={`/categorias/${category.slug}`} >
                  <a className='flex items-center'>
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16"></polyline></svg>
                    {`${category.name}`}

                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params.slug
  const category = (await getCategories()).find(c => c.slug === categorySlug) 
  const allPost = await getAllPostByCategory(category.name)
  const allCategories = await getCategories()
  return {
    props: {
      posts: allPost, 
      category: category.name,
      allCategories
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getCategories()
  const paths = allCategories.map(node => `/categorias/${node.slug}`) || [];
  return {
    paths,
    fallback: false,
  }
}