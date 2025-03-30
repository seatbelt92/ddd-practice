# DDD (Domain-Driven Design) 학습 프로젝트

이 프로젝트는 Domain-Driven Design(도메인 주도 설계)을 학습하고 실습하기 위한 레포지토리입니다.

## 프로젝트 구조

```
src/
├── user/          # 사용자 도메인
├── circle/        # 서클 도메인
└── common/        # 공통 모듈
```

## 기술 스택

- TypeScript
- Express.js
- TypeORM
- MySQL
- Jest (테스트)

## 주요 기능

- 사용자 관리
- 서클(그룹) 관리
- 도메인 주도 설계 패턴 적용
    - 엔티티
    - 값 객체
    - 집합
    - 도메인 서비스
    - 리포지토리

## 시작하기

1. 의존성 설치

```bash
npm install
```

2. 환경 변수 설정
   `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.
   DB_HOST=YOUR_HOST
   DB_PORT=YOUR_PORT
   DB_USERNAME=YOUR_NAME
   DB_PASSWORD=YOUR_PWD
   DB_DATABASE=YOUR_DB

## 학습 내용

<도메인 주도 설계 철저 입문> 도서를 토대로 아래 개념들을 학습합니다.

- 엔티티와 값 객체
- 리포지토리 패턴
- 애플리케이션 서비스
- 도메인 서비스
- 의존 관계 제어(tsyringe 활용)
- 트랜잭션(typeorm manager)
- 애그리게이트
- 명세
