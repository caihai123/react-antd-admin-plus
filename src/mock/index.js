import Mock from "mockjs";

import login from "./login";
import role from "./premis/role";
import account from "./premis/account";

const mock = [...login, ...role, ...account];

mock.forEach(({ url, type, handler }) => {
  Mock.mock(url, type, function (...params) {
    const result = handler(...params);
    setTimeout(
      console.log.bind(
        console,
        {
          url,
          type,
          result,
        },
        "mockjs"
      )
    );
    return result;
  });
});
