import Actions from "./Actions";
import api from "../../APIs/interceptor";
import userDetails from "../../APIs/userDetails";

export const actionCreators = {

    /**
     * Dispatches actions to validate the user's login credentials and authenticate the user.
     *
     * @param {Object} body - The request body containing the user's login credentials.
     * @param {boolean} [reset=false] - An optional flag to reset the authentication state.
     * @returns {Promise<Object>} The response from the API containing the result of the login operation.
     */
    validateLogin: (body, reset = false, navigate) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.AUTHENTICATION_LOGIN_DATA_RESET });
            } else {
                dispatch({ type: Actions.AUTHENTICATION_LOGIN_DATA_REQUEST });
                try {
                    const res = await api.post(`/authentication/login`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.AUTHENTICATION_LOGIN_DATA_SUCCESS, payload: { ...res.data, mobileNumber: body.mobileNumber } });
                        if (body.loginMode === 'UserName') {
                            localStorage.setItem("token", res.data.token);
                            localStorage.setItem("UserName", res.data.userName);
                            userDetails.setToken(res.data.token)
                            userDetails.setUserDetails(res.data)
                            sessionStorage.setItem("login", "true") //using when user closing the tab
                            const payload = {
                                "userId": 1,
                            }
                            dispatch(actionCreators.GetRiskProfileConfigurationDetails(payload, false, navigate))

                        }

                        return res;

                    } else {
                        dispatch({
                            type: Actions.AUTHENTICATION_LOGIN_DATA_FAILURE,
                            payload: res.data.error_message,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.AUTHENTICATION_LOGIN_DATA_FAILURE, payload: "" });
                    throw err;
                }
            }
        }
    },

    /**
     * Dispatches actions to validate the login OTP (One-Time Password) entered by the user.
     *
     * @param {Object} body - The request body containing the OTP and any other necessary data for the validation process.
     * @returns {Promise<Object>} The response from the API containing the result of the OTP validation operation.
     */
    validateLoginOtp: (body, navigate) => {
        return async (dispatch) => {
            dispatch({ type: Actions.VALIDATE_LOGIN_OTP_DATA_REQUEST })
            try {
                const res = await api.post(`/authentication/validateOtp`, body)
                if (res?.status === 200) {
                    dispatch({ type: Actions.VALIDATE_LOGIN_OTP_DATA_SUCCESS, payload: res.data })
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("UserName", res.data.userName);
                    userDetails.setToken(res.data.token)
                    userDetails.setUserDetails(res.data)
                    sessionStorage.setItem("login", "true")
                    const payload = {
                        "userId": 1,
                    }
                    dispatch(actionCreators.GetRiskProfileConfigurationDetails(payload, false, navigate))
                    return res
                }
                else {
                    dispatch({ type: Actions.VALIDATE_LOGIN_OTP_DATA_FAILURE, payload: res.data.error_message })
                    return res
                }
            }
            catch (err) {
                dispatch({ type: Actions.VALIDATE_LOGIN_OTP_DATA_FAILURE, payload: "" })
                throw err
            }
        }
    },

    /**
     * Dispatches actions to log the user out of the application.
     *
     * @param {Object} body - The request body containing any necessary data for the logout process.
     * @param {boolean} [reset=false] - An optional flag to reset the authentication state.
     * @returns {Promise<Object>} The response from the API containing the result of the logout operation.
     */
    validateLogout: (body) => {
        return async (dispatch) => {

            dispatch({ type: Actions.AUTHENTICATION_LOGOUT_REQUEST });
            try {
                const res = await api.post(`/authentication/logout`, body);
                if (res?.status === 200) {
                    dispatch({ type: Actions.AUTHENTICATION_LOGOUT_SUCCESS });
                    localStorage.removeItem("token");
                    localStorage.removeItem("UserName");
                    userDetails.removeDetails()
                    return res;

                } else {
                    dispatch({
                        type: Actions.AUTHENTICATION_LOGOUT_FAILURE,
                    });
                    return res;
                }
            } catch (err) {
                dispatch({ type: Actions.AUTHENTICATION_LOGOUT_FAILURE });
                throw err;
            }
        }
    },


    /**
     * Dispatches actions to fetch product classes from the API.
     *
     * @returns {Promise<Object>} The response from the API containing the product classes.
     */
    GetProductClasses: () => {
        return async (dispatch) => {
            dispatch({ type: Actions.PRODUCT_CLASS_REQUEST });
            try {
                const res = await api.post(`/orderConfigurator/productClass`);
                if (res?.status === 200) {
                    dispatch({ type: Actions.PRODUCT_CLASS_SUCCESS, payload: res.data.data });
                    return res;
                } else {
                    dispatch({
                        type: Actions.PRODUCT_CLASS_FAILURE,
                        payload: res.data.errMsg,
                    });
                    return res;
                }
            } catch (err) {
                dispatch({ type: Actions.PRODUCT_CLASS_FAILURE, payload: "" });
                throw err;
            }
        };
    },

    /**
     * Dispatches actions to fetch product sub-classes from the API based on the provided product class ID.
     *
     * @param {string} productClass - The ID of the product class to fetch sub-classes for.
     * @returns {Promise<Object>} The response from the API containing the product sub-classes.
     */
    GetProductSubClasses: (productClass) => {
        return async (dispatch) => {
            dispatch({ type: Actions.PRODUCT_SUB_CLASS_REQUEST });
            try {
                const res = await api.post(`/orderConfigurator/productSubClasses`, {
                    'productClassId': productClass
                });
                if (res?.status === 200) {
                    dispatch({ type: Actions.PRODUCT_SUB_CLASS_SUCCESS, payload: res.data.data });
                    return res;
                } else {
                    dispatch({
                        type: Actions.PRODUCT_SUB_CLASS_FAILURE,
                        payload: res.data.errMsg,
                    });
                    return res;
                }
            } catch (err) {
                dispatch({ type: Actions.PRODUCT_SUB_CLASS_FAILURE, payload: "" });
                throw err;
            }
        };
    },

    /**
     * Dispatches actions to fetch order types from the API based on the provided product sub-class ID.
     *
     * @param {string} productSubClass - The ID of the product sub-class to fetch order types for.
     * @returns {Promise<Object>} The response from the API containing the order types.
     */
    GetOrderTypes: (productSubClass) => {
        return async (dispatch) => {
            dispatch({ type: Actions.ORDER_TYPE_REQUEST });
            try {
                const res = await api.post(`/orderConfigurator/orderTypes`, {
                    'productClassId': productSubClass
                });
                if (res?.status === 200) {
                    dispatch({ type: Actions.ORDER_TYPE_SUCCESS, payload: res.data.data });
                    return res;
                } else {
                    dispatch({
                        type: Actions.ORDER_TYPE_FAILURE,
                        payload: res.data.errMsg,
                    });
                    return res;
                }
            } catch (err) {
                dispatch({ type: Actions.ORDER_TYPE_FAILURE, payload: err.message });
                throw err;
            }
        };
    },

    /**
     * Dispatches actions to fetch portfolio types from the API.
     *
     * @returns {Promise<Object>} The response from the API containing the portfolio types.
     */
    GetPortfolioTypes: () => {
        return async (dispatch) => {
            dispatch({ type: Actions.PORTFOLIO_TYPE_REQUEST });
            try {
                const res = await api.post(`/orderConfigurator/portfolioTypes`);
                if (res?.status === 200) {
                    dispatch({ type: Actions.PORTFOLIO_TYPE_SUCCESS, payload: res.data.data });
                    return res;
                } else {
                    dispatch({
                        type: Actions.PORTFOLIO_TYPE_FAILURE,
                        payload: res.data.errMsg,
                    });
                    return res;
                }
            } catch (err) {
                dispatch({ type: Actions.PORTFOLIO_TYPE_FAILURE, payload: "" });
                throw err;
            }
        };
    },

    /**
     * Dispatches an action to reset the dropdown data.
     *
     * @returns {Function} A thunk function that dispatches the RESET_DROPDOWN_LIST action.
     */
    ResetDropdownData: () => {
        return async (dispatch) => {
            dispatch({ type: Actions.RESET_DROPDOWN_LIST });
        };
    },

    /**
     * Dispatches actions to fetch the configurator details from the API.
     *
     * @param {Object} body - The request body to send to the API.
     * @param {boolean} [reset=false] - Whether to reset the configurator details state.
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    GetConfiguratorDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.RESET_CONFIGURATOR_DETAILS });
            }
            else {
                dispatch({ type: Actions.CONFIGURATOR_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/orderConfigurator/getConfiguratorsDetails`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.CONFIGURATOR_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.CONFIGURATOR_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.CONFIGURATOR_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    /**
     * Dispatches actions to save or update configurator details in the API.
     *
     * @param {Object} body - The request body to send to the API.
     * @param {string} [action=''] - The action to perform, either 'edit' or null (for save).
     * @param {boolean} [reset=false] - Whether to reset the save/update configurator details state.
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    SaveUpdateConfiguratorDetails: (body, action = null, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.RESET_SAVE_CONFIGURATOR_DETAILS });
            }
            else {
                dispatch({ type: Actions.SAVE_CONFIGURATOR_DETAILS_REQUEST });
                try {
                    const endPoint = action === 'edit' ? `/orderConfigurator/update` : `/orderConfigurator/save`
                    const res = await api.post(endPoint, body);
                    if (res?.status === 200) {
                        dispatch({
                            type: Actions.SAVE_CONFIGURATOR_DETAILS_SUCCESS, payload: {
                                request: body,
                                response: res.data,
                            }
                        });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.SAVE_CONFIGURATOR_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.SAVE_CONFIGURATOR_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        }
    },

    /**
     * Dispatches actions to fetch all configurator details from the API.
     *
     * @param {Object} body - The request body to send to the API.
     * @param {boolean} [reset=false] - Whether to reset the get all configuration details state.
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    GetAllConfiguratorDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_ALL_CONFIGURATION_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_ALL_CONFIGURATION_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/orderConfigurator/getAllConfigurations`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_ALL_CONFIGURATION_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_ALL_CONFIGURATION_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_ALL_CONFIGURATION_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    /**
     * Dispatches actions to fetch the entity master details from the API.
     *
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    GetEntityMasterDetails: () => {
        return async (dispatch) => {
            dispatch({ type: Actions.UDF_CONFIGURATOR_ENTITY_DETAILS_REQUEST });
            try {
                const res = await api.post(`/udfConfigurator/entityMaster`);
                if (res?.status === 200) {
                    dispatch({ type: Actions.UDF_CONFIGURATOR_ENTITY_DETAILS_SUCCESS, payload: res.data.data });
                    return res;
                } else {
                    dispatch({
                        type: Actions.UDF_CONFIGURATOR_ENTITY_DETAILS_FAILURE,
                        payload: res.data.errMsg,
                    });
                    return res;
                }
            } catch (err) {
                dispatch({ type: Actions.UDF_CONFIGURATOR_ENTITY_DETAILS_FAILURE, payload: "" });
                throw err;
            }
        };
    },

    /**
     * Dispatches actions to fetch the available portfolio view types from the API.
     *
     * @param {string} pageViewType - The type of page view to fetch the available view types for.
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    GetPortFolioViewTypes: (pageViewType) => {
        return async (dispatch) => {
            dispatch({ type: Actions.PORTFOLIO_VIEW_TYPE_REQUEST });
            try {
                const res = await api.post(`/portfolioview/getFieldListToBind`,
                    { pageViewType: pageViewType }
                );

                if (res?.status === 200) {
                    // Dispatching success action with the fetched data
                    dispatch({ type: Actions.PORTFOLIO_VIEW_TYPE_SUCCESS, payload: [...res.data.data] }); // Use spread operator
                    return res; // Returning the response for further usage if needed
                } else {
                    // Dispatching failure action with error message
                    dispatch({
                        type: Actions.PORTFOLIO_VIEW_TYPE_FAILURE,
                        payload: res.data.errMsg,
                    });
                    return res;
                }
            } catch (err) {

                // Dispatching failure action in case of an error
                dispatch({ type: Actions.PORTFOLIO_VIEW_TYPE_FAILURE, payload: err.message });
                throw err; // Throwing the error for handling in the component if needed
            }
        }
    },

    /**
     * Dispatches actions to fetch the available portfolio view type field values from the API.
     *
     * @param {string} pageViewType - The type of page view to fetch the available view type field values for.
     * @param {string} ucc - The unique client code (UCC) to fetch the field values for.
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    GetPortFolioViewTypeFieldValue: (pageViewType, ucc) => {
        return async (dispatch) => {
            dispatch({ type: Actions.PORTFOLIO_VIEW_TYPE_FIELD_VALUE_REQUEST });
            try {
                const res = await api.post(`/portfolioview/getFieldValue?ucc=${ucc}`,
                    { pageViewType: pageViewType }
                );

                if (res?.status === 200) {
                    // Dispatching success action with the fetched data
                    dispatch({ type: Actions.PORTFOLIO_VIEW_TYPE_FIELD_VALUE_SUCCESS, payload: res.data.data });
                    return res; // Returning the response for further usage if needed
                } else {
                    // Dispatching failure action with error message
                    dispatch({
                        type: Actions.PORTFOLIO_VIEW_TYPE_FIELD_VALUE_FAILURE,
                        payload: res.data.errMsg,
                    });
                    return res;
                }
            } catch (err) {
                // Dispatching failure action in case of an error
                dispatch({ type: Actions.PORTFOLIO_VIEW_TYPE_FIELD_VALUE_FAILURE, payload: err.message });
                throw err; // Throwing the error for handling in the component if needed
            }
        };
    },

    /**
     * Dispatches actions to save or update the UDF (User Defined Field) configurator details.
     *
     * @param {Object} body - The request body containing the UDF configurator details.
     * @param {string} [action=''] - The action to perform, either 'edit' or empty for save.
     * @param {boolean} [reset=false] - Whether to reset the UDF configurator details.
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    SaveUpdateUdfConfiguratorDetails: (body, action = null, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.UDF_CONFIGURATOR_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.UDF_CONFIGURATOR_DETAILS_REQUEST });
                try {
                    const endPoint = action === 'edit' ? `/udfConfigurator/update` : `/udfConfigurator/save`
                    const res = await api.post(endPoint, body);
                    if (res?.status === 200) {
                        dispatch({
                            type: Actions.UDF_CONFIGURATOR_DETAILS_SUCCESS, payload: {
                                request: body,
                                response: res.data,
                            }
                        });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.UDF_CONFIGURATOR_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        throw res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.UDF_CONFIGURATOR_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        }
    },

    /**
     * Dispatches actions to fetch all UDF (User Defined Field) configuration details.
     *
     * @param {Object} body - The request body containing the entity ID.
     * @param {boolean} [reset=false] - Whether to reset the UDF configuration details.
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    GetAllUDFConfiguratorDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_ALL_UDF_CONFIGURATION_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_ALL_UDF_CONFIGURATION_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/udfConfigurator/getAllOrderUdfConfiguration`, {
                        "entityId": body
                    });
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_ALL_UDF_CONFIGURATION_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_ALL_UDF_CONFIGURATION_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_ALL_UDF_CONFIGURATION_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    /**
     * Dispatches actions to fetch the UDF (User Defined Field) product class details.
     *
     * @param {Object} body - The request body containing the entity ID.
     * @param {boolean} [reset=false] - Whether to reset the UDF product class details.
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    GetUDFProductClassDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.UDF_PRODUCT_CLASS_RESET });
            }
            else {
                dispatch({ type: Actions.UDF_PRODUCT_CLASS_REQUEST });
                try {
                    const res = await api.post(`/udfConfigurator/productClass`, {
                        "entityId": body
                    });
                    if (res?.status === 200) {
                        dispatch({ type: Actions.UDF_PRODUCT_CLASS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.UDF_PRODUCT_CLASS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.UDF_PRODUCT_CLASS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    /**
     * Dispatches actions to fetch the UDF (User Defined Field) configurator details.
     *
     * @param {Object} body - The request body containing the necessary data to fetch the UDF configurator details.
     * @param {boolean} [reset=false] - Whether to reset the UDF configurator details.
     * @returns {Function} A thunk function that dispatches the appropriate actions based on the API response.
     */
    GetUDFConfiguratorDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.UPDATE_UDF_CONFIGURATOR_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.UPDATE_UDF_CONFIGURATOR_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/udfConfigurator/getUdfDetailConfiguration`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.UPDATE_UDF_CONFIGURATOR_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.UPDATE_UDF_CONFIGURATOR_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.UPDATE_UDF_CONFIGURATOR_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    GetOrderViewConfiguratorDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_ORDER_VIEW_CONFIGURATION_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_ORDER_VIEW_CONFIGURATION_DETAILS_REQUEST });
                try {
                    const res = await api.post('/orderConfigurator/getConfiguratorsDetails', body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_ORDER_VIEW_CONFIGURATION_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_ORDER_VIEW_CONFIGURATION_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_ORDER_VIEW_CONFIGURATION_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    GetQuickOrderConfiguratorDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_QUICK_ORDER_CONFIGURATION_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_QUICK_ORDER_CONFIGURATION_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/quickOrderConfigurator/getAllConfigurations`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_QUICK_ORDER_CONFIGURATION_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_QUICK_ORDER_CONFIGURATION_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_QUICK_ORDER_CONFIGURATION_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },
    GetAllWidgetConfiguratorDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_ALL_WIDGET_CONFIGURATION_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_ALL_WIDGET_CONFIGURATION_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/securityViewConfigurator/getAllWidgetConfigurations`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_ALL_WIDGET_CONFIGURATION_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_ALL_WIDGET_CONFIGURATION_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_ALL_WIDGET_CONFIGURATION_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },
    GetSchemeList: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_SCHEME_LIST_RESET });
            }
            else {
                dispatch({ type: Actions.GET_SCHEME_LIST_REQUEST });
                try {
                    const res = await api.post(`/schemes`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_SCHEME_LIST_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_SCHEME_LIST_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_SCHEME_LIST_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },
    addtoCart: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.ADD_TO_CART_RESET });
            }
            else {
                dispatch({ type: Actions.ADD_TO_CART_REQUEST });
                try {
                    const res = await api.post(`/InvestmentCart/save`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.ADD_TO_CART_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.ADD_TO_CART_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.ADD_TO_CART_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    addtoCartPayload: (body) => {
        return async (dispatch) => {
            try {
                dispatch({ type: "ADD_TO_CART_PAYLOAD", payload: body });
                return body;
            } catch (err) {
                dispatch({ type: Actions.ADD_TO_CART_FAILURE, payload: "" });
                throw err;
            }

        };
    },
    // addtoCartPayload: (body, reset = false) => {
    //     return async (dispatch) => {
    //         try {
    //             if (reset) {
    //                 dispatch({ type: Actions.ADD_TO_CART_RESET });
    //             }else if (body){
    //                 dispatch({ type:"ADD_TO_CART_PAYLOAD", payload: body });
    //                 return body;
    //             }

    //         } catch (err) {
    //             dispatch({ type: Actions.ADD_TO_CART_FAILURE, payload: "" });
    //             throw err;
    //         }

    //     };
    // },

    GetOrderViewUdfConfiguratorDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_ORDER_VIEW_UDF_CONFIGURATION_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_ORDER_VIEW_UDF_CONFIGURATION_DETAILS_REQUEST });
                try {
                    const res = await api.post('/udfConfigurator/getUdfFieldConfiguration', body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_ORDER_VIEW_UDF_CONFIGURATION_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_ORDER_VIEW_UDF_CONFIGURATION_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_ORDER_VIEW_UDF_CONFIGURATION_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },
    GetCustomizeCartOrderDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_CUSTOMIZE_CARR_ORDERDETAIL_RESET });
            }
            else {
                dispatch({ type: Actions.GET_CUSTOMIZE_CARR_ORDERDETAIL_REQUEST });
                try {
                    const res = await api.post('/InvestmentCart/getCustomizeCartOrderDetails', body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_CUSTOMIZE_CARR_ORDERDETAIL_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_CUSTOMIZE_CARR_ORDERDETAIL_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_CUSTOMIZE_CARR_ORDERDETAIL_FAILURE, payload: {} });
                    throw err;
                }
            }
        };
    },

    investNowAction: (body = null, reset = false) => {
        return async (dispatch) => {
            try {
                if (reset) {
                    dispatch({ type: "INVEST_NOW_DATA_RESET" });
                    return "Data reset successfully";
                } else if (body) {
                    dispatch({ type: "INVEST_NOW_DATA_SAVE", payload: body });
                    return body;
                }
            } catch (err) {
                console.error("Error in investNowAction:", err);
                throw err;
            }
        };
    },

    PlaceOrderDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.PLACE_ORDER_RESET });
            }
            else {
                dispatch({ type: Actions.PLACE_ORDER_REQUEST });
                try {
                    const res = await api.post(`/InvestmentCart/placeOrderFromCart`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.PLACE_ORDER_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.PLACE_ORDER_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.PLACE_ORDER_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    investNowLumpSumAction: (body = null, reset = false) => {
        return async (dispatch) => {
            try {
                if (reset) {
                    dispatch({ type: "INVEST_NOW_LUMPSUM_DATA_RESET" });
                    return "Data reset successfully";
                } else if (body) {
                    dispatch({ type: "INVEST_NOW_LUMPSUM_DATA_SAVE", payload: body });
                    return body;
                }
            } catch (err) {
                console.error("Error in investNowLumpSumAction:", err);
                throw err;
            }
        };
    },

    PlaceOrderDetailsForInvestNow: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.PLACE_ORDER_RESET });
            }
            else {
                dispatch({ type: Actions.PLACE_ORDER_REQUEST });
                try {
                    const res = await api.post(`/mutualFundOrder/placeOrder`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.PLACE_ORDER_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.PLACE_ORDER_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.PLACE_ORDER_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    GetHoldingReportConfiguredDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_HOLDING_REPORT_CONFIGURED_FIELD_RESET });
            }
            else {
                dispatch({ type: Actions.GET_HOLDING_REPORT_CONFIGURED_FIELD_REQUEST });
                try {
                    const res = await api.post('/orderConfigurator/getHoldingReportConfiguredField', body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_HOLDING_REPORT_CONFIGURED_FIELD_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_HOLDING_REPORT_CONFIGURED_FIELD_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_HOLDING_REPORT_CONFIGURED_FIELD_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    GetHoldingDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_HOLDINGS_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_HOLDINGS_DETAILS_REQUEST });
                try {
                    const res = await api.post('/report/getHolding', body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_HOLDINGS_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_HOLDINGS_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_HOLDINGS_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },
    getCartList: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_CART_LIST_RESET });
            }
            else {
                dispatch({ type: Actions.GET_CART_LIST_REQUEST });
                try {
                    const res = await api.post(`/InvestmentCart/getCartDetails`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_CART_LIST_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_CART_LIST_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_CART_LIST_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    userDataStore: (body) => {
        return async (dispatch) => {
            try {
                dispatch({ type: Actions.USER_DATA_UPDATE, payload: body });
                return body;
            } catch (err) {
                dispatch({ type: Actions.USER_DATA_RESET, payload: "" });
                throw err;
            }
        };
    },

    GetNAVDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_NAV_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_NAV_DETAILS_REQUEST });
                try {
                    const res = await api.post('/schemes/NAVDetails', body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_NAV_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_NAV_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_NAV_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    // ---------------action creators target scheme details ---------------
    GetSchemeListForTargetScheme: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_SCHEME_LIST_FOR_TARGET_SCHEME_RESET });
            }
            else {
                dispatch({ type: Actions.GET_SCHEME_LIST_FOR_TARGET_SCHEME_REQUEST });
                try {
                    const res = await api.post(`/schemes`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_SCHEME_LIST_FOR_TARGET_SCHEME_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_SCHEME_LIST_FOR_TARGET_SCHEME_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_SCHEME_LIST_FOR_TARGET_SCHEME_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    // ---------------action creators for dashboard widgets details-------------

    GetAllDashboardWidgetsConfiguration: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_ALL_DASHBOARD_WIDGET_CONFIGURATION_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_ALL_DASHBOARD_WIDGET_CONFIGURATION_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/dashboard/getDashboardConfiguration`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_ALL_DASHBOARD_WIDGET_CONFIGURATION_DETAILS_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_ALL_DASHBOARD_WIDGET_CONFIGURATION_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_ALL_DASHBOARD_WIDGET_CONFIGURATION_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    AddWatchListTab: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.ADD_WATCH_LIST_TO_TAB_RESET });
            }
            else {
                dispatch({ type: Actions.ADD_WATCH_LIST_TO_TAB_REQUEST });
                try {
                    const res = await api.post(`/dashboard/addDashWatchListTab`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.ADD_WATCH_LIST_TO_TAB_SUCCESS, payload: { ...res.data, value: new Date().getTime() } });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.ADD_WATCH_LIST_TO_TAB_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.ADD_WATCH_LIST_TO_TAB_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },


    GetWatchListTabDataDetails: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_WATCH_LIST_DATA_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_WATCH_LIST_DATA_DETAILS_REQUEST });
                try {
                    const res = await api.post('/dashboard/getDashWatchListTabDataDetails', body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_WATCH_LIST_DATA_DETAILS_SUCCESS, payload: res.data.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_WATCH_LIST_DATA_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_WATCH_LIST_DATA_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    GetRiskProfileConfigurationDetails: (body, reset = false, navigate) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_RISK_PROFILE_CONFIGURATION_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_RISK_PROFILE_CONFIGURATION_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/riskProfileConfigurator/getRiskProfileConfiguredField`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_RISK_PROFILE_CONFIGURATION_DETAILS_SUCCESS, payload: res.data });
                        const { riskProfileSetup, riskProfileUserSetup } = res.data.data

                        if (riskProfileSetup.isMandatory == 'Y' && riskProfileUserSetup.isRiskProfileCompleted == 'N') {
                            navigate('/riskprofileone')
                        }
                        if (riskProfileSetup.isMandatory == 'Y' && riskProfileUserSetup.isRiskProfileCompleted == 'Y') {
                            const lastRiskStartDate = new Date(riskProfileUserSetup.riskProfileCompletedOn).setFullYear(new Date(riskProfileUserSetup.riskProfileCompletedOn).getFullYear() + 1)
                            if (new Date().getTime() < new Date(lastRiskStartDate).getTime()) {
                                navigate('/riskprofileone')
                            } else {
                                navigate('/dashboard')
                            }
                        }
                        if (riskProfileSetup.isMandatory == 'N' && riskProfileSetup.askAlwayTosetup == 'Y') {
                            navigate('/riskprofileone')

                        }
                        if (riskProfileSetup.isMandatory == 'N' && riskProfileSetup.askAlwayTosetup == 'N') {
                            if (riskProfileSetup.riskProfileSkipCount >= riskProfileSetup.noOfFrequencyToAskSetup) {
                                navigate('/dashboard')
                            }
                            navigate('/riskprofileone')
                        }

                    } else {
                        dispatch({
                            type: Actions.GET_RISK_PROFILE_CONFIGURATION_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_RISK_PROFILE_CONFIGURATION_DETAILS_FAILURE, payload: "" });
                    throw err;
                }
            }
        };
    },

    GetFundUniverseData: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_FUND_UNIVERSE_DATA_RESET });
            }
            else {
                dispatch({ type: Actions.GET_FUND_UNIVERSE_DATA_REQUEST });
                try {
                    const res = await api.post(`/schemes`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_FUND_UNIVERSE_DATA_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_FUND_UNIVERSE_DATA_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_FUND_UNIVERSE_DATA_FAILURE, payload: err });
                    throw err;
                }
            }
        };
    },

    GetParentModelPortfolioDetail: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_PARENT_PORTFOLIO_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_PARENT_PORTFOLIO_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/ModelPortfolio/getParentModelPortfolioDetail`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_PARENT_PORTFOLIO_DETAILS_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_PARENT_PORTFOLIO_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_PARENT_PORTFOLIO_DETAILS_FAILURE, payload: err });
                    throw err;
                }
            }
        };
    },
    GetChildModelPortfolioDetail: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_CHILD_PORTFOLIO_DETAILS_RESET });
            }
            else {
                dispatch({ type: Actions.GET_CHILD_PORTFOLIO_DETAILS_REQUEST });
                try {
                    const res = await api.post(`/ModelPortfolio/getChildModelPortfolioDetail`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_CHILD_PORTFOLIO_DETAILS_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_CHILD_PORTFOLIO_DETAILS_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_CHILD_PORTFOLIO_DETAILS_FAILURE, payload: err });
                    throw err;
                }
            }
        };
    },

    CreateChildModelData: (body, reset = false) => {
        return async (dispatch) => {
            try {
                if (reset) {
                    dispatch({ type: "ADD_CHILD_MODEL_DATA_RESET" });
                } else if (body) {
                    dispatch({ type: "ADD_CHILD_MODEL_DATA_SUCCESS", payload: body });
                    return body;
                }

            } catch (err) {
                dispatch({ type: Actions.ADD_CHILD_MODEL_DATA_FAILURE, payload: "" });
                throw err;
            }
        }
    },

    GetFundCompareConfig: (body, reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_FUND_COMPARE_CONFIG_RESET });
            }
            else {
                dispatch({ type: Actions.GET_FUND_COMPARE_CONFIG_REQUEST });
                try {
                    const res = await api.post(`/FundCompareConfigurator/getWidgetConfigurationsForFundCompare`, body);
                    if (res?.status === 200) {
                        dispatch({ type: Actions.GET_FUND_COMPARE_CONFIG_SUCCESS, payload: res.data });
                        return res;
                    } else {
                        dispatch({
                            type: Actions.GET_FUND_COMPARE_CONFIG_FAILURE,
                            payload: res.data.errMsg,
                        });
                        return res;
                    }
                } catch (err) {
                    dispatch({ type: Actions.GET_FUND_COMPARE_CONFIG_FAILURE, payload: err });
                    throw err;
                }
            }
        };
    },

    GetFundCompareScheme: (body = [], reset = false) => {
        return async (dispatch) => {
            if (reset) {
                dispatch({ type: Actions.GET_FUND_COMPARE_SCHEME_RESET });
            }
            else {
                dispatch({ type: Actions.GET_FUND_COMPARE_SCHEME_REQUEST });
                try {
                    const requestApis = body.map((schemeCode) => {
                        const payload = {
                            "clientCode": "35",
                            "userId": "integra",
                            "transactionType": 2,
                            "searchString": "",
                            "lastBusinessDate": "2025-02-19T09:52:27.486Z",
                            "getData": 1,
                            "schemeCode": schemeCode
                        }
                        return api.post(`/schemes`, payload);
                    })

                    const res = await Promise.all(requestApis);
                    dispatch({
                        type: Actions.GET_FUND_COMPARE_SCHEME_SUCCESS, payload:
                            res.map((data, index) => {
                                return data.data[0]
                            })

                    });
                } catch (err) {
                    dispatch({ type: Actions.GET_FUND_COMPARE_SCHEME_FAILURE, payload: err });
                    throw err;
                }
            }
        }
    },

    CreateRebalanceDetailData: (body, reset = false) => {
        return async (dispatch) => {
            try {
                if (reset) {
                    dispatch({ type: "ADD_REBALANCE_DETAIL_DATA_RESET" });
                } else if (body) {
                    dispatch({ type: "ADD_REBALANCE_DETAIL_DATA_SUCCESS", payload: body });
                    return body;
                }

            } catch (err) {
                dispatch({ type: Actions.ADD_REBALANCE_DETAIL_DATA_FAILURE, payload: "" });
                throw err;
            }
        }
    },

}
