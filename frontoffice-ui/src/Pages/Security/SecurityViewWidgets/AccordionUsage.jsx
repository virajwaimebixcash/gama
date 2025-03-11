import { Accordion, AccordionSummary } from '@mui/material';

const AccordionUsage = ({ data,clickOnMoreFunds }) => {
    return (
        <div className='sizeofacc'>
            {data.map((fund, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        onClick={clickOnMoreFunds}
                        key={index}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <div  className='fullw '>
                            <div className='fourty '>{fund?.Name || "NA"}</div>
                        </div>
                    </AccordionSummary>
                </Accordion>
            ))}
        </div>
    );
};

export default AccordionUsage;