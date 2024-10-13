import {createClient} from "@/utils/supabase/server";
import {getUser} from "@/utils/supabase/queries";
import {Navbar} from "@/components/nav/navbar";

export const Header = async () => {
    const supabase = createClient();
    const user = await getUser(supabase);
     return <Navbar user={user}/>;
}