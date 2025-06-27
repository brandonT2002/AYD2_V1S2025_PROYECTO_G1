import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { motion } from "framer-motion";
import { PiUserCircleDuotone } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { logout } = useAuth();
    const dropdownRef = useRef(null);
    const { handleSubmit } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const onLogout = handleSubmit(() => {
        logout();
        navigate("/");
    });

    if (!user) {
        return <div className="text-white">Cargando...</div>;
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex h-full flex-row items-center gap-2 hover:bg-panel-hover-dark py-2 px-2 rounded-full cursor-pointer border-2 border-border-dark"
                onClick={toggleDropdown}
            >
                <PiUserCircleDuotone size={24} className="text-text-base" />

                <div className="flex h-full flex-col gap-0 justify-center">
                    <span>{user.nombre}</span>
                </div>
                <IoIosArrowDown size={18} />
            </div>

            {isDropdownOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10 border border-border-second"
                >
                    <ul className="p-1">
                        <li
                            className="flex px-3 py-2 text-text-base hover:bg-gray-200 cursor-pointer transition-colors items-center gap-2 rounded-md"
                            onClick={onLogout}
                        >
                            <IoLogOut size={22} />
                            Logout
                        </li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default UserProfile;
