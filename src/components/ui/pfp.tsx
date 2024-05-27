import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getSession } from "@auth0/nextjs-auth0"

export default async function pfp() {
    const session = await getSession();
    if (!session) {
        return <div>Loading...</div>
    }

    const initials = session.user.name.split(" ").map((name: string) => name[0]).join("");

    return (
        <Avatar>
            <AvatarImage src={session.user.picture} />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    )
}