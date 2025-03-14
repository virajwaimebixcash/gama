import { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import MyButton from "../../Common/FormComponent/MyButton";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

export const ClientLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleMobileLoginClick = () => {
    navigate("/loginmobile");
  };

  const handleUserIDLoginClick = () => {
    navigate("/loginuser");
  };

  return (
    <div>
      <Grid size={{ xs: 12, md: 12 }}>
        <div className="center">
          <h3>{t("clientLogin")}</h3>
          <p>{t("firstStep")}</p>
        </div>
        <Box sx={{ mt: 3 }}>
          <MyButton
            label={t("loginMobileNo")}
            onClick={handleMobileLoginClick}
          />
          <MyButton
            label={t("loginUserId")}
            onClick={handleUserIDLoginClick}
          ></MyButton>
          <Grid container>
            <Grid size={{ xs: 12, md: 5, lg: 5 }}>
              <Button href="#" variant="text" size="small" className="textnorm">
                {t("forgetPassword")}
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 7, lg: 7 }}>
              <Button href="#" variant="text" size="small" className="textnorm">
                {t("dontHaveAccount")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export default ClientLogin;
