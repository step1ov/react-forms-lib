const CloneData = (props) =>
{
    const data = props.data ? Object.assign({}, props.data) : {};
    if (!data.values) data.values = {};
    if (!data.validation) data.validation = {};
    if (!data.states) data.states = {};
    return data;
};

export default CloneData;