// 封装本地存储的方法

/**
 * 本地存储
 *
 */
export const setItem = (key, value) => {
  // 将数组、对象类型的数据装换为JSON格式存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
   * 获取数据
   * data 有可能需要 JOSN.parse 处理 数据类型 JSON字符串
  // data 不需要 JSON.parse 处理 不是JSON字符串
   */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/**
 * 删除存储
 *
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
