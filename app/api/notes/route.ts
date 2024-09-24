import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { z } from 'zod'

interface BodyProps {
	title: string;
	content: string;
	userId: string;
	tags: string[],
	status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD'
};

export async function POST(req: NextRequest) {
	const { title, content, tags, status } = await req.json() as BodyProps;
	const { userId } = auth()
	console.log("userId", userId)
	console.log("Received ", title, content, tags, status)

	if (!userId) {
		return NextResponse.json(
			{
				message: "Unauthorized"
			},
			{
				status: 401
			}
		)
	}
	const { success } = z.object({
		content: z.string(),
		title: z.string(),
		tags: z.array(z.string()),
		status: z.string()
	}).safeParse({ content, tags, title, status });

	if (!success) {
		return NextResponse.json(
			{
				message: "Invalid Input"
			},
			{
				status: 401
			}
		)
	}

	try {
		await db.note.create({
			data: {
				title,
				content,
				userId,
				tags: {
					create: tags.map(tag => ({ name: tag })),
				},
				status
			}
		})
		return NextResponse.json(
			{ message: "Note created" },
			{ status: 200 }
		)
	} catch (err) {
		return new Response(`Webhook error: ${err}`, {
			status: 400,
		});
	}
}
