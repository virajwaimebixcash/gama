import { combineReducers } from "redux";
import { ValidateLoginReducer } from "./ValidateLoginReducer";
import { GetDropdownDataReducer } from "./GetDropdownDataReducer";
import { GetConfiguratorDetailsReducer } from "./GetConfiguratorDetailsReducer";
import { SaveConfiguratorDetailsReducer } from "./SaveConfiguratorDetailsReducer";
import { GetPortFolioViewTypesReducer } from "./GetPortFolioViewTypesReducer";
import { GetPortFolioViewTypeFieldValueReducer } from "./GetPortFolioViewTypeFieldValueReducer";
import { GetAllUDFConfiguratorDetailsReducer } from "./GetAllUDFConfiguratorDetailsReducer";
import { GetUDFProductClassDetailsReducer } from "./GetUDFProductClassDetailsReducer";
import { GetUpdateUDFConfiguratorDetailsReducer } from "./GetUpdateUDFConfiguratorDetailsReducer";
import { GetOrderViewConfiguratorDetailsReducer } from "./GetOrderViewConfiguratorDetailsReducer";
import { GetQuickOrderConfiguratorDetailsReducer } from "./GetQuickOrderConfiguratorDetailsReducer";
import { GetAllWidgetConfiguratorDetailsReducer } from "./GetAllwidgetConfigrationDetailsReducer";
import { GetSchemeListReducer } from "./GetSchemeListReducer";
import { AddToCartReducer } from "./AddToCartReducer";
import { GetOrderViewUdfConfiguratorDetailsReducer } from "./GetOrderViewUdfConfiguratorDetailsReducer";
import { GetCustomizeCartOrderDetails } from "./GetCustomizeCartOrderDetails";
import { InvestNowActionReducer } from "./InvestNowActionReducer";
import { PlaceorderReducer } from "./PlaceOrderReducer";
import { InvestNowLumpSumActionReducer } from "./InvestNowLumpSumActionReducer";
import { GetHoldingsReportConfiguredDetailsReducer } from "./GetHoldingsReportConfiguredDetailsReducer";
import { GetHoldingDetailsReducer } from "./GetHoldingDetailsReducer";
import { GetCartList } from "./GetCartList";
import { UserDataStoreReducer } from "./UserDataSoreReducer";
import { GetNAVDetailsReducer } from "./GetNAVDetailsReducer";
import {GetSchemeListForTargetSchemeReducer} from "./GetSchemeListForTargetSchemeReducer";
import {GetAllDashboardWidgetsConfigurationReducer} from "./GetAllDashboardWidgetsConfigurationReducer";
import {AddWatchListTabReducer} from "./AddWatchListTabReducer";
import {GetWatchListTabDataDetailsReducer} from "./GetWatchListTabDataDetailsReducer";
import {GetRiskProfileConfigurationDetailsReducer} from "./GetRiskProfileConfigurationDetailsReducer";
import { GetFundUniverseDataReducer } from "./GetFundUniverseDataReducer";
import { GetParentModelPortfolioDetailsReducer } from "./GetParentModelPortfolioDetailsReducer";
import {CreateChildModelDataReducer} from "./CreateChildModelDataReducer" ;
import { getFundCompareConfigReducer } from "./GetFundCompareConfig";
import { getFundCompareSchemeReducer } from "./GetFundCompareScheme";
import { GetChildModelPortfolioDetailsReducer } from "./GetChildModelPortfolioDetailsReducer";
import { CreateRebalanceDetailDataReducer } from "./CreateRebalanceDetailDataReducer";

export const rootReducer = combineReducers({
    validateLogin: ValidateLoginReducer,
    getDropdownData: GetDropdownDataReducer,
    getConfiguratorDetails: GetConfiguratorDetailsReducer,
    saveConfiguratorDetails: SaveConfiguratorDetailsReducer,
    getPortFolioViewTypes: GetPortFolioViewTypesReducer,
    getPortFolioViewTypeFieldValue: GetPortFolioViewTypeFieldValueReducer,
    getAllUDFConfiguratorDetails: GetAllUDFConfiguratorDetailsReducer,
    getUDFProductClassDetails: GetUDFProductClassDetailsReducer,
    getUpdateUDFConfiguratorDetails: GetUpdateUDFConfiguratorDetailsReducer,
    getOrderViewConfiguratorDetails: GetOrderViewConfiguratorDetailsReducer,
    getQuickOrderConfiguratorDetails: GetQuickOrderConfiguratorDetailsReducer,
    getAllWidgetConfiguratorDetails: GetAllWidgetConfiguratorDetailsReducer,
    getSchemeList: GetSchemeListReducer,
    getOrderViewUdfConfiguratorDetails: GetOrderViewUdfConfiguratorDetailsReducer,
    addtoCart: AddToCartReducer,
    GetCustomizeCartOrderDetails: GetCustomizeCartOrderDetails,
    investNowAction: InvestNowActionReducer,
    placeOrder: PlaceorderReducer,
    investNowLumpSumAction: InvestNowLumpSumActionReducer,
    getHoldingsReportConfiguredDetails: GetHoldingsReportConfiguredDetailsReducer,
    getHoldingDetails: GetHoldingDetailsReducer,
    getcartList: GetCartList,
    userDataStore: UserDataStoreReducer,
    getNAVDetails: GetNAVDetailsReducer,
    getSchemeListForTargetScheme: GetSchemeListForTargetSchemeReducer,
    getAllDashboardWidgetsConfiguration: GetAllDashboardWidgetsConfigurationReducer,
    addWatchListTab: AddWatchListTabReducer,
    getWatchListTabDataDetails: GetWatchListTabDataDetailsReducer,
    getRiskProfileConfigurationDetails: GetRiskProfileConfigurationDetailsReducer,
    getFundUniverseData: GetFundUniverseDataReducer,
    getParentModelPortfolioDetails: GetParentModelPortfolioDetailsReducer,
    createChildModelData: CreateChildModelDataReducer,
    getFundCompareConfig: getFundCompareConfigReducer,
    getFundCompareScheme: getFundCompareSchemeReducer,
    getChildModelPortfolioDetails: GetChildModelPortfolioDetailsReducer,
    createRebalanceDetailData: CreateRebalanceDetailDataReducer,
});