import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import RiskProfile from "./RiskProfile";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../APIs/interceptor";
import { map } from "lodash";
import { ClassNames } from "@emotion/react";

const questions = [
  {
    id: 1,
    question: "What is your investment goal?",
    answers: ["Wealth preservation", "Growth", "Income generation", "Speculation"],
  },
  {
    id: 2,
    question: "How do you feel about risk?",
    answers: ["Low risk", "Moderate risk", "High risk", "No concern for risk"],
  },
  {
    id: 3,
    question: "What is your investment timeline?",
    answers: ["Less than 1 year", "1-5 years", "5-10 years", "More than 10 years"],
  },
  {
    id: 4,
    question: "What is your investment timeline?",
    answers: ["Less than 1 year", "1-5 years", "5-10 years", "More than 10 years"],
  },
  {
    id: 5,
    question: "What is your investment timeline?",
    answers: ["Less than 1 year", "1-5 years", "5-10 years", "More than 10 years"],
  },
];

const RiskProfileQuestion = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questionsList, setQuestionsList] = useState([{ answerCollection: [] }])
  const [questionSetCode, setquestionSetCode] = useState(0)
  const [showChart, setShowChart] = useState(false);
  const [resultData, setResultData] = useState({})


  useEffect(() => {
    api.post('/riskProfile/getRiskProfileQuestionnaire', {
      "clientCode": import.meta.env.VITE_CLIENT_CODE,

    }).then((res) => {
      setQuestionsList(res.data.riskProfileQuestionCollection)
      setquestionSetCode(res.data.questionSetCode)
    }).catch((err) => { })
  }, [])
  const calculateRiskScore = () => {
    let score = 0;
    Object.values(selectedAnswers).forEach((answer) => {
      if (answer === "Wealth preservation" || answer === "Low risk") score += 10;
      if (answer === "Growth" || answer === "Moderate risk") score += 30;
      if (answer === "Income generation" || answer === "High risk") score += 50;
      if (answer === "Speculation" || answer === "No concern for risk") score += 70;
    });
    return Math.min(score, 100);
  };
  const handleNext = () => {
    if (currentStep < questionsList.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleButtonClick();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAnswerSelect = (event) => {

    try {
      setQuestionsList([...questionsList.map((value, index) => {
        if (index === currentStep) {
          value.answerCollection = value.answerCollection.map((value) => {
            if (value.answerCode === event.target.value) {
              value.selected = event.target.checked
              return value
            } else {
              value.selected = false
              return value
            }

          })

          return value
        } else {
          return value
        }

      })]);

      setSelectedAnswers({
        ...selectedAnswers,
        [currentStep]: event.target.value,
      });
    } catch (e) {
      console.log("error", e)
    }

  };

  const riskScore = calculateRiskScore();

  const chartOptions = {
    chart: {
      type: "gauge",
      height: 250,
    },
    title: {
      text: "Risk Meter",
    },
    pane: {
      startAngle: -150,
      endAngle: 150,
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "Risk Level",
      },
      plotBands: [
        { from: 0, to: 40, color: "#55BF3B" }, // Green
        { from: 40, to: 70, color: "#DDDF0D" }, // Yellow
        { from: 70, to: 100, color: "#DF5353" }, // Red
      ],
    },
    series: [
      {
        name: "Risk",
        data: [riskScore],
        tooltip: {
          valueSuffix: " %",
        },
      },
    ],
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const payload = {

      clientCode: import.meta.env.VITE_CLIENT_CODE,
      riskProfileQuestionnaire: {
        questionSetCode,
        riskProfileQuestionCollection: questionsList
      }

    }
    api.post('/riskProfile/saveRiskProfileQuestionnaire', payload).then((res) => {
    
      navigate("/riskprofilethree",{ state: res.data });

    }).catch((err) => { console.log(err) })
  };
  
  
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 0 }}>


      {!showChart ? (
        <>
          {/* Top Progress Bar */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, fontWeight: 'bold' }}>
            {questionsList.map((_, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  height: 10,
                  borderRadius: 5,
                  mx: index === 0 ? 0 : 0.5,
                  backgroundColor:
                    index <= currentStep ? "#A35CFB " : "grey.300",
                }}
              />
            ))}
          </Box>
          {/* Question */}
          <Typography variant="h5" sx={{ mb: 2 }} >
            {questionsList[currentStep].questionDescription}
          </Typography>
          <RadioGroup 
            value={selectedAnswers[currentStep] || ""}
            onChange={handleAnswerSelect}
            sx={{ mb: 3 , alignItems: "flex-start" }}
          >
            {questionsList[currentStep].answerCollection.map((answer, index) => (
              <FormControlLabel className="riskquestions"
                key={index}
                value={answer.answerCode}
                control={<Radio className="incheckb" checked={answer.selected} />}
                label={answer.answerDescription }
              />
            ))}
          </RadioGroup>

          {/* Navigation Buttons */}
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button className="forradiusborder capitalizebtncss"
              variant="outlined"
              disabled={currentStep === 0}
              onClick={handlePrev}
            >
              Previous
            </Button>
            <Button className="forradiusborder nextbtninrisk"
              variant="contained"
              disabled={!selectedAnswers[currentStep]} // Disable if no answer is selected
              onClick={handleNext}
            >
              {currentStep === questionsList.length - 1 ? "View Result" : "Next"}
            </Button>
          </Stack>
        </>
      ) : (
        <>

          {/* <RiskProfile></RiskProfile>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Your Risk Score: {riskScore}%
          </Typography> */}
        </>
      )}
    </Box>
  );
};

export default RiskProfileQuestion;
