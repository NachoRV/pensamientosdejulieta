import Link from "next/link"
import Nav from './Nav'
import { useRouter } from 'next/router'
import Instagram from '../public/favicon/instagram.svg'
import Twitter from '../public/favicon/twitter.svg'

export default function Hero() {
  const router = useRouter()
  const isActiveRoute = (path) => {
    return router.asPath === path
  }
  const navItems = [
    {name:"INICIO", url:"/"},
    { name: "SOBRE MI", url: "/about" },
    { name: "BLOG", url: "/posts" },
  ];
  return (
    <>
      <div className="flex flex-col w-screen text-center justify-center items-center mb-16">
        <div className="flex w-screen justify-end m-5 gap-3 pr-5">
          {/* <a href="https://www.instagram.com/" target="_blank">
            <Instagram />
          </a>

          <Twitter /> */}
        </div>
        <h1 className="text-6xl font-extrabold pt-14">
            Pensamientos de Julieta
        </h1>
        <Nav urls={navItems}></Nav>
      </div>
    </>
  )
}