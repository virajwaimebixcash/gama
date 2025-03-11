import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import closewhite from '../../images/closewhite.png';
import SwitchforModel from "./SwitchforModel";
import { useFormContext, Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const initializeAllocations = (fundData) => {
  let initialAllocations = {};
  fundData?.forEach((fund) =>
    fund?.attributes?.forEach((attr) =>
      attr?.securities?.forEach((sec) => (initialAllocations[sec] = ""))
    )
  );
  return initialAllocations;
};

const L3Allocation = ({ tab, cashAllocation, setCashAllocation }) => {
  const { watch, control, setValue } = useFormContext();
  const formData = watch(); // Watching all form values dynamically
  const [equalWeight, setEqualWeight] = useState(false);
  // const [cashAllocation, setCashAllocation] = useState(100);
  const [error, setError] = useState("")
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit");

  const l1Allocation = formData?.Fund?.l1AllocationChecked ? formData?.Fund?.l1Allocation : null;
  const l2Allocation = formData?.Fund?.l2AllocationChecked ? formData?.Fund?.l2Allocation : null;
  const l2AllocationChecked = formData?.Fund?.l2AllocationChecked;
  const l1AllocationChecked = formData?.Fund?.l1AllocationChecked;
  const selectedSecurities = formData?.selectedSecurities || [];

  // const fundData = tab
  //   ?.filter((fund) => fund.productClass !== "Cash")
  //   .map((fund) => {
  //     const fundName = fund.productClass;

  //     if (!l2Allocation) {
  //       // If l2Allocation is not available, bind selectedSecurities directly to the fund
  //       return {
  //         fundName,
  //         ...l1Allocation,
  //         securities: selectedSecurities.map((security) => security),
  //       };
  //     }

  //     return {
  //       fundName,
  //       ...l1Allocation,
  //       attributes: l2Allocation?.rows?.map((row, index) => {
  //         const firstValue = row.firstValue;
  //         const secondValue = row.secondValue;
  //         const percentage = row.l2Allocation || 0;

  //         return {
  //           name: l2Allocation.displayName,
  //           description: `From ${firstValue} Cr to ${secondValue} Cr (${percentage}%)`,
  //           allocationPer: percentage,
  //           id: index,
  //           // securities: selectedSecurities,
  //           securities: isEdit ? selectedSecurities : selectedSecurities
  //             .filter(
  //               (security) =>
  //                 Number(security?.fundInfo?.[l2Allocation.dispatcherName]) <= Number(firstValue) &&
  //                 Number(security?.fundInfo?.[l2Allocation.dispatcherName]) >= Number(secondValue)
  //             )
  //             .map((security) => security),
  //         };
  //       }),
  //     };
  //   });

  const fundData = useMemo(() => {
    return tab
      ?.filter((fund) => fund.productClass !== "Cash")
      .map((fund) => {
        const fundName = fund.productClass;
  
        if (!l2Allocation) {
          return {
            fundName,
            ...l1Allocation,
            securities: selectedSecurities.map((security) => security),
          };
        }
  
        return {
          fundName,
          ...l1Allocation,
          attributes: l2Allocation?.rows?.map((row, index) => {
            const firstValue = row.firstValue;
            const secondValue = row.secondValue;
            const percentage = row.l2Allocation || 0;
  
            return {
              name: l2Allocation.displayName,
              description: `From ${firstValue} Cr to ${secondValue} Cr (${percentage}%)`,
              allocationPer: percentage,
              id: index,
              securities: isEdit
                ? selectedSecurities
                : selectedSecurities
                    .filter(
                      (security) =>
                        Number(security?.fundInfo?.[l2Allocation.dispatcherName]) <= Number(firstValue) &&
                        Number(security?.fundInfo?.[l2Allocation.dispatcherName]) >= Number(secondValue)
                    )
                    .map((security) => security),
            };
          }),
        };
      });
  }, [formData]); // Dependency on formData
  

  const [allocations, setAllocations] = useState(() => initializeAllocations(fundData));

  const handleModeChange = (isEqualWeight) => {
    setEqualWeight(isEqualWeight);

    if (isEqualWeight) {
      distributeEqualWeight();
    } else {
      // Reset allocations to 0
      let clearedAllocations = {};

      formData.fundData.forEach((fund, fundIndex) => {
        fund?.securities?.forEach((sec, secIndex) => {
          clearedAllocations[sec.SchemeCode] = 0;
          setValue(`fundData.${fundIndex}.securities.${secIndex}.L3Allocation`, "");
        });

        fund?.attributes?.forEach((attr, attrIndex) => {
          attr.securities.forEach((sec, secIndex) => {
            clearedAllocations[sec.SchemeCode] = 0;
            setValue(`fundData.${fundIndex}.attributes.${attrIndex}.securities.${secIndex}.L3Allocation`, "");
          });
        });
      });

      setAllocations(clearedAllocations);
      setCashAllocation(100); // Reset cash to 100%
    }
  };

  const distributeEqualWeight = () => {
    const formData = watch(); // Get form state
    let newAllocations = {};

    if (!l1AllocationChecked && !l2AllocationChecked) {
      // Condition 1: L1 and L2 both unchecked, distribute equally among all securities
      formData.fundData.forEach((fund, fundIndex) => {
        if (fund.securities.length > 0) {
          let equalAlloc = 100 / fund.securities.length;
          let roundedAlloc = Math.round(equalAlloc * 100) / 100;

          fund.securities.forEach((sec, secIndex) => {
            newAllocations[sec.SchemeCode] = roundedAlloc;
            setValue(`fundData.${fundIndex}.securities.${secIndex}.L3Allocation`, roundedAlloc);
          });
        }
      });
    } else if (l1AllocationChecked && !l2AllocationChecked) {
      // Condition 2: L1 checked, distribute equally among securities of that L1 allocation
      formData.fundData.forEach((fund, fundIndex) => {
        if (fund.allocationPer && fund.securities.length > 0) {
          let equalAlloc = fund.allocationPer / fund.securities.length;
          let roundedAlloc = Math.round(equalAlloc * 100) / 100;

          fund.securities.forEach((sec, secIndex) => {
            newAllocations[sec.SchemeCode] = roundedAlloc;
            setValue(`fundData.${fundIndex}.securities.${secIndex}.L3Allocation`, roundedAlloc);
          });
        }
      });
    } else if (l2AllocationChecked) {
      // Condition 3: L2 checked, distribute equally among securities within each L2 allocation
      formData.fundData.forEach((fund, fundIndex) => {
        fund.attributes?.forEach((attr, attrIndex) => {
          if (attr.allocationPer && attr.securities.length > 0) {
            let equalAlloc = attr.allocationPer / attr.securities.length;
            let roundedAlloc = Math.round(equalAlloc * 100) / 100;

            attr.securities.forEach((sec, secIndex) => {
              newAllocations[sec.SchemeCode] = roundedAlloc;
              setValue(`fundData.${fundIndex}.attributes.${attrIndex}.securities.${secIndex}.L3Allocation`, roundedAlloc);
            });
          }
        });
      });
    }

    let totalAllocated = Object.values(newAllocations).reduce((sum, val) => sum + val, 0);
    let remainingCash = Math.max(100 - totalAllocated, 0);

    setCashAllocation(remainingCash); // Reset cash allocation
    setAllocations(newAllocations);
  };

  const updateCashAllocation = () => {
    // Calculate total allocated percentage from all securities
    let totalAllocated = 0;

    formData?.fundData?.forEach((fund) => {
      if (!l2AllocationChecked) {
        fund?.securities?.forEach((sec) => {
          totalAllocated += Number(sec.L3Allocation) || 0; // Ensure it's a number
        });
      }
      else {
        fund?.attributes?.forEach((attr) => {
          attr?.securities?.forEach((sec) => {
            totalAllocated += Number(sec.L3Allocation) || 0;
          });
        });
      }

    });

    // Calculate remaining cash allocation
    let remainingCash = Math.max(0, 100 - totalAllocated);
    setCashAllocation(remainingCash);
  };

  const handleDeleteSecurity = (fundIndex, attrIndex, secIndex) => {
    let updatedData = { ...watch() };

    if (l2AllocationChecked) {
      if (!updatedData.fundData[fundIndex]?.attributes[attrIndex]?.securities) return;
      updatedData.fundData[fundIndex].attributes[attrIndex].securities =
        updatedData.fundData[fundIndex].attributes[attrIndex].securities.filter((_, i) => i !== secIndex);
    } else {
      if (!updatedData.fundData[fundIndex]?.securities) return;
      updatedData.fundData[fundIndex].securities =
        updatedData.fundData[fundIndex].securities.filter((_, i) => i !== secIndex);
    }

    // **Also remove from selectedSecurities**
    updatedData.selectedSecurities = updatedData.selectedSecurities.filter((_, i) => i !== secIndex);

    setValue("fundData", updatedData.fundData);
    setValue("selectedSecurities", updatedData.selectedSecurities); // Update selected securities
    updateCashAllocation();
    if (equalWeight) distributeEqualWeight();
  };

  useEffect(() => {
    updateCashAllocation();
  }, [watch()]);

  return (
    <TableContainer component={Paper}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell
              className="tbrowhead"
              colSpan={l2Allocation?.rows?.length > 0 ? "3" : "2"}
            >
              <span>L3 Allocation</span>
            </TableCell>
            <TableCell className="tgswitch tbrowhead">
              <SwitchforModel onModeChange={handleModeChange} value={equalWeight ? 1 : 2} />
            </TableCell>
          </TableRow>
          <TableRow className="displaymodelfolio lightgrcol">
            <TableCell sx={{ width: "20%" }}>Product Class</TableCell>
            {l2Allocation?.rows?.length > 0 && (
              <TableCell sx={{ width: "20%" }}>Attribute</TableCell>
            )}
            <TableCell sx={{ width: l2Allocation?.rows?.length > 0 ? "25%" : "45%" }}>
              Security
            </TableCell>
            <TableCell sx={{ width: "15%" }} className="texcenterimp">
              L3 Allocation
            </TableCell>
            <TableCell sx={{ width: "15%" }} className="texcenterimp">
              Tolerance
            </TableCell>
            <TableCell sx={{ width: "5%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="displaymodelfolio">
          {fundData?.map((fund, fundIndex) => (
            <React.Fragment key={fundIndex}>
              {(fund?.attributes || [{ securities: fund?.securities }])?.map((attribute, attrIndex) => (
                attribute?.securities?.map((security, secIndex) => (
                  <TableRow key={`${fundIndex}-${attrIndex}-${secIndex}`}>
                    {attrIndex === 0 && secIndex === 0 && (
                      <TableCell
                        rowSpan={fund.attributes ? fund.attributes.reduce((sum, attr) => sum + attr.securities.length, 0) : fund.securities.length}
                        style={{ backgroundColor: "#E6DDFF" }}
                        className="exttopFund"
                      >
                        <span className="bigfontblc">{fund.allocationPer === undefined ? `${fund.fundName}` : `${fund.fundName} (${fund.allocationPer}%)`}</span>
                      </TableCell>
                    )}
                    {l2Allocation && secIndex === 0 && (
                      <TableCell rowSpan={attribute.securities.length}>
                        <span className="orangewhitebluemain orangecss">{attribute.name}</span>
                        <div className="spaceheight"></div>
                        {attribute.description}
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="spacebetnames">{security.SchemeName}</div>
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={fund.attributes ? `fundData.${fundIndex}.attributes.${attrIndex}.securities.${secIndex}.L3Allocation` : `fundData.${fundIndex}.securities.${secIndex}.L3Allocation`}
                        control={control}
                        defaultValue={security.L3Allocation || ""}
                        render={({ field }) => (
                          <TextField {...field} variant="outlined" size="small"
                            onChange={(e) => {
                              field.onChange(e); // Preserve form control behavior
                              // handleAllocation(fundIndex, attrIndex, secIndex, e.target.value); // Call your function
                            }}
                            fullWidth />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        name={fund.attributes ? `fundData.${fundIndex}.attributes.${attrIndex}.securities.${secIndex}.Tolerance` : `fundData.${fundIndex}.securities.${secIndex}.Tolerance`}
                        control={control}
                        defaultValue={security.Tolerance || ""}
                        render={({ field }) => (
                          <TextField {...field} variant="outlined" size="small" fullWidth />
                        )}
                      />
                    </TableCell>
                    <TableCell className="texrightimp">
                      <img
                        src={closewhite}
                        className="closiconright"
                        onClick={() => handleDeleteSecurity(fundIndex, attrIndex, secIndex)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </React.Fragment>
          ))}
          {/* Cash Allocation Row */}
          <TableRow>
            <TableCell colSpan={l2Allocation ? 3 : 2}>
              <span className="bigfontblc">Cash</span>
            </TableCell>
            <TableCell>
              <TextField
                className="intextbox disgray"
                disabled
                value={cashAllocation}
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell>
              <TextField className="intextbox" defaultValue="" variant="outlined" size="small" />
            </TableCell>
          </TableRow>
          {/* Total Allocation Row */}
          <TableRow style={{ backgroundColor: "#F4EBFF" }}>
            <TableCell className="noborderstotal" colSpan={l2Allocation ? 3 : 2}></TableCell>
            <TableCell className="noborderstotal">
              <div className="Totalblctxt">100%</div>
            </TableCell>
            <TableCell className="noborderstotal"></TableCell>
            <TableCell className="noborderstotal"></TableCell>
          </TableRow>
        </TableBody>
        {/* <button onClick={handleSave}>save</button> */}
      </Table>
    </TableContainer>
  );
};

export default L3Allocation;