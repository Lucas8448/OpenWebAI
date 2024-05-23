import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from "next/navigation";

interface AuthWrapperProps {
    children: React.ReactNode;
}

export default async function AuthWrapper({ children }: AuthWrapperProps) {
    const session = await getSession();

    if (!session || !session.user) {
        return redirect("/api/auth/login");
    }

    return (
        <>
            {children}
        </>
    );
}
