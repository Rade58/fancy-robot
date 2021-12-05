import { useSession } from "next-auth/react";

// todo use useEffect here and useState (MAYBE NOT)

const useProfileMenuData = () => {
  //
  const { data, status } = useSession();

  // console.log({ data, status });

  if (status === "unauthenticated") {
    return null;
  }

  if (!data) {
    return null;
  }

  const { profile, user } = data;

  if (profile === undefined && user === undefined) {
    return null;
  }

  const id = profile?.id;

  if (!id) {
    return null;
  }

  let nameDerivedFromEmail;

  if (user?.email) {
    //
    nameDerivedFromEmail = user.email.slice(0, user.email.indexOf("@") + 1);
    //
  }

  let name =
    (user?.name || profile?.nick || "Profile ").slice(
      0,
      (user?.name || profile?.nick || "Profile ").indexOf(" ") + 1
    ) ||
    user?.name ||
    profile?.nick ||
    undefined;

  if (name === undefined || name === "Profile") {
    // console.log(user?.email);

    if (user?.email) {
      name = user.email.slice(0, user.email.indexOf("@"));
    }
  }

  // console.log({ name });

  const email = user?.email || undefined;
  const image =
    user?.image ||
    profile?.image ||
    "https://source.unsplash.com/600x600/?avatar";

  if (nameDerivedFromEmail && !name) {
    name = nameDerivedFromEmail;
  }

  if (nameDerivedFromEmail && name === "Profile") {
    name = nameDerivedFromEmail;
  }

  if (!name) {
    name = "My Profile";
  }

  /*  let shorterEmail;
  
  if(email && email.length > ){
    shorterEmail = email.slice(0)
  } */

  const role = profile.role;

  return { name, email, image, id, role, authStatus: status };
};

export default useProfileMenuData;
