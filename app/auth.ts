import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'

// トークンの型定義
interface CustomToken extends JWT {
  accessToken?: string
  refreshToken?: string
  expiresAt?: number
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // 初回ログイン時
      if (account && user) {
        // ここで外部APIを呼び出してトークンを取得
        // const response = await fetch('your-api-endpoint', {
        //   method: 'POST',
        //   body: JSON.stringify({ /* 必要なデータ */ }),
        // })
        // const data = await response.json()

        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
          userId: user.id,
        }
      }

      // アクセストークンの有効期限チェック
      if (token.expiresAt && Date.now() < token.expiresAt * 1000) {
        return token
      }

      // トークンの更新
      // refreshTokenを使用して新しいアクセストークンを取得
      // const response = await fetch('your-refresh-token-endpoint', {
      //   method: 'POST',
      //   body: JSON.stringify({ refreshToken: token.refreshToken }),
      // })
      // const data = await response.json()

      if (!response.ok) {
        // リフレッシュトークンが無効な場合
        return {
          ...token,
          error: 'RefreshTokenError',
        }
      }
      return {
        ...token,
        // accessToken: data.accessToken,
        // expiresAt: data.expiresAt,
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        userId: token.userId,
      }
    },
  },
}) 