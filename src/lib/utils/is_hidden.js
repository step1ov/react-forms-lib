import isFunction from "./is_function";

const isHidden = (value, props) => isFunction(props.hidden) ? props.hidden(value, props) : props.hidden;

export default isHidden;