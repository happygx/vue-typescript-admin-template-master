// Parse the time to string
export const parseTime = (
  time?: object | string | number,
  cFormat?: string
): string | null => {
  if (time === undefined) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date: Date;
  if (typeof time === "object") {
    date = time as Date;
  } else {
    let newTime: any;
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      // tslint:disable-next-line:radix
      newTime = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      newTime = time * 1000;
    }
    date = new Date(newTime);
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      return "0" + value;
    }
    return String(value) || "0";
  });
  return timeStr;
};

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) =>
    filterKeys.map((key: string) => {
      if (key === "timestamp") {
        return parseTime(data[key]);
      } else {
        return data[key];
      }
    })
  );

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
};

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) { ele.className += " " + className; }
};

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
};

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return;
  }
  let classString = ele.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  ele.className = classString;
};

export const getLastMonth = () => {
  let now = new Date()
  let year: any = now.getFullYear() // getYear()+1900=getFullYear()
  let month: any = now.getMonth() + 1 // 0-11表示1-12月
  let day: any = now.getDate();
  let dateObj: any = {};
  if (parseInt(month, 10) < 10) {
      month = "0" + month;
  }
  if (parseInt(day, 10) < 10) {
      day = "0" + day;
  }

  dateObj.now = year + '-' + month + '-' + day;

  // 如果是1月份，则取上一年的12月份
  if (parseInt(month, 10) === 1) {
      dateObj.last = (parseInt(year, 10) - 1) + '-12-' + day;
      return dateObj;
  }

  // 上月总天数
  let preSize = new Date(year, parseInt(month, 10) - 1, 0).getDate();
  // 上月总天数<本月日期，比如3月的30日，在2月中没有30
  if (preSize < parseInt(day, 10)) {
      dateObj.last = year + '-' + month + '-01';
      return dateObj;
  }

  if (parseInt(month, 10) <= 10) {
      dateObj.last = year + '-0' + (parseInt(month, 10) - 1) + '-' + day;
      return dateObj;
  } else {
      dateObj.last = year + '-' + (parseInt(month, 10) - 1) + '-' + day;
      return dateObj;
  }

}
