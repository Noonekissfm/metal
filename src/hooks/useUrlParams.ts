import { useParams } from "react-router-dom";

export const useUrlParams = (): string[] => {
    const keys = Object.values(useParams()).filter((item): item is string => !!item);

    if (keys[0] !== "index") {
        keys.unshift("index");
    }

    return keys;
};
