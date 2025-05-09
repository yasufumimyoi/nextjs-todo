import { GET, POST } from '@/app/auth'

export { GET, POST } 

// 1. 初回ログイン時
const firstCallback = {
    token: {}, // 空のオブジェクト
    user: { id: '123', name: 'John' },
    account: {
      access_token: 'abc123',
      refresh_token: 'xyz789',
      expires_at: 1234567890
    }
  }
  
  // 2. 2回目以降のコール時
  const subsequentCallback = {
    token: {
      accessToken: 'abc123',
      refreshToken: 'xyz789',
      expiresAt: 1234567890,
      userId: '123'
    },
    // user と account は undefined
  }
  
  // 3. トークン更新時
  const refreshCallback = {
    token: {
      accessToken: 'expired_token',
      refreshToken: 'xyz789',
      expiresAt: 1234567890, // 期限切れの時間
      userId: '123'
    }
  }