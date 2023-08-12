import { SubcriptionButton } from "@/components/subcription-button";
import { checkSubscription } from "@/lib/subcription";

const SettingsPage = async () => {
    const isPro = await checkSubscription();
    return ( 
        <div className="h-full p-4 space-y-2">
            <h3 className="text-lg font-medium">Settings</h3>
            <div className="text-muted-foreground text-sm">
                {isPro ? "You are currently on a Pro plan": "You are currently on a free plan"}
            </div>
            <SubcriptionButton isPro={isPro} />
        </div>
     );
}
 
export default SettingsPage;