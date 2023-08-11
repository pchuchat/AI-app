import { FaBars } from 'react-icons/fa';

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from '@/components/sidebar';

export const MobileSidebar = ({
    isPro
}: {isPro: boolean}) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4">
            <FaBars  />
            </SheetTrigger>
            <SheetContent side="left" className='p-0 bg-secondary pt-10 w-32'>
                <Sidebar isPro={isPro}/>
            </SheetContent>
            
        </Sheet>
    )
}