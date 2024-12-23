import React, { type FC } from "react";
import { dashboard } from "@wix/dashboard";
import { Button, Page, WixDesignSystemProvider } from "@wix/design-system";
import * as Icons from "@wix/wix-ui-icons-common";
import SitePluginConfig from "../../site/plugins/custom-elements/pickup-box/plugin.json";
import "@wix/design-system/styles.global.css";

const Index: FC = () => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="Dashboard Page"
          subtitle="Add management capabilities to your app."
        />
        <Page.Content>
          <Button
            onClick={() => {
              dashboard.addSitePlugin(SitePluginConfig.id, {
                placement: SitePluginConfig.placements[0],
              });
            }}
            prefixIcon={<Icons.GetStarted />}
          >
            Įjungti paštomatų integraciją
          </Button>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default Index;
