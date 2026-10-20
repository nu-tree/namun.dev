// 공통 설정을 위한 함수
export const getProviderConfig = (provider: string) => {
  const config: Record<
    string,
    {
      tokenUrl?: string;
      userUrl?: string;
      logoutUrl?: string;
      clientId: string;
      clientSecret: string;
      redirect_uri?: string;
      authorizationUrl?: string;
    }
  > = {
    naver: {
      tokenUrl: 'https://nid.naver.com/oauth2.0/token',
      userUrl: 'https://openapi.naver.com/v1/nid/me',
      logoutUrl: 'https://nid.naver.com/oauth2.0/logout',
      clientId: process.env.NAVER_CLIENT_ID! || 'clientId',
      clientSecret: process.env.NAVER_CLIENT_SECRET! || 'clientSecret',
      redirect_uri: `${process.env.BASE_URL}/api/auth/callback/naver`,
      authorizationUrl: 'https://nid.naver.com/oauth2.0/authorize',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID! || 'clientId',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! || 'clientSecret',
      redirect_uri: `${process.env.BASE_URL}/api/auth/callback/google`,
    },
    kakao: {
      tokenUrl: 'https://kauth.kakao.com/oauth/token',
      userUrl: 'https://kapi.kakao.com/v2/user/me',
      logoutUrl: 'https://kapi.kakao.com/v1/user/logout',
      clientId: process.env.KAKAO_CLIENT_ID! || 'clientId',
      clientSecret: process.env.KAKAO_CLIENT_SECRET! || 'clientSecret',
      redirect_uri: `${process.env.BASE_URL}/api/auth/callback/kakao`,
      authorizationUrl: 'https://kauth.kakao.com/oauth/authorize',
    },
  };

  return config[provider];
};
