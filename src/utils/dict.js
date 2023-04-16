// 创建字典
const createDict = function (arr) {
  return {
    enum: Object.fromEntries(arr.map(({ alias, value }) => [alias, value])),
    options: arr.map(({ label, value }) => ({ label, value })),
  };
};

// 性别
export const gender = createDict([
  { label: "男", value: 1, alias: "MALE" },
  { label: "女", value: 2, alias: "FEMALE" },
]);

const dict = {
  gender,
};

export default dict;
