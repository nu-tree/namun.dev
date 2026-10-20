import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { genericOAuth, organization, phoneNumber } from 'better-auth/plugins';
import { getProviderConfig } from './setting/oauth-provier/get-provider-config';
import { prisma } from './setting/prisma/prisma.server';
import { BcryptHasher } from './utils/bcrypt-hasher';
import { admin } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { ac, admin as adminRole, member, owner } from './auth/permissions';
import { sendEmailUtil, sendSMSUtil } from './utils/notification-utils';

const naverConfig = getProviderConfig('naver');
const googleConfig = getProviderConfig('google');
const kakaoConfig = getProviderConfig('kakao');

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  account: {
    accountLinking: { enabled: true, allowDifferentEmails: true },
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await prisma.member.findFirst({
            select: { organizationId: true },
            where: { userId: session.userId },
          });

          return {
            data: {
              ...session,
              activeOrganizationId: organization?.organizationId || null,
            },
          };
        },
      },
    },
    user: {
      create: {
        after: async (user) => {
          // 첫 번째 사용자인지 확인
          const userCount = await prisma.user.count();

          if (userCount === 1) {
            // 첫 사용자를 admin role로 업데이트
            await prisma.user.update({
              where: { id: user.id },
              data: { role: 'admin' },
            });
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
    password: {
      hash(password) {
        return BcryptHasher.hash(password);
      },
      verify(data) {
        return BcryptHasher.compare(data.password, data.hash);
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailUtil({
        email: user.email,
        template: 'email-verification',
        emailTemplateProps: { url: `${url}` },
      });
    },
    expiresIn: 60 * 60 * 24, // 24시간
  },
  socialProviders: {
    google: {
      clientId: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      redirectURI: googleConfig.redirect_uri,
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: 'naver',
          clientId: naverConfig.clientId,
          authorizationUrl: naverConfig.authorizationUrl,
          tokenUrl: naverConfig.tokenUrl,
          clientSecret: naverConfig.clientSecret,
          userInfoUrl: naverConfig.userUrl,
          authorizationUrlParams: {
            response_type: 'code',
            redirect_uri: naverConfig.redirect_uri as string,
          },
          getUserInfo: async (tokens) => {
            const response = await fetch(naverConfig.userUrl as string, {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            });
            const data = await response.json();

            return {
              id: data.response.id,
              name: data.response.name || 'NONE',
              email: `${data.response.id}@naver.com`,
            };
          },
        },
        {
          providerId: 'kakao',
          clientId: kakaoConfig.clientId,
          authorizationUrl: kakaoConfig.authorizationUrl,
          tokenUrl: kakaoConfig.tokenUrl,
          clientSecret: kakaoConfig.clientSecret,
          userInfoUrl: kakaoConfig.userUrl,
          authorizationUrlParams: {
            response_type: 'code',
            redirect_uri: kakaoConfig.redirect_uri as string,
          },
          getUserInfo: async (tokens): Promise<any> => {
            const response = await fetch(kakaoConfig.userUrl as string, {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            });
            const data = await response.json();

            return {
              id: `${data.id}`,
              name: data?.kakao_account?.profile?.nickname || 'NONE',
              email: data?.kakao_account?.email || `${data.id}@kakao.com`,
            };
          },
        },
      ],
    }),
    admin({
      defaultRole: 'user',
    }),
    nextCookies(),
    organization({
      ac,
      roles: {
        owner,
        admin: adminRole,
        member,
      },
    }),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        const res = await sendSMSUtil(phoneNumber, `[Wefactory] 인증번호는 [${code}]입니다.`);
        console.log('문자 전송:', res);
      },
    }),
  ],
  user: {
    additionalFields: {
      phoneNumber: {
        required: false,
        type: 'string',
      },
      phoneNumberVerified: {
        required: false,
        type: 'boolean',
        default: false,
      },
    },
  },
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session;

export type AuthType = {
  user: User | null;
  session: typeof auth.$Infer.Session.session | null;
};
