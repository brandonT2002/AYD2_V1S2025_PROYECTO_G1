const Panel = ({ children }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 bg-white rounded-xl">
            {children}
        </div>
    );
};

export default Panel;
