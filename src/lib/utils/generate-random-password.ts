export function generateRandomPassword(maxLength: number = 12): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '@$!%*?&';

  const pick = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

  // maxlength 보정
  const safeMax = maxLength < 7 ? 12 : maxLength;

  // 실제 비밀번호 길이: 7 ~ safeMax
  const length = Math.floor(Math.random() * (safeMax - 7 + 1)) + 7;

  // 특수문자는 무조건 1개
  const symbolChar = pick(symbols);

  // 기본 구성: 영대문자 + 영소문자 + 숫자
  const passwordChars: string[] = [pick(uppercase), pick(lowercase), pick(numbers)];

  // 남은 길이는 영소문자 / 숫자로 채움
  while (passwordChars.length < length - 1) {
    passwordChars.push(Math.random() < 0.5 ? pick(lowercase) : pick(numbers));
  }

  // 마지막에 특수문자 1개 추가
  passwordChars.push(symbolChar);

  return passwordChars.join('');
}
