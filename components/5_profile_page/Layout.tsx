/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

import type { PropsI } from "@/pages/profile/[profileId]";

import ProfileView from "../profile/ProfileView";

const Layout: FC<PropsI> = ({
  children,
  fulfilledOrdersCount,
  profile,
  favoritesCount,
}) => {
  return (
    <main>
      <ProfileView
        favoritesCount={favoritesCount}
        profile={profile}
        fulfilledOrdersCount={fulfilledOrdersCount}
      />
      {/*  */}
      {children}
      {/*  */}
    </main>
  );
};

export default Layout;
