import { lazy, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorPage from "./Common/CustomComponents/ErrorPage";
import ProtectedRoutes from "./Common/CustomComponents/ProtectedRoutes";
import Spinner from "./Common/CustomComponents/Spinner";
import userDetails from "./APIs/userDetails";
import AuthRoutes from "./Common/CustomComponents/AuthRoute";

import InvestmentCart from "./Pages/Cart/InvestmentCart"
import SecurityView from './Pages/Security/SecurityView';
import QuickConfigForm from "./Configurators/QuickConfigurator";
import InvestNow from "./Pages/InvestNow";
import OrderList from "./Pages/OrderList";
//---------------------LANDING PAGE IMPORTS------------
const Layout = lazy(() => import("./layout/Layout"));

// -------------------LOGIN IMPORTS------------
const LandingPage = lazy(() => import("./Pages/Login/LandingPage"));
const LoginPage = lazy(() => import("./Pages/Login/LoginPage"));
const LoginMobile = lazy(() => import("./Pages/Login/LoginMobile"));
const ClientLogin = lazy(() => import("./Pages/Login/ClientLogin"));
const Otp = lazy(() => import("./Pages/Login/OTP"));
const LogoutPage = lazy(() => import("./Pages/Login/Logout"));

// --------------------DASHBOARD IMPORTS-------------
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"))

// ---------------------CONFIGURATOR IMPORTS----------------
const Configurator = lazy(() => import("./Configurators/OrderConfigurator/Configurator"))
const UdfConfigurator = lazy(() => import("./Configurators/UdfConfigurator/UdfConfigurator"))
const AllOrderConfigurator = lazy(() => import("./Configurators/OrderConfigurator/AllOrderConfigurator"))
const PortfolioConfigForm = lazy(() => import("./Configurators/PortfolioConfigurator/PortfolioConfigForm"))
const AllUdfConfigurator = lazy(() => import("./Configurators/UdfConfigurator/AllUdfConfigurator"))

// --------------PortfolioView IMPORTS----------------
const PortfolioView = lazy(() => import("./Common/PortfolioViewComponents/PortfolioView"))

// --------------RiskProfile IMPORTS----------------
const RiskProfileOne = lazy(() => import("./Pages/RiskProfile/RiskProfileOne"));
const RiskProfileTwo = lazy(() => import("./Pages/RiskProfile/RiskProfileTwo"));
const RiskProfileThree = lazy(() => import("./Pages/RiskProfile/RiskProfileThree"));

// -------------Fund Explorer--------------------
const FundExplorer = lazy(() => import("./Pages/FundExplorer/FundsExplorer"))
const FundExplorerSubCategory = lazy(() => import("./Pages/FundExplorer/FundsExplorerSubCategory"))
const FundExplorerThree = lazy(() => import("./Pages/FundExplorer/FundsExplorerThree"))

// ------------Model Portfolio--------------------
const ModelPortfolio = lazy(() => import("./Pages/ModelPortfolio/ModelPortfolio"))
const ParentModelPortfolio = lazy(() => import("./Pages/ModelPortfolio/ParentModelPortfolio"))
// const ChildModelPortfolio = lazy(() => import("./Pages/ModelPortfolio/modelportfolio2"))
const ChildModelPortfolio = lazy(() => import("./Pages/ModelPortfolio/ChildModelPortfolio"))

// -------------Fund Compare--------------------
const FundCompare = lazy(() => import("./Pages/FundCompareSection/FundCompare"))
const FundCompareOne = lazy(() => import("./Pages/FundCompareSection/FundCompareOne"))


// -------------Portfolio Rebalancing--------------------
const RebalancingSummary = lazy(() => import("./Pages/PortfolioRebalance/PortfolioRebalancingSummary"))
const PortfolioRebalancing = lazy(() => import("./Pages/PortfolioRebalance/PortfolioRebalancingMain"))
const RebalancingDetail = lazy(() => import("./Pages/PortfolioRebalance/RebalancingDetail"))
const RebalancingPlaceOrder = lazy(() => import("./Pages/PortfolioRebalance/RebalancingPlaceOrder"))

// -------------Goal planning--------------------
const GoalPlanning = lazy(() => import("./Pages/GoalPlanning/GoalPlanningMain"))
const GoalPlanningtwo = lazy(() => import("./Pages/GoalPlanning/GoalPlanningMain2"))
const GoalPlanningthree = lazy(() => import("./Pages/GoalPlanning/GoalPlanningMain3"))
const GoalPlanningfour = lazy(() => import("./Pages/GoalPlanning/GoalPlanningMain4"))
const GoalReview = lazy(() => import("./Pages/GoalPlanning/GoalReview"))

function App() {
  const location = useLocation()
  useEffect(() => {
    (async () => {
      const token = await localStorage.getItem('token')
      userDetails.setToken(token)
    })()
  }, [])

  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary key={location.pathname} fallback={<ErrorPage />}>
          <Routes>
            {/* --------------NO PROTECTED ROUTES NEEDED----------------------------- */}
            <Route element={<AuthRoutes />}>
              <Route path="/" element={<LandingPage />} >
                <Route path='/' element={<ClientLogin />} />
                <Route path="/loginuser" element={<LoginPage />} />
                <Route path="/loginmobile" element={<LoginMobile />} />
              </Route>
              <Route path="/otp" element={<Otp />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            {/* ------------------------ROUTES NEED LOGIN----------------------------- */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Layout />} >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/order-configurator" element={<Configurator />} />
                <Route path="/edit-order-configurator" element={<Configurator />} />
                <Route path="/order-configurations" element={<AllOrderConfigurator />} />
                <Route path="/udf-configurator" element={<UdfConfigurator />} />
                <Route path="/edit-udf-configurator" element={<UdfConfigurator />} />
                <Route path="/udf-configurations" element={<AllUdfConfigurator />} />
                <Route path="/portfolioConfig" element={<PortfolioConfigForm />} />
                <Route path="/portfolio-view" element={<PortfolioView />} />
                <Route path="/quick-configurations" element={<QuickConfigForm />} />
                <Route path='/securityview' element={<SecurityView />} />
                <Route path='/investmentcarts' element={<InvestmentCart />} />
                <Route path='/investnow' element={<InvestNow />} />
                <Route path='/order-view' element={<OrderList />} />
                {/* -----------risk profile routes-------------------- */}
                <Route path='/riskprofileone' element={<RiskProfileOne />} />
                <Route path='/riskprofiletwo' element={<RiskProfileTwo />} />
                <Route path='/riskprofilethree' element={<RiskProfileThree />} />
                {/* ----------------fund Explorer route------------------------ */}
                <Route path='/fundExplorer' element={<FundExplorer />} />
                <Route path='/subcategories/:category' element={<FundExplorerSubCategory />} />
                <Route path='/fundExplorerThree' element={<FundExplorerThree />} />

                {/* ----------------------------ModelPortfolio---------------------- */}
                <Route path='/modelPortfolio' element={<ModelPortfolio />} />
                <Route path='/parent-model-portfolio' element={<ParentModelPortfolio />} />
                <Route path='/child-model-portfolio' element={<ChildModelPortfolio />} />

                {/* ----------------------------Fund Compare---------------------- */}
                <Route path='/fundCompare' element={<FundCompare />} />
                <Route path='/fundComparison' element={<FundCompareOne />} />
              
                {/* ----------------------------Fund Compare---------------------- */}
                <Route path='/rebalancingSummary' element={<RebalancingSummary />} />
                <Route path='/portfoliorebalancing' element={<PortfolioRebalancing />} />
                <Route path='/rebalancingdetail' element={<RebalancingDetail />} />
                <Route path='/rebalancingplaceorder' element={<RebalancingPlaceOrder />} />
               
               {/* ----------------------------Goal Planning---------------------- */}
                <Route path='/goalplanning' element={<GoalPlanning />} />
                <Route path='/goalplanningtwo' element={<GoalPlanningtwo />} />
                <Route path='/goalplanningthree' element={<GoalPlanningthree />} />
                <Route path='/goalplanningfour' element={<GoalPlanningfour />} />
                <Route path='/goalreview' element={<GoalReview />} />



                
                {/* Logout page route */}
                <Route path="/logout" element={<LogoutPage />} />
              </Route>
            </Route>
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

export default App;

