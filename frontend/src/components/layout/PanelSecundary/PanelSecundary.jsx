const PanelSecundary = ({ children }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 bg-[#eef0f4] rounded-sm">
            {children}
        </div>
    );
};

export default PanelSecundary;
