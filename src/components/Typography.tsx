import React from "react";
import { Text as RNText } from "react-native";
import PropTypes from "prop-types";

const Typography: React.FC<{
  color?: string;
  fontSize?: number;
  numberOfLines?: number;
  children?: React.ReactElement | string | React.ReactElement[];
}> = (props) => {
  return (
    <RNText
      style={{ color: props.color, fontSize: props.fontSize }}
      numberOfLines={props.numberOfLines}
    >
      {props.children}
    </RNText>
  );
};

// Typography.propTypes = {
//     color: PropTypes.string,
//     fontSize: PropTypes.number.isRequired,
// };

export default Typography;
