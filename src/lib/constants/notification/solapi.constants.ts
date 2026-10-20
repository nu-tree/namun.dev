import z from 'zod';

const Schema = z.object({
  apiKey: z.coerce.string({ message: 'SOLAPI_API_KEY 환경변수가 설정되지 않았습니다.' }),
  apiSecret: z.coerce.string({ message: 'SOLAPI_SECRET 환경변수가 설정되지 않았습니다.' }),
  channelId: z.coerce.string({ message: 'SOLAPI_CHANNEL_ID 환경변수가 설정되지 않았습니다.' }),
  sender: z.coerce.string({ message: 'SOLAPI_SENDER 환경변수가 설정되지 않았습니다.' }),
  pfId: z.coerce.string({ message: 'SOLAPI_KAKAO_PFID 환경변수가 설정되지 않았습니다.' }),
});

export const SolapiConstants = Schema.parse({
  apiKey: process.env.SOLAPI_API_KEY,
  apiSecret: process.env.SOLAPI_SECRET,
  channelId: process.env.SOLAPI_CHANNEL_ID,
  sender: process.env.SOLAPI_SENDER || '0537194925',
  pfId: process.env.SOLAPI_KAKAO_PFID || '',
});

export const SolapiTemplateIds = {
  event_group_change: 'KA01TP251217010149212KFeCx21oy3k', // 행사 그룹 변경 알림
  certification: 'KA01TP251212011152218COedEFe3QOJ', // 본인인증
  // signup: 'KA01TP251121091346653za72bEkO5LY', // 회원가입
  event_application_complete: 'KA01TP251212010841746Fmogn0SYCxv', // 행사 신청 완료
  event_application_cancel: 'KA01TP251212011122148lD8ntckFHGo', // 행사 취소 완료
  event_application_cancel_by_channel: 'KA01TP2512120127080739zGxUwxhn9i', // 행사 채널에 의해 취소 완료
  // event_schedule_3days: 'KA01TP2511210925316374CKtKrwrfo6', // 행사 일정안내(3일전)
  event_schedule_dday: 'KA01TP251212010957651o2ytCi763qs', // 행사 일정안내(당일)
  event_complete: 'KA01TP251212003613101M6auZ4yyZIt', // 행사완료, 후기작성 안내
} as const;
