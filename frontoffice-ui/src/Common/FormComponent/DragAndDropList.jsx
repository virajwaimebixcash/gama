import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import redno from "../../images/redno.png";
import greenyes from "../../images/greenyes.png";
import { Height } from "@mui/icons-material";
import api from "../../APIs/interceptor";
import dayjs from "dayjs";
import { formatWithDecimals } from '../../utils/commonFunction';
import DeleteIcon from "@mui/icons-material/Delete";
const ItemTypes = {
    CARD: "card",
};

// Draggable Item Component
const DraggableItem = ({ item, index, moveItem, removeItem, indexValue }) => {
    const [, ref] = useDrag({
        type: ItemTypes.CARD,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        // hover: (draggedItem) => {
        //     if (draggedItem.index !== index) {
        //         // moveItem(draggedItem.index, index);
        //         // draggedItem.fromIndex = draggedItem.index;
        //         // draggedItem.index = index;
        //     }
        // },
        drop: ({ index }) => {

            moveItem(index, indexValue);
        }
    });

    return (
        <Box
            ref={(node) => ref(drop(node))}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 1,
                background: "white",
            }}
        >
            <div className="draghght">{item.content}
                <IconButton size="small" onClick={() => removeItem(item.items)} className="closewatch">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>
        </Box>
    );
};

// Main Component
const DragAndDropList = ({ WatchListFieldData, tabListData = [], CurrentTab, setTabList, getWatchListTabsSchemeList }) => {
    const [items, setItems] = useState([{}]);
    const [itemId, setItemId] = useState(1);

    useEffect(() => {
        const filteredData = WatchListFieldData?.filter((field) => field.isHide === "N");

        setItems([...tabListData.map((items) => ({
            id: items.watchlistItemId.toString(),
            items,
            content:
                <div>
                    <div className='bosbott' >
                        <div className='paddsfortopsforwatch paddsfortops'>{items.SchemeName}</div>
                        <div className='paddsfortopsforwatchrig paddsfortops fons12px'><span className='fullgra'>{filteredData?.find((items) => items.dispatcherName === 'MktPrice')?.displayName || 'MktPrice'}</span><span>{formatWithDecimals(items.latestnav)}</span></div>

                        <table className='fullw'>
                            <tr>
                                <td className='gapspaddingspace texleft' colSpan={2}>
                                    <div className='fons12px'>{filteredData?.find((items) => items.dispatcherName === 'TrackingSince')?.displayName || 'TrackingSince'}<span className='fons12pxblc'>{dayjs(new Date(items.createdOn)).format('DD-MM-YYYY')}</span></div>
                                </td>
                                {/* <td className='gapspaddingspace texleft' colSpan={2}>
                                    <div className='fons12px'>{filteredData?.find((items) => items.dispatcherName === "TrackingPer")?.displayName || ""}<span className='fons12pxblc'>{items.trackingPercentage}</span></div>
                                </td> */}
                            </tr>
                            <tr >
                                <td colSpan="4" className='gapspaddingspace texleft'>
                                    {/* <div className='oneThirdSize1'>
                                        <span>{filteredData?.find((items) => items.dispatcherName === "Absolute Returns %")?.displayName || ""}</span>
                                        <span className='redspans'>-{items.down}%</span><span> <span> <img src={redno} /></span></span>
                                    </div> */}
                                    <div className='oneThirdSize1'>
                                        <span>{filteredData?.find((items) => items.dispatcherName === "Returns3Month")?.displayName || ""}</span>
                                        <span className={items.trackingPercentage > 0 ? 'greenspans' : "redspans"}>{items.Returns3Month}%</span><span> <span> <img src={items.trackingPercentage > 0 ? greenyes : redno} /></span></span>
                                    </div>
                                    <div className='oneThirdSize1'>
                                        <span>{filteredData?.find((items) => items.dispatcherName === "Returns6Month")?.displayName || ""}</span>
                                        <span className={items.trackingPercentage > 0 ? 'greenspans' : "redspans"}>{items.Returns6Month}%</span><span> <span> <img src={items.trackingPercentage > 0 ? greenyes : redno} /></span></span>
                                    </div>
                                    <div className='oneThirdSize1'>
                                        <span>{filteredData?.find((items) => items.dispatcherName === "Returns1Year")?.displayName || ""}</span>
                                        <span className={items.trackingPercentage > 0 ? 'greenspans' : "redspans"}>{items.Returns1Year}%</span><span> <span> <img src={items.trackingPercentage > 0 ? greenyes : redno} /></span></span>
                                    </div>
                                    {/* <div className='oneThirdSize1'>
                                        <span>{filteredData?.find((items) => items.dispatcherName === "TWRR")?.displayName || ""}</span>
                                        <span className='greenspans'>15 %</span><span> <span> <img src={greenyes} /></span></span>
                                    </div> */}
                                </td>

                            </tr>
                        </table>
                    </div>
                </div>

        }))]);
        setItemId((prev) => prev + 1);
    }, [WatchListFieldData, tabListData, CurrentTab]);

    const moveItem = (fromIndex, toIndex) => {
        const newRows = Array.from(tabListData);
        const [movedRow] = newRows.splice(fromIndex, 1);
        newRows.splice(toIndex, 0, movedRow);
        setTabList(newRows);
        api.post('/dashboard/updateDashWatchListTabDataDetails', newRows.map((items, index) => {

            return {
                "watchlistItemId": items.watchlistItemId,
                "itemSequence": index
            }
        }
        )
        ).then((response) => {
            getWatchListTabsSchemeList()
        }).catch((error) => {
            console.log(error, "error");
        });
    };

    const removeItem = (items) => {
        api.post('/dashboard/removeDashWatchListTabDataDetails', [
            {
                "watchlistItemId": items.watchlistItemId,
                "itemSequence": items.itemSequence
            }
        ]).then((response) => {
            getWatchListTabsSchemeList()
        }).catch((error) => {
            console.log(error, "error");
        });
        // setItems(items.filter((item) => item.id !== id));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Box sx={{ borderRadius: 2, margin: "0 auto", }}
            >
                {items.map((item, index) => (
                    <DraggableItem
                        key={item.id}
                        item={item}
                        index={index}
                        indexValue={index}
                        moveItem={moveItem}
                        removeItem={removeItem}
                    >
                    </DraggableItem>
                ))}
            </Box>
        </DndProvider>
    );
};

