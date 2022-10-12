import { GetStaticPaths, GetStaticProps } from "next"
import Layout from "../../components/layout"
import PostBody from "../../components/post-body"
import { getAllPagesWithSlug, getPageWithId } from "../../lib/api"


export default function Page({ page, preview }) {
  return (<>
    <Layout preview={preview}>
      <PostBody content={page.content} />
    </Layout>
  </>)
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const data = await getAllPagesWithSlug()
  const pageId = data.find(node => node.slug === params.slug).id
  const page = await getPageWithId(pageId)
  return {
    props: {
      page: page // data?.nodes
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await getAllPagesWithSlug()
  console.log(allPages)
  return {
    paths: allPages.map(node  => `/page/${node.slug}`) || [],
    fallback: true,
  }
}

