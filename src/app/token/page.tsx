
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function TokenTest() {
    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    });
    const token = jwtToken?.token
    
    return token;

    // return (
    //     <button onClick={getToken}>
    //         Get JWT Token
    //     </button>
    // );
}