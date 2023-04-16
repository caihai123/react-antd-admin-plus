import PropTypes from "prop-types";
import { Select } from "antd";
import dict from "@/utils/dict";

const DictSelect = function (props) {
  const { dictName, placeholder = "请选择", ...rest } = props;

  return (
    <Select
      options={dict[dictName].options}
      placeholder={placeholder}
      {...rest}
    />
  );
};

DictSelect.propTypes = {
  dictName: PropTypes.string.isRequired,
};

export default DictSelect;
