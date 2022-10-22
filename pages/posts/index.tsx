import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Intro from '../../components/intro'
import { getAllPostsForHome, getCategories } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'
import PostLayout from '../../components/PostLayout'
import Link from 'next/link'

export default function Index({ allPosts: { edges }, preview, allCategories }) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  return (
    <PostLayout preview={preview}>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        <Intro />
        <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-1">
          <div className="col-span-4">
            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.featuredImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </div>
          <div className="ml-8"> 
            <h2 className='font-bold mb-2 text-lg'>Categorías</h2>
            <ul className="list-inside ml-8">
            { allCategories.map( category =>
              <li className='mb-2'>
                <Link href={`/categorias/${category.slug}`} >{ `➤ ${category.name}`}</Link>
              </li>
              )}
            </ul>
          </div>
        </div>
      </Container>

    </PostLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)
  const allCategories = await getCategories()
  return {
    props: { allPosts, preview, allCategories },
    revalidate: 10,
  }
}
