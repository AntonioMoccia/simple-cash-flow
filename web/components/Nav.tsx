"use client"
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'

import { Button } from './ui/button'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from './ui/dropdown-menu'
import { Plus, Search } from 'lucide-react'


function Nav() {
    const { useSession, signOut } = authClient
    const { data: session } = useSession()
    const router = useRouter()
    const pathName = usePathname()


    const logout = async () => {
        await signOut()
    }


    return (
        <header>
            <nav className=' z-20 px-5 py-4 flex justify-center items-center bg-[#F9F9F9] fixed top-0 left-0 w-full '>
                <div className=' w-full max-w-6xl flex items-center justify-between'>

                    <Link href={'/'}>
                        <div className=' text-[#222222] font-bold'>
                            <h1>Logo</h1>
                        </div>
                    </Link>

                    <div className='flex justify-center items-center gap-2'>
                        {
                            pathName !== '/events/create' ? (
                                <Link href={'/events/create'}>
                                    <Button className=' cursor-pointer  bg-[#222222] text-[#F9F9F9] rounded-md '>
                                        <Plus />
                                        Aggiungi evento
                                    </Button>
                                </Link>
                            ): (
                                <Link href={'/events/search'}>
                                    <Button className=' cursor-pointer  bg-[#222222] text-[#F9F9F9] rounded-md '>
                                        <Search />
                                      Cerca evento
                                    </Button>
                                </Link>
                            )
                        }
                        {
                            session ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="outline-none">
                                        <Avatar className="cursor-pointer w-9 h-9">
                                            {session?.user.image && <AvatarImage src={session?.user.image} alt="Profile" />}
                                            <AvatarFallback className='uppercase'>{session?.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-56" align="end">
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{session?.user.name}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {session?.user.email}
                                                </span>
                                            </div>
                                        </DropdownMenuLabel>

                                        <DropdownMenuSeparator />
                                        {/* 
                            <DropdownMenuItem onClick={() => console.log("Vai al profilo")}>
                            Profilo
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem onClick={() => console.log("Impostazioni")}>
                            Impostazioni
                            </DropdownMenuItem> */}

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={logout}
                                        >
                                            Esci
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button className=' bg-transparent text-[#222222] border border-[#222222] rounded-md ' variant={'outline'}>
                                    <Link href={'/auth/sign-in'}>
                                        Login
                                    </Link>
                                </Button>
                            )
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Nav