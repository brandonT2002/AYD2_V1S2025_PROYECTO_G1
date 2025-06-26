const TableComponent = ({ data, columns, maxHeight = "300px" }) => {
    return (
        <div className="border-2 border-[#9fa2a6] rounded-lg overflow-hidden bg-white shadow-sm">
            <div 
                className="overflow-auto" 
                style={{ maxHeight: maxHeight }}
            >
                <table className="w-full">
                    <thead className="bg-[#eef0f4] sticky top-0">
                        <tr>
                            {columns.map((col) => (
                                <th 
                                    key={col.key} 
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200"
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, idx) => (
                            <tr 
                                key={idx} 
                                className="hover:bg-gray-100 transition-colors duration-150"
                            >
                                {columns.map((col) => (
                                    <td 
                                        key={col.key} 
                                        className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                                    >
                                        {row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableComponent;
