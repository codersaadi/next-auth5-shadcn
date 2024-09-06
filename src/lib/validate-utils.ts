import * as z from "zod";
type createFormErrorType = <T>(
  validate: z.SafeParseReturnType<T, T>,
  failMessage?: string,
) => { message: string; success: boolean } | void;
export const createFormError: createFormErrorType = (validate, failMessage) => {
  if (!validate.success) {
    return {
      message: validate.error.errors[0].message || failMessage || "",
      success: false,
    };
  }
};
