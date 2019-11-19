//eslint-disable-next-line import/no-unassigned-import
import "date-fns";

export default function emailCheck(emailAddress: string): boolean {
    /* Check that email address and the password are valid */
    const expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(emailAddress);
}
