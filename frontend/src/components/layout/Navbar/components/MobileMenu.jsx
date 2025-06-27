import { IoIosClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";


const MobileMenu = ({ isOpen, onClose, navigationItems, userProfile }) => {
    const location = useLocation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Menu Panel */}
            <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="text-lg font-semibold">Menú</span>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                        <IoIosClose className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="p-4 space-y-2">
                    {navigationItems.map((item, index) => (
                        <div key={index}>
                            {item.type === "dropdown" ? (
                                <div className="space-y-1">
                                    <div className="font-medium text-gray-800 px-3 py-2">
                                        {item.label}
                                    </div>
                                    {item.items?.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            to={subItem.to || "#"}
                                            onClick={onClose}
                                            className={`block px-6 py-2 text-sm transition-colors duration-200 rounded-md ${
                                                location.pathname === subItem.to
                                                    ? "text-blue-600 bg-blue-50"
                                                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                            }`}
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Link
                                    to={item.to || "#"}
                                    onClick={onClose}
                                    className={`block px-3 py-2 transition-colors duration-200 rounded-md ${
                                        location.pathname === item.to
                                            ? "text-blue-600 bg-blue-50"
                                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    ))}
                    {userProfile}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
