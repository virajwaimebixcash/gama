import trailing from "../../../images/trailing.png";

const TrailingReturn = ({ fundInfoData, fundValue }) => {
    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-IN', options);

    // Extract unique column headers dynamically
    const columns = [
        ...new Set(fundInfoData?.widgetDetail.map((item) => item.columnHeader)),
    ];

    // Group rows dynamically by rowHeader
    const groupedRows = {};
    fundInfoData?.widgetDetail.forEach((item) => {
        if (!groupedRows[item.rowHeader]) groupedRows[item.rowHeader] = {};
        groupedRows[item.rowHeader][item.columnHeader] = fundValue?.[item.dispatcherName] || "--";
    });

    return (
        <>
            <div className='fullsize logospac'>
                <div className="negatops">
                    <div className="trailing">
                        <div className="texleft">
                            <img src={trailing} />
                        </div>
                    </div>
                    <div className="width60">
                        <div className="padds12">
                            <div className="texleft">
                                <span className="padmeleftheader">{fundInfoData?.widgetDisplayName}</span>
                                <span className='subfont12'> - As On {formattedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <table className='width100 newsecurity'>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            {columns.map((col) => (
                                <th key={col}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedRows).map(([rowHeader, values]) => {
                            // Remove "-" from the rowHeader label
                            const formattedRowHeader = rowHeader.replace("-", " ");
                            return (
                                <tr key={rowHeader}>
                                    <td className='firsttd'>{formattedRowHeader}</td>
                                    {columns.map((col) => {
                                        const value = values[col];
                                        const isNegative = parseFloat(value) < 0; // Check if value is negative
                                        return (
                                            <td
                                                key={col}
                                                className={isNegative ? 'negvals' : ''} // Apply 'negvals' class if negative
                                            >
                                                {value !== undefined && value !== null && value !== "" && value !== "--"
                                                    ? `${value}%`
                                                    : value} {/* Display value as-is if it's "--", otherwise append "%" */}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TrailingReturn;
