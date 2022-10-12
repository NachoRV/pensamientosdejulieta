import Header from "./header";
import { Avatar, Dropdown, Navbar } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Hero() {
  const router = useRouter()
  const isActiveRoute = (path) => {
    return router.asPath === path
  }
  const collapseItems = [
    {name:"Inicio", url:"/"},
    { name: "Blog", url: "/posts" },
    { name: "Sobre mi", url: "/about" },
  ];
  return (
    <>
      <div className="flex flex-col w-screen text-center h-40 justify-center items-center mb-0">
        <h1 className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-3xl font-extrabold text-transparent pt-14">
            Pensamientos de Julieta
          </h1>
        <Navbar isBordered variant="sticky">
          <Navbar.Toggle showIn="xs" />
          <Navbar.Brand
            css={{
              "@xs": {
                w: "12%",
              },
            }}
          >
          </Navbar.Brand>
          <Navbar.Content
            enableCursorHighlight
            activeColor="warning"
            hideIn="xs"
            variant="underline"
          >
            <Navbar.Link isActive={isActiveRoute('/')} href="/">Inicio</Navbar.Link>
            <Navbar.Link isActive={isActiveRoute('/posts')} href="/posts">Blog</Navbar.Link>
            <Navbar.Link isActive={isActiveRoute('/about')}  href="/about">Sobre mi</Navbar.Link>
          </Navbar.Content>
          <Navbar.Content
            css={{
              "@xs": {
                w: "12%",
                jc: "flex-end",
              },
            }}
          >
          </Navbar.Content>
          <Navbar.Collapse disableAnimation>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem
                key={item.url}
                activeColor="warning"
                isActive={isActiveRoute(item.url)} 
              >
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href={item.url}
                >
                  {item.name}
                </Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
        
      </div>
    </>
  )
}