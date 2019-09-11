const isFunction = (value) => value && {}.toString.call(value) === '[object Function]';

export default isFunction;