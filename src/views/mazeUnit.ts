//小数乘法
export const floatMul = (num1:number, num2:number):number => {
  let m = 0, s1 = num1.toString(), s2 = num2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//除法
export const floatDiv = (num1:number, num2:number):number => {
  if (num2 == 0) {
    return 0;
  }
  let t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = num1.toString().split(".")[1].length
  } catch (e) {
  }
  try {
    t2 = num2.toString().split(".")[1].length
  } catch (e) {
  }
  r1 = Number(num1.toString().replace(".", ""));
  r2 = Number(num2.toString().replace(".", ""));
  return floatMul((r1 / r2), Math.pow(10, t2 - t1));
}
//小数加法
export const floatAdd = (num1:number, num2:number):number => {
  let r1, r2, m;
  try {
    r1 = num1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return Math.round(num1 * m + num2 * m) / m;
}
//小数减法
export const floatSub = (num1:number, num2:number):number => {
  let r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  let n = (r1 >= r2) ? r1 : r2;
  return Number((Math.round(num1 * m - num2 * m) / m).toFixed(n));
}

export const getElementById = (id:string):HTMLElement => {
  return document.getElementById(id)!;
}

export const getWindowObject = ():Window => {
  return window;
}

export const getWindowDevicePixelRatio = ():number => {
  return window.devicePixelRatio;
  // return wx.getWindowInfo().pixelRatio;
}
