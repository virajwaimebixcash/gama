import fund1 from '../../images/fund1.png';
import MultiSelectCheck from './MultiSelectCheck';
import BackgroundChange from './BackgroundChange';
import { Rating } from '@mui/material';

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const UniversalFundExplorerCard = ({ cardConfig, cardData, selectedSecurities, setSelectedSecurities }) => {

    const filteredConfig = cardConfig?.filter(config => config.fieldName !== 'SchemeName') || [];

    // Group TDs into rows of 3
    const rows = [];

    filteredConfig.forEach((config, filteredIndex) => {
        const rowIndex = Math.floor(filteredIndex / 3);
        if (!rows[rowIndex]) rows[rowIndex] = []; // Ensure row exists

        rows[rowIndex].push(
            <td key={config.fieldName} className='cenralintex'>
                {config.fieldName === 'fundInfo.rating' ? (
                    <Rating
                        name="user-rating"
                        value={cardData?.ValueResearchRating || 0}
                        precision={0.1}
                        readOnly
                    />
                ) : (
                    <div className='greenyescss'>{getNestedValue(cardData, config.fieldName) ?? 'N/A'}</div>
                    // <div className='greenyescss'>{cardData?.[config.fieldName] ?? 'N/A'}</div>
                )}
                <div className='graccol'>{config.displayHeader}</div>
            </td>
        );
    });

    // Handle checkbox selection
    const handleCheckboxChange = (schemeData) => {
        setSelectedSecurities((prevSelected) => {
            const isAlreadySelected = prevSelected.some(item => item.SchemeCode === schemeData.SchemeCode);
            if (isAlreadySelected) {
                // Remove the existing entry
                return [...prevSelected.filter(item => item.SchemeCode !== schemeData.SchemeCode)];
            } else {
                // Add the new security object while keeping the existing ones
                return [...prevSelected, { ...schemeData }];
            }
        });
    };

    return (
        <div className="boxsimple">
            <div className='grycssback'>
                <table>
                    <tbody>
                        <tr>
                            <td><img src={fund1} alt="Fund" /></td>
                            <td className='widthmainoart'>{cardData?.SchemeName || 'N/A'}</td>
                            <td>
                                <BackgroundChange
                                    checked={selectedSecurities.some(item => item.SchemeCode === cardData.SchemeCode)}
                                    onChange={() => handleCheckboxChange(cardData)}
                                    disabled={
                                        selectedSecurities.length === 4 &&
                                        !selectedSecurities.some(item => item.SchemeCode === cardData.SchemeCode)
                                    }
                                />
                            </td>
                            <td className='dashadddel'><MultiSelectCheck /></td>
                        </tr>
                    </tbody>
                </table>
                <table className='tabfullwids1'>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>{row}</tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UniversalFundExplorerCard;
