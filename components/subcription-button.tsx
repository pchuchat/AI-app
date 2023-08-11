"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdUpgrade } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface SubcriptionButtonProps {
    isPro: boolean;
}

export const SubcriptionButton = ({
    isPro = false
}: SubcriptionButtonProps) => {
    const [loading, setLoading] =useState(false); 
    const {toast} = useToast();

    const onClick = async () => {
        try {
            setLoading(true);
            const reponse = await axios.get("/api/stripe");
            window.location.href = reponse.data.url;
        } catch (error) {
            toast({
                variant:"destructive",
                description:"Something went wrong."
            })
        }finally{
            setLoading(false);
        }
        
    }
    return(
        <Button  onClick={onClick} disabled={loading }size="sm" variant={isPro ? "default":"premium"}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <MdUpgrade className="h-4 w-4 fill-white ml-2" />}

        </Button>
    )
}