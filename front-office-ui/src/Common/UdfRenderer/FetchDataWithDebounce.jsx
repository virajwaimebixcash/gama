import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import api from "../../APIs/interceptor";

const FetchDataWithDebounce = ({ url, minCharsToSearch = 3, render, paramName, defaultValue, allValues, config }) => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);
  const userDataStore = useSelector((state) => state.userDataStore);

  const fetchData = useCallback(
    debounce(async (query) => {
      if (query.length >= minCharsToSearch) {
        try {
          const body = {
            relativeTPAPIUrl: config.relativeTPAPIUrl,
            requestParam: Object.fromEntries(
              typeof (config.requestParam) === "string" ?
                JSON.parse(config.requestParam).map((key) => [
                  key.fieldName,
                  key.fieldNametoBindValue === "userDataStore"
                    ? userDataStore[key.fieldName]
                    : allValues?.[key.fieldName] || key?.defaultValue,
                ])
                : config?.requestParam?.map((key) => [
                  key.fieldName,
                  key.fieldNametoBindValue === "userDataStore"
                    ? userDataStore[key.fieldName]
                    : allValues[key.fieldName] || key.defaultValue,
                ])
            ),
            isThirdPartyApi: config?.isThirdPartyApi ?? true
          };

          const searchField = typeof (config.requestParam) === "string" ? JSON.parse(config.requestParam).find((key) => key.IsSearchDropDownField === "Y") : config.requestParam.find((key) => key.IsSearchDropDownField === "Y");

          if (searchField) {
            body.requestParam[searchField.fieldName] = query;

            const response = await api.post(url, body);

            const parsedConfig = JSON.parse(config.responseParam);

            const transformedData = typeof (config.responseParam) === "string" ?
              response.data.data.map((item) => ({
                value: item[parsedConfig.Text],
                text: item[parsedConfig.Text],
              })) :
              response.data.data.map((item) => ({
                value: item[config.responseParam.Text],
                text: item[config.responseParam.Text],
              }));

            setData(transformedData);
          } else {
            setData([]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setData([]);
        }
      } else {
        setData([]);
      }
    }, 300),
    [url, minCharsToSearch, config, allValues, userDataStore]
  );

  useEffect(() => {
    if (defaultValue) {
      (async () => {
        try {
          const body = {
            relativeTPAPIUrl: config.relativeTPAPIUrl,
            requestParam: Object.fromEntries(
              config.requestParam.map((key) => [
                key.fieldName,
                key.fieldNametoBindValue === "userDataStore"
                  ? userDataStore[key.fieldName]
                  : allValues[key.fieldName] || key.defaultValue,
              ])
            ),
          };

          const searchField = config.requestParam.find((key) => key.IsSearchDropDownField === "Y");
          if (searchField) {
            body.requestParam[searchField.fieldName] = defaultValue;
            const response = await api.post(url, body);
            const transformedData = response.data.responseBody.map((item) => ({
              value: item[config.responseParam.Text],
              text: item[config.responseParam.Text],
            }));
            setData(transformedData);
            const defaultOption = transformedData.find((option) => option.value === defaultValue);
            setValue(defaultOption);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setData([]);
        }
      })();
    }
  }, [defaultValue, url, paramName, config, userDataStore, allValues]);

  useEffect(() => {
    if (inputValue) {
      setValue(data.find((option) => option.text === inputValue) ?? null);
    }
  }, [inputValue, data]);

  useEffect(() => {
    fetchData(inputValue);
  }, [inputValue, fetchData]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return render({ data, inputValue, setInputValue, value });
};

export default FetchDataWithDebounce;
