// 表单效验规则

export const usernameRules = [
  { required: true, message: '请填写账号' },
  {
    pattern: /^[a-zA-Z]\w{4,15}$/,
    message: '账号格式不正确'
  }
]

export const passwordRules = [
  { required: true, message: '请填写密码' },
  {
    pattern: /^\d{6}$/,
    message: '密码格式不对'
  }
]
