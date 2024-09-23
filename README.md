<h1 align="center">KYSA24 SNS mate 앱</h1>
<p align="center">
<img alt="Version Badge" src="https://img.shields.io/badge/version-1.0-teal">
<img alt="Node Badge" src="https://img.shields.io/badge/node-%5E20.12-blue?logo=nodedotjs">
<img alt="Yarn Badge" src="https://img.shields.io/badge/yarn-1.22-blue?logo=yarn">
<img alt="License Badge" src="https://img.shields.io/badge/license-MIT-greenyellow">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/JunhaDex/kysa24-client-sns">
</p>

## 개요

이 프로젝트는 2024 KYSA 대회를 위한 SNS 앱, mate 일부로써, 해당 레포지토리에는 프론트엔드 소스코드가 포함되어 있습니다. Vue.js 3.0 프레임워크 및 Typescript, Firebase 를
사용하여 온전한 PWA로 구축된 이 앱은, 스토어를 통한 다운로드 없이도 다양한 운영체제를 지닌 기기 전반에 걸쳐 원활한 엑세스를 제공합니다. 주요 기능으로는 실시간 채팅, 그룹 기반 상호 작용, 참가자 정보 조회
등이 있습니다. 이 앱은 대회 참가자들 사이에 온라인 커뮤니케이션을 활성화하고, 비슷한 관심사를 가진 사람을 만나며, 대회 기간 이후에도 지속적인 네트워킹을 가능하게 하여 사용자들의 청년대회 참가 경험을
향상하는 데 목적을 두고 있습니다.

## 사전 요구사항

### System Requirement

- 🟩 **Node v20.12** (latest)
- 🐱 **Yarn v1.22.22**
- 🌐 **크롬 웹 브라우저**
- 🔥 **Firebase (호스팅, 메세지)**
- 📝 **Visual Studio Code** (코드 수정을 위한 텍스트 에디터, IDE)
- **git** (latest)
- **WSL 2** (Windows 운영체제의 경우)

## Quick Start

### 로컬 개발환경 구성

**Step 1. 프로젝트 Clone 및 패키지 설치**</br>

```shell
git clone https://github.com/JunhaDex/kysa24-client-sns.git
cd ./kysa24-client-sns
yarn
code . // open text editor (optional)
```

**Step 2. 환경설정 파일 구성 및 개발환경 실행**</br>

```shell
touch .env
yarn dev // 개발서버 실행
```

```text
# .env 파일 예시
VITE_API_BASE_URL=<API 서버 주소>
VITE_API_WS_URL=<소켓 서버 주소_wss, ws 프로토콜>
```

이후 http://localhost:8080 에서 프론트를 확인할 수 있습니다.

### 배포하기

```shell
firebase login
firebase init hosting
```

파이어베이스 로그인 후 프로젝트를 설정합니다.

```shell
yarn build
git checkout HEAD -- firebase.json // (optional)
firebase deploy --only hosting
```

프로젝트를 빌드한 다음, 파이어베이스에 배포합니다.

(optional): firebase.json 이 init 에 의해 변경된 경우, 이전 상태로 되돌립니다.

이후 파이어베이스의 가이드에 따라 SPA 사이트 배포를 확인합니다.

## 기술 스텍

<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117448124-a2da9800-af3e-11eb-85d2-bd1b69b65603.png" alt="Vue.js" title="Vue.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
	<code><img width="50" src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" alt="Vite" title="Vite"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/189716855-2c69ca7a-5149-4647-936d-780610911353.png" alt="Firebase" title="Firebase"/></code>
	<code><img width="50" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/pwa-icon.png" alt="PWA" title="PWA"/></code>
</div>

Vue3.js 3.0 프레임워크 기반의 SPA 웹 어플리케이션 입니다. Tailwind 및 Daisy UI 를 커스터마이징하여 클래스 기반 스타일링을 지원합니다. Firebase 를 통해 호스팅 되었습니다.

## 기능 정의

### 1. PWA 지원 및 Firebase Message 를 통한 모바일 푸시 알림

- PWA 지원: 기기에서 브라우저를 통해 PWA 앱을 설치할 수 있습니다. 별도의 서비스워커가 백그라운드에서 Firebase 메세지를 수신하고 푸시알림을
  생성합니다. (`./src/firebase-messaging-sw.ts` 참조)

### 2. 실시간 채팅 및 관심보내기

- 실시간 채팅: 웹소켓 통신을 통한 실시간 채팅을 지원합니다. (`./src/pages/chat/Detail.vue` 참조)
- 관심보내기: 사용자는 다른 사용자에게 관심을 보낼 수 있습니다. 실시간 채팅의 구조화된 메세지로 전달되며 사용자는 관심에 답할 수 있습니다. 하루에 10번의 이용제한이 있습니다.

### 3. 인증

- 로그인 / 로그아웃: 사전에 생성된 ID / PW 를 통해 한정된 그룹안에서만 사용이 가능합니다. 로그인정보는 로컬스토리지에 저장됩니다. (`./src/pages/Login.vue` 참조)

### 4. 개인화

- 프로필: 프로필을 통해 사용자의 정보를 확인할 수 있습니다. (`./src/pages/user/Detail.vue` 참조)
- 개인설정: 사용자는 자신의 소개, 관심사, 프로필 / 커버 사진 및 비밀번호를 변경할 수 있습니다. (`./src/pages/user/Update.vue` 참조)
- 알림: 사용자는 자신 및 그룹에 대한 알림을 수신할 수 있습니다.

### 5. 그룹 피드 및 유저 상호작용

- 그룹 생성: 사용자는 자유롭게 그룹을 생성할 수 있습니다. (`./src/pages/group/New.vue` 참조)
- 그룹 팔로우: 사용자는 참여하고 싶은 그룹을 팔로우 할 수 있습니다. 홈 화면 그룹 목록 및 그룹상세 페이지를 통해 그룹을 팔로우 합니다.
- 그룹 게시글 작성: 그룹을 팔로우하고 나면 자유롭게 그룹에 게시글을 작성할 수 있습니다. 게시물 활동이 활발한 그룹은 홈 화면 상단에 노출됩니다.
- 게시글 댓글 작성: 게시글에 댓글을 작성할 수 있습니다. (`./src/pages/post/Detail.vue` 참조)
- 게시글 사진 업로드: 게시글 작성시 사진을 함께 첨부할 수 있습니다 (최대 1장) (`./src/group/Feed.vue` 참조)

### 6. 참가자 목록 확인하기

- 전체 참가자 목록을 통해 대회 참가자들의 목록을 볼 수 있습니다.
- 전체 참가자 목록에서 사용자의 이름 혹은 소속 조 정보를 가지고 검색할 수 있습니다. (`./src/pages/user/List.vue` 참조)

## Licenses

### Project

MIT License, see [LICENSE](./LICENSE).

### 리소스 및 라이브러리

- [Basil Icons](https://craftwork.design/downloads/basil/): 상업적 무료 이용
- [Heroicons](https://github.com/tailwindlabs/heroicons): MIT 라이센스

## 참고 문서

- 파이어베이스 호스팅: [링크](https://firebase.google.com/docs/hosting/quickstart)
- Daisy UI 관련문서: [링크](https://daisyui.com/docs/customize/) (버전 4 참조)

---
<div align="center"> developed with ❤️ by JunhaDex </div>
