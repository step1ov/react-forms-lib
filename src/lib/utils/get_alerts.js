import React from "react";

const GetAlerts = (alerts) => {
    if (alerts)
    {
        if (Array.isArray(alerts))
        {
            const result = [];
            alerts.forEach(elem => {
                const alert = GetAlert(elem);
                if (alert)
                {
                    result.push(alert);
                }
            });
            return result;
        }
        else
        {
            const alert = GetAlert(alerts);
            if (alert)
            {
                return [ alert ];
            }
        }
    }
    return [];
};

const GetAlert = alert => {
    if (typeof alert === 'object' && !!alert.type && !!alert.content)
    {
        return alert;
    }
    else if (typeof alert === 'string' || React.isValidElement(alert))
    {
        return { type: "danger", content: alert };
    }
    return null;
};

export default GetAlerts;