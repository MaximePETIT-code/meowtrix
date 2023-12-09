
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: currentUser.id,
            },
            include: {
                accounts: true,
                conversations: {
                    include: {
                        messages: true,
                    },
                },
                seenMessages: true,
            },
        });

        if (!existingUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: currentUser.id,
            },
            include: {
                accounts: true,
                conversations: {
                    include: {
                        messages: true,
                    },
                },
                seenMessages: true,
            },
        });

        existingUser.conversations.forEach((conversation) => {
            conversation.userIds.forEach(async (userId) => {
                const associatedUser = await prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });

                if (associatedUser?.email) {
                    pusherServer.trigger(
                        associatedUser.email,
                        'conversation:remove',
                        {
                            conversationId: conversation.id,
                        }
                    );
                }
            });
        });

        return NextResponse.json(deletedUser);
    } catch (error) {
        console.error(error);
        return new NextResponse('Error', { status: 500 });
    }
}

export async function POST(
    request: Request,
  ) {
    try {
      const currentUser = await getCurrentUser();
      const body = await request.json();
      const {
        name,
      } = body;
  
      if (!currentUser?.id) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
  
      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id
        },
        data: {
          name: name
        },
      });
  
      return NextResponse.json(updatedUser)
    } catch (error) {
      console.log(error, 'ERROR_MESSAGES')
      return new NextResponse('Error', { status: 500 });
    }
  }
