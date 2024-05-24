import Sidebar from "@/components/ui/sidebar"

export default async function Config() {
    return (
        <div className="grid h-screen w-full pl-[56px]">
            <Sidebar active="config" />
        </div>
    )
}