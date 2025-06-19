import { Link, useLocation } from "react-router-dom";

const NavItem = ({ children, to = "#", isActive, className = "" }) => {
    const location = useLocation();

    // Auto-detect active state if not provided
    const active = isActive !== undefined ? isActive : location.pathname === to;

    return (
        <Link
            to={to}
            className={`
        px-3 py-2 text-sm font-semibold transition-colors duration-200 
        hover:text-blue-600 ${active ? "text-blue-600" : "text-gray-600"}
        ${className}
      `}
        >
            {children}
        </Link>
    );
};

export default NavItem;
