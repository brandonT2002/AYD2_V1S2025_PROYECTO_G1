import { RiMenu4Fill } from "react-icons/ri";
import { NavItem, DropdownNavItem, MobileMenu, UserProfile } from "./components";
import { useNavigation } from "./hooks";
import { navigationItems as defaultNavigationItems } from "./config";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Navbar = ({
    logoTitle = "IMPORCOMGUA",
    logoTo = "/",
    navigationItems = defaultNavigationItems,
    className = "",
}) => {
    const {
        activeDropdown,
        isMobileMenuOpen,
        toggleDropdown,
        toggleMobileMenu,
        closeMobileMenu,
    } = useNavigation();
    const { user } = useAuth();

    return (
        <>
            {user.rol_id != 0 && (
                <>
                    <nav
                        className={`bg-white border-b border-gray-200 ${className}`}
                    >
                        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <Link
                                    className="font-semibold text-text-base flex items-center gap-3"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="2.1em"
                                        viewBox="0 0 256 256"
                                    >
                                        <path
                                            fill="#2E60FA"
                                            d="m223.68 66.15l-88-48.15a15.88 15.88 0 0 0-15.36 0l-88 48.17a16 16 0 0 0-8.32 14v95.64a16 16 0 0 0 8.32 14l88 48.17a15.88 15.88 0 0 0 15.36 0l88-48.17a16 16 0 0 0 8.32-14V80.18a16 16 0 0 0-8.32-14.03M128 32l80.35 44l-29.78 16.29l-80.35-44Zm0 88L47.65 76l33.91-18.57l80.35 44Zm88 55.85l-80 43.79v-85.81l32-17.51V152a8 8 0 0 0 16 0v-44.44l32-17.51v85.76Z"
                                        />
                                    </svg>
                                    <span className="text-base font-bold">
                                        {logoTitle}
                                    </span>
                                </Link>

                                <div className="hidden lg:flex items-center space-x-4">
                                    {navigationItems.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {item.type === "dropdown" ? (
                                                <DropdownNavItem
                                                    items={item.items}
                                                    isOpen={
                                                        activeDropdown === index
                                                    }
                                                    onToggle={() =>
                                                        toggleDropdown(index)
                                                    }
                                                >
                                                    {item.label}
                                                </DropdownNavItem>
                                            ) : (
                                                <NavItem to={item.to}>
                                                    {item.label}
                                                </NavItem>
                                            )}
                                        </div>
                                    ))}
                                    <UserProfile user={user}/>
                                </div>

                                <button
                                    onClick={toggleMobileMenu}
                                    className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                                    aria-label="Abrir menú móvil"
                                >
                                    <RiMenu4Fill className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </nav>

                    <MobileMenu
                        isOpen={isMobileMenuOpen}
                        onClose={closeMobileMenu}
                        navigationItems={navigationItems}
                        userProfile={<UserProfile user={user} />}
                    />
                </>
            )}
        </>
    );
};

export default Navbar;
