import { TextField, Checkbox, TableContainer, Paper, Table, TableRow, TableCell, TableHead } from "@mui/material";
import { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

const L1Allocation = ({ tab }) => {
    const { control, watch, setValue } = useFormContext();
    const isL1Checked = watch(`${tab.productClass}.l1AllocationChecked`, false);
    const tabData = watch(tab.productClass, {});

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;        
        setValue(`${tab.productClass}.l1AllocationChecked`, checked);
    };    

    useEffect(() => {
        if (isL1Checked) {
            setValue(tab.productClass, {
                ...tabData,
                l1Allocation: {
                    modelPortfolioProductClassId: tab?.modelPortfolioProductClassId,
                    allocationLevel: 1,
                    weightageType: 2,
                    allocationPer: tabData?.l1Allocation?.allocationPer || "",
                    tolerancePer: tabData?.l1Allocation?.tolerancePer || "",
                }
            });
        } else {
            setValue(`${tab.productClass}.l1Allocation`, {});
            // setValue(`${tab.productClass}.l2AllocationChecked`, false);
            // setValue(`${tab.productClass}.l2Allocation`, {});
        }
    }, [isL1Checked]);

    return (
        <div style={{ margin: "auto" }} className="forallspacecss">
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table className="modeltabelcss">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={10}>
                                <Controller
                                    // name="l1AllocationChecked"
                                    name={`${tab.productClass}.l1AllocationChecked`}
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox {...field} checked={field.value} onChange={handleCheckboxChange} />
                                    )}
                                />
                                <span>L1 Allocation</span>
                            </TableCell>
                        </TableRow>
                        <TableRow className="tabheadersgry">
                            <TableCell className="paddingforheaders" sx={{ width: "20%" }}>Product Class</TableCell>
                            <TableCell className="paddingforheaders" sx={{ width: "40%" }}>{tab?.productClass}</TableCell>
                            <TableCell className="paddingforheaders" sx={{ width: "20%" }}>
                                L1 Allocation
                                <Controller
                                    name={`${tab.productClass}.l1Allocation.allocationPer`}
                                    control={control}
                                    // defaultValue="60%"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="changespans"
                                            disabled={!isL1Checked}
                                        />
                                    )}
                                />
                            </TableCell>
                            <TableCell className="paddingforheaders" sx={{ width: "20%" }}>
                                Tolerance (+ / -)
                                <Controller
                                    name={`${tab.productClass}.l1Allocation.tolerancePer`}
                                    control={control}
                                    // defaultValue="8%"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="changespans"
                                            disabled={!isL1Checked}
                                        />
                                    )}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </div>
    );
};

export default L1Allocation;
