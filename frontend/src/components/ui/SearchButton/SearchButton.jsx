import { FiSearch } from "react-icons/fi";

const SearchButton = ({ onClick, children = "Buscar" }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200"
        >
            <FiSearch size={18} />
            <span>{children}</span>
        </button>
    );
};

export default SearchButton;
