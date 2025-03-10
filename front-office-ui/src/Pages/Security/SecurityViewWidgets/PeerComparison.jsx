import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Box, Alert, Snackbar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import styled from '@mui/system/styled';
import peer from "../../../images/peer.png";
import Tabs from "./tab";
import TabPane from "./tab-pane";
import intable1 from "../../../images/intable1.png";
import Checkboxes1 from '../../../Common/FormComponent/Checkboxes1';
import { useCallback, useEffect, useState } from 'react';
import api from '../../../APIs/interceptor';
import { actionCreators } from '../../../redux/actions/actionCreators';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
}));

const groupByCategory = (details) => {
    return details.reduce((result, item) => {
        const { categoryDisplayName } = item;
        if (!result[categoryDisplayName]) result[categoryDisplayName] = [];
        result[categoryDisplayName].push(item);
        return result;
    }, {});
};

const PeerComparison = ({ fundInfoData, fundValue, selectedScheme }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [peerData, setPeerData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [compareResult, setCompareResult] = useState([]);
    const widgetDetails = fundInfoData?.widgetDetail || [];

    const groupedConfig = groupByCategory(widgetDetails);

    const clientCode = import.meta.env.VITE_CLIENT_CODE;


    const handleCheckboxChange = (SchemeCode) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(SchemeCode)) {
                // If the checkbox is already selected, unselect it
                return prevSelected.filter((item) => item !== SchemeCode);
            } else if (prevSelected.length < 4) {
                // If fewer than 3 checkboxes are selected, add the new selection
                return [...prevSelected, SchemeCode];
            }
            else {
                return prevSelected; // No change
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.post('/schemes/FundDetails', {
                    schemeCode: 0,
                    mwiclientCode: clientCode,
                    category: fundValue?.Category,
                    issuerCode: 0,
                    topSecurity: 6,
                    isSortedbyAUM: 1,
                });

                let data = res.data || [];
                // Build the selected scheme object
                const selectedSchemeData = {
                    SchemeName: selectedScheme.SchemeName,
                    ...selectedScheme.fundInfo,
                };

                // Check if selected scheme is already present in peerData
                const isPresent = data.some(
                    (item) => item.SchemeName === selectedScheme.SchemeName
                );

                let finalPeerData;

                if (!isPresent) {
                    // Add selected scheme and take the first 5 items
                    const topFivePeers = data.slice(0, 5);
                    finalPeerData = [selectedSchemeData, ...topFivePeers];
                } else {
                    // Exclude the selected scheme and take another 5 items
                    const remainingData = data.filter(
                        (item) => item.SchemeName !== selectedScheme.SchemeName
                    );
                    const topFivePeers = remainingData.slice(0, 5);
                    finalPeerData = [selectedSchemeData, ...topFivePeers];
                }

                // Sort final data by AUM in descending order
                finalPeerData.sort((a, b) => b.AUM - a.AUM);

                setPeerData(finalPeerData);
            } catch (error) {
                console.error("Failed to fetch data", error);
                setPeerData([]);
            }
        };

        fetchData();
    }, [clientCode, fundValue?.Category, selectedScheme.SchemeName, selectedScheme.fundInfo]);

    const handleCompare = () => {
        const selectedData = peerData.filter((data) =>
            selectedItems.includes(data.SchemeCode)
        );
        navigate("/fundComparison", { state: { selectedData } });
    };


    return (
        <>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 8 }}>
                <Item className=''>
                    <div className='fullsize logospacpeer'>
                        <div className=' formedi'>
                            <div className="wid20">
                                <div className="texleft">
                                    <table>
                                        <tr>
                                            <td>
                                                <img src={peer} />
                                            </td>
                                            <td>
                                                <span className="">{fundInfoData?.widgetDisplayName}</span>
                                            </td>
                                        </tr>
                                    </table>
                                </div></div>
                            <div className="hi20 wid25">
                                <div className="">
                                    <div className="texleft">
                                        <span className='subfont'> </span>
                                        <Button variant="contained" color="primary"
                                            onClick={handleCompare}
                                            disabled={selectedItems.length === 0}
                                            className='fixbtnsize rightfloats addtocartbtn addbtninpeer'>
                                            Compare <span className='incount'

                                            >{selectedItems.length}</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="container ">
                                <Tabs>
                                    {Object.keys(groupedConfig).map((categoryName, index) => {
                                        return (
                                            <TabPane name={categoryName} key={`${categoryName}_${index}`}>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Grid container spacing={0} className="hideincell">
                                                        <Grid minHeight={10} size={{ xs: 12, sm: 12, md: 4, lg: 1 }}>
                                                            <Item>
                                                                <div className="newth1 compcheckcss">Compare</div>
                                                            </Item>
                                                        </Grid>

                                                        {/* ---Static "Fund Name" grid---- */}
                                                        <Grid minHeight={10} size={{ xs: 12, sm: 12, md: 4, lg: 5 }}>
                                                            <Item>
                                                                <div className="newth1">Fund Name</div>
                                                            </Item>
                                                        </Grid>

                                                        {groupedConfig[categoryName]
                                                            .filter((column) => {
                                                                const isFundName = column.dispatcherName.toLowerCase() === "schemename";
                                                                return !isFundName; // Exclude "Fund Name"
                                                            })
                                                            .slice(0, 5)
                                                            .map((column, idx) => (
                                                                <Grid
                                                                    key={idx}
                                                                    minHeight={10}
                                                                    size={
                                                                        groupedConfig[categoryName].length === 4
                                                                            ? { xs: 4, sm: 4, md: 4, lg: 2 }
                                                                            : groupedConfig[categoryName].length === 5
                                                                                ? { xs: 4, sm: 4, md: 4, lg: 1.5 }
                                                                                : { xs: 4, sm: 4, md: 4, lg: 1.15 }
                                                                    }
                                                                >
                                                                    <Item>
                                                                        <div className="newth1">{column.fieldDisplayName}</div>
                                                                    </Item>
                                                                </Grid>
                                                            ))}
                                                    </Grid>
                                                    {peerData.map((data) => (
                                                        <Grid container key={data.id} spacing={0}>
                                                            <Grid minHeight={10} size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                                                                <Item>
                                                                    <table>
                                                                        <tr>
                                                                            <td className="smallchecks1">
                                                                                <Checkboxes1
                                                                                    checked={selectedItems.includes(data.SchemeCode)}
                                                                                    onChange={() => handleCheckboxChange(data.SchemeCode)}
                                                                                    disabled={
                                                                                        selectedItems.length === 4 &&
                                                                                        !selectedItems.includes(data.SchemeCode)
                                                                                    }
                                                                                />
                                                                            </td>
                                                                            <td className='newforseperation'>
                                                                                <img src={intable1} />
                                                                            </td>
                                                                            <td className="diffsizecell">
                                                                                {data.SchemeName}
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </Item>
                                                            </Grid>
                                                            {groupedConfig[categoryName]
                                                                .filter((column) => column.dispatcherName.toLowerCase() !== "schemename")
                                                                .slice(0, 5)
                                                                .map((column, idx) => (
                                                                    <Grid
                                                                        key={idx}
                                                                        minHeight={10}
                                                                        size={
                                                                            groupedConfig[categoryName].length === 4
                                                                                ? { xs: 4, sm: 4, md: 4, lg: 2 }
                                                                                : groupedConfig[categoryName].length === 5
                                                                                    ? { xs: 4, sm: 4, md: 4, lg: 1.5 }
                                                                                    : { xs: 4, sm: 4, md: 4, lg: 1.15 }
                                                                        }
                                                                    >
                                                                        <Item>
                                                                            <div className="newth1 rss">{data[column.dispatcherName] || "--"}</div>
                                                                        </Item>
                                                                    </Grid>
                                                                ))}
                                                        </Grid>
                                                    ))}

                                                </Box>
                                            </TabPane>
                                        );
                                    })}

                                </Tabs>
                            </div>
                        </div>
                    </div>

                </Item>
            </Grid>
        </>

    )
}

export default PeerComparison