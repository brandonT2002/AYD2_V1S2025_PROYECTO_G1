// TableComponent.jsx
const TableComponent = ({ data, columns }) => {
    return (
        <table className="min-w-full border border-gray-300">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key} className="px-4 py-2 border-b">
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-100">
                        {columns.map((col) => (
                            <td key={col.key} className="px-4 py-2 border-b">
                                {row[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
