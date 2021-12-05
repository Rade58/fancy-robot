export const PRODUCTS_PER_PAGE = 16;

export const NAV_UNAUTH_HISTORY = "NAV_UNAUTH_HISTORY";

const basePath = process.env.NEXTAUTH_URL as string;

/**
 * @description root part of absolute path for authorized/aUTHENTICATED pages
 * using this as a part of the argument to the signIn FUNCTION
 * whee we are defining navigation aftes successful signin
 */
export const authorizedPathsRoots = {
  profile: `${basePath}/profile/`,
  admin: `${basePath}/admin/`,
  order: `${basePath}/order/`,
};

export const consistantNavList = [
  // { href: "/signin", name: "Sign In" },
  // { href: "/admin", name: "Admin" },
  // FOR TRYOUT AND TESTING
  // { href: "/profile/1234", name: "Profile" },
  // { href: "/hello-world", name: "Hello World" },
  // { href: "/foobar/foo/bar/baz", name: "Baz Bar" },
];

export const FALLBACK_PHOTO = "https://placeimg.com/640/480/product";
