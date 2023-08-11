"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaRegMessage } from "react-icons/fa6";
import { BotAvatar } from "@/components/bot-avatar";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MdMoreVert } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";



interface ChatHeaderProps {
    companion: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

export const ChatHeader = ({
    companion
}: ChatHeaderProps) => {
    const router = useRouter();
    const {user} = useUser();
    const {toast} = useToast();

    const onDelete =async () => {
        try {
            await axios.delete(`/api/companion/${companion.id}`);

            toast({
                description:"Success."
            });

            router.refresh();
            router.push("/");
        } catch (error) {
            toast({
                description:"Something went wrong.",
                variant:"destructive"
            })
        }
        
    }




    return(
        <div className=" flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center">
                <Button onClick={()=> router.back()} size="icon" variant="ghost">
                    <FaChevronLeft className=" h-8 w-8"/>
                </Button>
                <BotAvatar src={companion.src}/>
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">
                            {companion.name}
                        </p>
                        <div className="flex items-center text-xs-muted-foreground">
                            <FaRegMessage className="w-3 h-3 mr-1" />
                            {companion._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Created by {companion.userName}
                    </p>
                </div>
            </div>
            {user?.id === companion.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <MdMoreVert size="medium"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/companion/${companion.id}`)}>
                            <FaEdit className="w-4 h-4 mr-2 " />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete}>
                            <FaTrash className="w-4 h-4 mr-2 " />
                            Delete
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}