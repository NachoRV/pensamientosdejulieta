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
import { getAllPagesWithSlug, getAllPostByCategory, getAllPostsForHome, getCategories, getPostAndMorePosts } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'

export default function Category({ post, posts, preview, category }) {
  const router = useRouter()
  const morePosts = posts
  

  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />
  // }

  return (
    <Layout preview={preview}>
      <Container>
        {posts.length > 0 && <MoreStories posts={posts} subTitle={category} />}
      </Container>      
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params.slug
  const category = (await getCategories()).find(c => c.slug === categorySlug)
  const allPost = await getAllPostByCategory(category.name)
  return {
    props: {
      posts: allPost,
      category: category.name
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getCategories()
  const paths = allCategories.map(node => `/category/${node.slug}`) || [];
  return {
    paths,
    fallback: true,
  }
}

