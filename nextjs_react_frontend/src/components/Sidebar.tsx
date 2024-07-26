import styles from "@/styles/components/Sidebar.module.css";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

function Sidebar() {
    return (
        <NavigationMenu className={styles.nav}>
            <NavigationMenuItem className={styles.navItem}>
                <Link href="/" passHref legacyBehavior>
                    <NavigationMenuLink className={styles.navLink}>
                        Home
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenu>
    );
};

export default Sidebar;