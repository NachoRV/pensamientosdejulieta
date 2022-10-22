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
        <title>{CMS_NAME}</title>
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
            <ul className="list-inside">
            { allCategories.map( category =>
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
