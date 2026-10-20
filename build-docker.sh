#!/bin/bash

# SBOEdu Docker Build Script
# .env 파일의 환경변수를 읽어서 Docker 이미지를 빌드합니다.

set -e  # 오류 발생 시 스크립트 종료

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수들
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# .env 파일 존재 확인
if [ ! -f ".env.docker" ]; then
    log_error ".env.docker 파일이 존재하지 않습니다."
    log_info ".env.example 파일을 참고하여 .env.docker 파일을 생성해주세요."
    exit 1
fi

# 필수 환경변수 확인
log_info "필수 환경변수 확인 중..."

# .env.docker에서 IMAGE_NAME과 IMAGE_TAG 확인
if ! grep -q "^IMAGE_NAME=" .env.docker; then
    log_error "IMAGE_NAME이 .env.docker 파일에 정의되지 않았습니다."
    log_info "예시: IMAGE_NAME=app"
    exit 1
fi


log_info "환경변수 파일 로드 중..."

# .env 파일에서 환경변수 읽기
source .env.docker

log_info "Docker 이미지 빌드 시작..."

# 기본 이미지명과 태그 설정
IMAGE_NAME=${IMAGE_NAME}
IMAGE_TAG=${IMAGE_TAG:-"latest"}
FULL_IMAGE_NAME="${IMAGE_NAME}:${IMAGE_TAG}"

log_info "이미지명: ${FULL_IMAGE_NAME}"

# Docker 빌드 명령어 실행
docker build \
    --no-cache \
    --build-arg BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET} \
    --build-arg RESEND_API_KEY=${RESEND_API_KEY} \
    -t "${FULL_IMAGE_NAME}" \
    .

# 빌드 후 캐시 정리
docker system prune -f

# 빌드 성공 확인
if [ $? -eq 0 ]; then
    log_success "Docker 이미지 빌드가 완료되었습니다!"
    log_info "이미지명: ${FULL_IMAGE_NAME}"

    # 이미지 크기 표시
    IMAGE_SIZE=$(docker images --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}" | grep "${FULL_IMAGE_NAME}" | awk '{print $2}')
    log_info "이미지 크기: ${IMAGE_SIZE}"

    echo
    log_info "컨테이너 실행 방법:"
    echo "docker run -d -p ${DOCKER_PORT:-"3000"}:3000 --env-file .env.docker --name ${IMAGE_NAME}-container ${FULL_IMAGE_NAME}"
    echo
    log_info "컨테이너 로그 확인:"
    echo "docker logs -f ${IMAGE_NAME}-container"
    echo
    log_info "컨테이너 중지 및 제거:"
    echo "docker stop ${IMAGE_NAME}-container && docker rm ${IMAGE_NAME}-container"

else
    log_error "Docker 이미지 빌드에 실패했습니다."
    exit 1
fi