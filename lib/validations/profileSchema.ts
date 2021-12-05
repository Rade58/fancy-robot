import { object, string, TypeOf } from "yup";

// const profileSchema = object()
const profileSchema = object({
  // I DON'T NEED PROFIE ID HERE BUT I'M SETTING
  // THIS JUST TO HAVE SOMETHING THAT IS REQUIRED (JUST TO TRY IT OUT)
  // profileId: string().required(),
  nick: string()
    .optional()
    .trim()
    .min(2, "name must contain at least 2 characters")
    .max(52, "name can't be more than 52 characters long"),
  email: string()
    .optional()
    .trim()
    .email("invalid email")
    .min(8, "email must contain at least 8 characters")
    .max(52, "email can't be more than 52 characters long"),
  streetAddress: string()
    .optional()
    .trim()
    // .min(2, "streetAddress needs to have at least 2 characters")
    .max(76, "streetAddress's maximum is 76 characters"),
  city: string()
    .optional()
    .trim()
    // .min(2, "city needs to have at least 2 characters")
    .max(46, "city's maximum is 46 characters"),
  postalCode: string()
    .optional()
    .trim()
    // .min(2, "zip code minimum is 2 characters")
    .max(20, "zip code can't be more than 20 characters long"),
  country: string()
    .optional()
    .trim()
    // .min(2, "country minimum is 2 characters")
    .max(46, "country can't be more than 46 characters long"),
  regionOrState: string()
    .optional()
    .trim()
    // .min(4, "state must be at leasr 4 characters long")
    .max(46, "state can't be more than 46 characters long"),
});
// .required();

export type ProfileDataType = TypeOf<typeof profileSchema>;

export default profileSchema;
