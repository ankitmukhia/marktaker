'use client'

import { Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth, SignInButton, UserButton, useUser } from '@clerk/nextjs'

export default function Appbar() {
	const { userId } = useAuth();
	const { user } = useUser();

	return (
		<div className="flex flex-row p-2 justify-between items-center">
			<div className="p-2">
				<Code color="yellow" />
			</div>
			{/** if login show profile else below button **/}
			{userId ? (
				<div className="flex flex-row dark:hover:bg-zinc-800 gap-2 p-2 rounded-full border items-center">
					<UserButton />
					<h2 className="text-sm font-extrabold dark:text-white">{user?.fullName}</h2>
				</div>
			) : (
				<SignInButton>
					<Button className="rounded-3xl font-semibold">
						Get Started
					</Button>
				</SignInButton>
			)}
		</div >
	)
}
