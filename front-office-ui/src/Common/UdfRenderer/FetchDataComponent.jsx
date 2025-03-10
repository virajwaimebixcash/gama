import { useCallback, useEffect, useState, useRef } from 'react';
import api from '../../APIs/interceptor';
import { useSelector } from 'react-redux';

const FetchDataComponent = ({ url, allValues, render, config }) => {
    const [data, setData] = useState(null);
    const prevUrlRef = useRef(null);

    const userDataStore = useSelector(state => state.userDataStore);

    const fetchData = useCallback(async () => {
        if (url && url !== prevUrlRef.current) {  // Compare current URL with the previous one
            prevUrlRef.current = url;  // Update the ref with the current URL

            // const entries = typeof (config?.requestParam) === "string" ?
            //     JSON.parse(config?.requestParam)?.map((key) => [
            //         key.fieldName,
            //         key.fieldNametoBindValue === 'userDataStore'
            //             ? userDataStore[key.fieldName]
            //             : allValues[key.fieldName] || key.defaultValue,
            //     ]) :
            //     config?.requestParam?.map((key) => [
            //         key.fieldName,
            //         key.fieldNametoBindValue === 'userDataStore'
            //             ? userDataStore[key.fieldName]
            //             : allValues[key.fieldName] || key.defaultValue,
            //     ]) || [];

            const entries = (typeof config?.requestParam === "string" && config?.requestParam.trim() !== "")
                ? JSON.parse(config.requestParam)?.map((key) => [
                    key.fieldName,
                    key.fieldNametoBindValue === 'userDataStore'
                        ? userDataStore[key.fieldName]
                        : allValues[key.fieldName] || key.defaultValue,
                ])
                : Array.isArray(config?.requestParam)
                    ? config.requestParam.map((key) => [
                        key.fieldName,
                        key.fieldNametoBindValue === 'userDataStore'
                            ? userDataStore[key.fieldName]
                            : allValues[key.fieldName] || key.defaultValue,
                    ])
                    : [];

            const body = {
                relativeTPAPIUrl: config?.relativeTPAPIUrl,
                requestParam: Object.fromEntries(entries),
                isThirdPartyApi: config?.isThirdPartyApi ?? true
            }

            const data = await api.post(url, body).then(res => res.data.data);

            const parsedConfig = typeof (config.responseParam) === "string" ? JSON.parse(config?.responseParam) : {};

            const transformedData = typeof (config.responseParam) === "string" ?
                data?.map(item => ({
                    value: item[parsedConfig?.Value],
                    text: item[parsedConfig?.Text],
                })) :
                data?.map(item => ({
                    value: item[config?.responseParam?.Value],
                    text: item[config?.responseParam?.Text],
                }))

            return transformedData;
        }
        else if (!url && config.options) {
            return config.options;  // Return provided data if no URL is provided and data is set in config.data
        }
        return data;  // Return existing data if URL is the same
    }, [url, data]);

    useEffect(() => {
        fetchData().then(fetchedData => {
            setData(fetchedData);
        }).catch(error => {
            setData([]);
            console.error("Error fetching data:", error);
        });
    }, [fetchData]);

    return render(data);
};

export default FetchDataComponent;
