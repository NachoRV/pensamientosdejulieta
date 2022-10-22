import Link from "next/link"
import { useRouter } from 'next/router'


export default function Nav({ urls }) {
  const router = useRouter()
  const isActiveRoute = (path) => {
    return router.asPath === path
  }
  return (
    <>
      <div className="flex gap-8 mt-12 border-t-2 w-full justify-start">
        {
          urls.map(({ url, name }) =>
            <Link
              key={url}
   
              href={url}>
              <a className={isActiveRoute(url) ? "block text-blue-600 border-t-2 border-t-red-600 pt-4 w-24" : "pt-4 w-24"}>
                 {name}
              </a>
            </Link>
            )
        }
      </div>

    </>
  )
  
}