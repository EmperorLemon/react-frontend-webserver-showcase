import Link from "next/link";
import styles from "@/styles/NavigationHeader.module.css";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const NavigationHeader: React.FC = () => {
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

export default NavigationHeader;