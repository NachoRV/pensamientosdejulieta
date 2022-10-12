import Alert from './alert'
import Footer from './footer'
import Hero from './Hero'
import Meta from './meta'

export default function PostLayout({ preview, children }) {
  return (
    <>
      <Meta />
      <Hero />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
