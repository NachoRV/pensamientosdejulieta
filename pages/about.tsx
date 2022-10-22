import { GetStaticProps } from "next"
import Container from "../components/container"
import Layout from "../components/layout"
import PostBody from "../components/post-body"
import { getAllPagesWithSlug, getPageWithId } from "../lib/api"


export default function Page({ page, preview }) {
  return (<>
    <Layout preview={preview}>
      <Container>
        <PostBody content={page.content} />
      </Container>
    </Layout>
  </>)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getAllPagesWithSlug()
  const pageId = data.find(node => node.slug === 'sobre-mi').id
  const page = await getPageWithId(pageId)
  return {
    props: {
      page: page
    }
  }
}
