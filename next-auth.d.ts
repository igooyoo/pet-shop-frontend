import 'next-auth/jwt';

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    response?: User;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token?: string;
  }

  interface User {
    data?: string;
  }
}
