// components/NavigationHeader.tsx
import Link from "next/link";

import styles from "@/styles/NavigationHeader.module.css";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

function NavigationHeader() {
    return (
        <NavigationMenu className={styles.nav}>
            <NavigationMenuItem className={styles.navItem}>
                <Link href="/" passHref legacyBehavior>
                    <NavigationMenuLink className={styles.navLink}>
                        Home
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className={styles.navItem}>
                <Link href="/login" passHref legacyBehavior>
                    <NavigationMenuLink className={styles.navLink}>
                        Login
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenu>
    );
};

export default NavigationHeader;