import React from "react";
import { storiesOf } from "@storybook/react";
import PropTypes from "prop-types";
import "./color.css";

export const Colors = ({
  backgroundColor,
  backgroundImage,
  boxShadow,
  name
}) => {
  return (
    <div style={{ margin: "0 10px 0 10px" }}>
      <div
        style={{
          width: "128px",
          height: "128px",
          borderRadius: "3px",
          backgroundColor: backgroundColor,
          backgroundImage: backgroundImage,
          boxShadow: boxShadow
        }}
      />
      <p
        style={{
          fontFamily: "Open Sans",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        {name}
      </p>
    </div>
  );
};

storiesOf("Colors", module)
  .add("Branding Primary", () => (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0 auto", display: "flex" }}>
        <Colors
          backgroundColor="var(--color_primary-dark)"
          name="primary-dark"
        />
        <Colors
          backgroundImage="var(--color_primary-gradient)"
          name="primary-gradient"
        />
        <Colors
          backgroundColor="var(--color_primary-light)"
          name="primary-light"
        />
      </div>
    </div>
  ))
  .add("Branding Secondary", () => (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0 auto", display: "flex" }}>
        <Colors backgroundColor="var(--color_warm)" name="warm" />
        <Colors backgroundColor="var(--color_secondary)" name="secondary" />
      </div>
    </div>
  ))
  .add("Neutral", () => (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0 auto", display: "flex" }}>
        <Colors backgroundColor="var(--color_neutral)" name="neutral" />
        <Colors backgroundColor="var(--color_disabled)" name="disabled" />
      </div>
    </div>
  ));

Colors.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  boxShadow: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
