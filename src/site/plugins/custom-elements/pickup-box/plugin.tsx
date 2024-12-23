import React, { type FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import { Text, Search } from "@wix/design-system";
import { currentCart } from "@wix/ecom";
import "@wix/design-system/styles.global.css";
import styles from "./plugin.module.css";

type Props = {
  name: string;
};

const CART_REFRESH_INTERVAL_MS = 1000;

const SHIPPING_METHODS = {
  "da321579-ee36-4200-9881-b55bd96060c8": {
    name: "Omniva",
    locations: [
      {
        id: 1,
        value: "Omniva 1",
      },
      {
        id: 2,
        value: "Omniva 2",
      },
      {
        id: 3,
        value: "Omniva 3",
      },
    ],
  },
  "39e7bd30-9c31-464f-8269-cba1da29aa26": {
    name: "DPD",
    locations: [
      {
        id: 1,
        value: "DPD 1",
      },
      {
        id: 2,
        value: "DPD 2",
      },
      {
        id: 3,
        value: "DPD 3",
      },
    ],
  },
};

// To learn more about "Checkout" go to our docs: https://wix.to/FPbvzSu
const CustomElement: FC<Props> = (props) => {
  const [shippingMethodCode, setShippingMethodCode] = useState<string | null>(
    null
  );

  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      const cart = await currentCart.getCurrentCart();
      console.log("Interval returned cart", cart);

      setShippingMethodCode(cart.selectedShippingOption?.code || null);
    }, CART_REFRESH_INTERVAL_MS);

    return () => clearInterval(refreshInterval);
  }, []);

  const shippingMethod =
    SHIPPING_METHODS[shippingMethodCode as keyof typeof SHIPPING_METHODS];

  return (
    <div className={styles.root}>
      <Text>
        {shippingMethod
          ? "Pasirinktas pristatymo būdas: " + shippingMethod.name
          : "Pristatymo būdas nepasirinktas. Pasirinkite pristatymo būdą"}
      </Text>
      {shippingMethod && (
        <Search
          border="standard"
          options={shippingMethod.locations}
          placeholder="Pasirinkite paštomatą"
        />
      )}
    </div>
  );
};

const customElement = reactToWebComponent(
  CustomElement,
  React,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReactDOM as any,
  {
    props: {
      name: "string",
    },
  }
);

export default customElement;
