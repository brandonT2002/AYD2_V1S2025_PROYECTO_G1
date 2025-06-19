import { FaAngleDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const DropdownNavItem = ({
    children,
    items = [],
    isOpen = false,
    onToggle,
    isActive,
    className = "",
}) => {
    const location = useLocation();
    const active =
        isActive !== undefined
            ? isActive
            : items.some((item) => location.pathname.startsWith(item.to || ""));
    return (
        <div className={`relative ${className}`}>
            <button
                onClick={onToggle}
                className={`
          flex items-center space-x-1 px-3 py-2 text-sm font-medium 
          transition-colors duration-200 hover:text-blue-600 
          ${active ? "text-blue-600" : "text-gray-600"}
        `}
            >
                <span>{children}</span>
                <FaAngleDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-5 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            to={item.to || "#"}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownNavItem;