export default DragAndDropList;

//     [
//     {
//         id: "1", content: <div>
//             <div className='bosbott' >
//                 <div className='paddsfortopsforwatch paddsfortops'>HDFC Fund </div>
//                 <div className='paddsfortopsforwatchrig paddsfortops fons12px'><span className='fullgra'>NAV</span><span>1,614.10</span></div>

//                 <table className='fullw'>
//                     <tr>
//                         <td className='gapspaddingspace texleft' colSpan={2}>
//                             <div className='fons12px'>Tracking Since <span className='fons12pxblc'>19-Sep-2023</span></div>
//                         </td>

//                         <td className='gapspaddingspace texleft' colSpan={2}>
//                             <div className='fons12px'>Tracking %<span className='fons12pxblc'>19-Sep-2023</span></div>
//                         </td>

//                     </tr>
//                     <tr >
//                         <td colspan="4" className='gapspaddingspace texleft'>
//                             <div className='oneThirdSize1'>
//                                 <span>3M Return</span>
//                                 <span className='redspans'>-12 %</span><span> <span> <img src={redno} /></span></span>
//                             </div>
//                             <div className='oneThirdSize1'>
//                                 <span>6M Return</span>
//                                 <span className='greenspans'>15 %</span><span> <span> <img src={greenyes} /></span></span>
//                             </div>
//                             <div className='oneThirdSize1'>
//                                 <span>TY Return</span>
//                                 <span className='greenspans'>15 %</span><span> <span> <img src={greenyes} /></span></span>
//                             </div>
//                         </td>

//                     </tr>
//                 </table>
//             </div>
//         </div>
//     }

// ]