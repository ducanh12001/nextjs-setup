import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
    id?: string;
  }

  interface Session {
    user: {
      role?: string;
      id?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    id?: string;
  }
}
