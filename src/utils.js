const opt = Object.prototype.toString

export const is = (val, type) => {
  return opt.call(val) === `[object ${type}]`
}

// 字符串类型
export const isString = val => {
  return is(val, 'String')
}

// 数组
export const isArray = val => {
  return is(val, 'Array')
}


// 函数类型
export const isFunction = val => {
  return typeof val === 'function'
}

// 对象类型
export const isObject = val => {
  return is(val, 'Object')
}

// 空值
export const isEmpty = val => {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}