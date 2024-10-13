import {Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import Link from "next/link";
import {TbSquareArrowRight} from "react-icons/tb";
import {FiLogOut} from "react-icons/fi";
import {handleSignOut} from "./authActions";

export default function AuthButton({ user }) {
    return (
        <div className="flex items-center space-x-4">
            {!user ? (
                <>
                    <Button as={Link} href="/signin" variant="bordered" className="hidden md:inline-flex text-white">
                        Sign in
                    </Button>
                    <Button as={Link} href="/signup" variant="bordered" className="p-4 text-white">
                        Try FlyFast
                        <TbSquareArrowRight className="mr-2 h-4 w-4"/>
                    </Button>
                </>
            ) : (
                <>
                    <Link href="/dashboard">
                        <Button variant="bordered">Dashboard</Button>
                    </Link>
                    <Dropdown>
                        <DropdownTrigger>
                            <Avatar
                                className="h-8 w-8 cursor-pointer border border-gray-600/50 uppercase"
                                fallback={
                                    user?.user_metadata.full_name?.[0] || user?.email?.[0] || "U"
                                }
                                src={user.user_metadata.avatar_url}
                                alt={user.user_metadata.full_name || "User avatar"}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Logout action" className={"w-full h-full"}>
                            <DropdownItem key="logout"
                                          className="flex cursor-pointer items-center focus:bg-secondary-300/10">
                                <form action={handleSignOut}>
                                    <button
                                        className="flex w-full cursor-pointer items-center focus:bg-secondary-300/10">
                                        <FiLogOut className="mr-2 h-4 w-4"/>
                                        <span>Sign out</span>
                                    </button>
                                </form>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </>
            )}
        </div>
    );
}