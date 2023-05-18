

# 🌳 Forest - 온라인 학습지 통합 관리 서비스 🌲

![Untitled](/uploads/c4a7728a6eda9a17b7f1c578366898cb/Untitled.png)

## 🌳 지금 체험하기 : [https://edu-forest.com](https://edu-forest.com/)

[](https://edu-forest.com/)

## 🎥 소개 영상 보기 : UCC 링크

# 🌳 실행 (포팅매뉴얼 링크)

# 🌳 **프로젝트 일정**

### 📅 **2023-04-10(월) ~ 2023-05-19(금) (6주)**

# 🌳 소개

![캡처_2023_05_17_13_03_04_157](/uploads/60968e581529712ec0ccb4f69f6542fa/캡처_2023_05_17_13_03_04_157.png)

![캡처_2023_05_17_13_03_10_297](/uploads/b0bcfada1c2b0513bf6fbd68f2c2ae8e/캡처_2023_05_17_13_03_10_297.png)

![캡처_2023_05_17_13_03_18_261](/uploads/5baf53c5d0487db2573de631ccdc9ede/캡처_2023_05_17_13_03_18_261.png)

![캡처_2023_05_17_13_03_25_173](/uploads/b1ee8fae3f84bebdcb499a895ee1a197/캡처_2023_05_17_13_03_25_173.png)

현대 교육은 디지털 기술의 발전과 함께 많은 변화를 겪고 있습니다.

특히, 온라인 학습은 교육의 패러다임을 바꾸며 학습 방식과 환경을 혁신하고 있습니다. 

이에 따라 학생과 선생님 모두에게 효과적인 학습 도구와 플랫폼이 필요하게 되었습니다.

Forest는 이러한 변화에 발맞춰 개발된 온라인 학습 플랫폼입니다. 

학생들이 온라인 상에서 학습을 진행하고 성적을 분석하여 개인의 학습 상태를 파악할 수 있는 기능을 제공합니다. 

또한, 선생님들은 커스텀 학습지를 만들고 배포하여 학생들의 학습을 관리할 수 있습니다.

**온라인 학습지 Forest로 더 효과적인 학습을 경험해 보세요!**

### 🎁 기대효과

![캡처_2023_05_17_13_07_07_653](/uploads/5eddc80915707701f203fc1afe3bf8b8/캡처_2023_05_17_13_07_07_653.png)


# 🌳 Forest 기능

Forest는 온라인 학습을 보다 효과적으로 진행할 수 있는 다양한 기능들을 제공합니다. 

지금 Forest와 함께 학습의 경험을 한 단계 높여보세요!

## 👩‍🏫 선생님 👨‍🏫

- **나만의 커스텀 학습지**를 만들 수 있습니다.
- 클래스 내 학생들을 위해 학습지를 **배포**하고 **관리**할 수 있습니다.
- 학습에 응시한 학생들의 결과표를 **분석**하고 시각화하여 보여줍니다.
- 내가 갖고 있는 기존 학습지 PDF를 Forest에 넣고 싶다면? **OCR**을 이용해 보세요.

## 👩‍💻 학생 👨‍💻

- 배포된 학습지를 이용하여 시험에 응시 가능합니다.
- 시험을 보면서 실시간으로 **필기 가능한 캔버스** 기능을 제공합니다.
- 시험 종료 시 **자동 채점**이 이루어 집니다.
- **나의 학습 결과 분석표**를 확인해 보세요!

# 🌳 개발 환경

## 🤖 프론트엔드

- Next.js 13.3.0
- React 18.2.0
- React-query 3.39.3
- Redux 4.2.1
- Styled-components 5.3.9
- TypeScript 5.0.4

## 🍭 백엔드

- openJDK 11.0.18
- SpringBoot 2.7.10
- Spring Swagger: 2.9.2
- queryDSL: 5.0.0
- Flask 2.3.2
- Werkzeug 2.3.3

## 💽 DB

- MySQL: 8.0.31
- MongoDB : 4.4

## 🚋인프라

- Ubuntu 20.04
- docker 23.0.1
- docker-compose 1.29.2
- Jenkins 2.387.1

# 🌳 산출물

## CI/CD

![Untitled__8_](/uploads/3412b9b0e230d443a712277081b7a7a5/Untitled__8_.png)

## 아키텍처

![Untitled_2](/uploads/dac28a2f230142ce96173cd0d9aa9f43/Untitled_2.png)

## 와이어프레임

![선생님.PNG](/uploads/0f435432f36e1c8e4236fe50213d24a6/선생님.PNG.png)

![학생.PNG](/uploads/869da84f47bec8807adf313c93b677d6/학생.PNG.png)

## ERD

- ERD
    
    ![Forest_ERD](/uploads/ec4ac021c2e90ab56dd4cf7b51539587/Forest_ERD.png)
    

## 기능 명세서

- 기능 명세
    
    ![기능명세](/uploads/fc95fa72e365281afe64ddd9c48c1546/기능명세.png)
    

## API 명세서

- API 명세서
    
    ![api](/uploads/4c97586e3be8aeb4fe25ffdf81556234/api.png)
    

# 📁 프로젝트 구조

## 🌳 Backend

### Forest-Auth, Workbook, Study

```solidity
📦forest-auth
 ┣ 📂.gradle
 ┣ 📂.idea
 ┣ 📂gradle
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂ssafy
 ┃ ┃ ┃ ┃ ┃ ┗ 📂forestauth
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂classes
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂memo
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂msg
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂enumeration
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂util
 ┃ ┃ ┗ 📂resources
 ┣ 📜.gitignore
 ┣ 📜build.gradle
 ┣ 📜docker-compose.yml
 ┣ 📜Dockerfile
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┗ 📜settings.gradle

```

### Flask

```solidity
📦forest-flask
 ┣ 📂.idea
 ┃ ┣ 📂inspectionProfiles
 ┣ 📂venv
 ┃ ┣ 📂Lib
 ┃ ┣ 📂Scripts
 ┣ 📜app.py
 ┣ 📜docker-compose.yml
 ┣ 📜Dockerfile
 ┗ 📜requirements.txt
```

## 🌳  Frontend

```solidity
📦forest-front
 ┣ 📂public
 ┃ ┣ 📂fonts
 ┃ ┣ 📂icons
 ┃ ┣ 📂images
 ┃ ┣ 📂lottieJson
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂canvas
 ┃ ┃ ┣ 📂class
 ┃ ┃ ┃ ┣ 📂analysis
 ┃ ┃ ┃ ┣ 📂student
 ┃ ┃ ┃ ┣ 📂teacher
 ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📂editor
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┣ 📂study
 ┃ ┃ ┣ 📂workbook
 ┃ ┃ ┗ 📂workbookDetail
 ┃ ┣ 📂assets
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Arrow
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┣ 📂Card
 ┃ ┃ ┣ 📂HashTag
 ┃ ┃ ┣ 📂Input
 ┃ ┃ ┣ 📂Label
 ┃ ┃ ┣ 📂Loading
 ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂Nav
 ┃ ┃ ┣ 📂Question
 ┃ ┃ ┣ 📂Spinner
 ┃ ┃ ┣ 📂Status
 ┃ ┃ ┣ 📂Tab
 ┃ ┃ ┣ 📂Toast
 ┃ ┃ ┗ 📂Workbook
 ┃ ┣ 📂constants
 ┃ ┣ 📂enum
 ┃ ┣ 📂features
 ┃ ┃ ┣ 📂canvas
 ┃ ┃ ┣ 📂class
 ┃ ┃ ┃ ┣ 📂analysis
 ┃ ┃ ┃ ┣ 📂student
 ┃ ┃ ┃ ┣ 📂teacher
 ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┃ ┣ 📂student
 ┃ ┃ ┃ ┣ 📂teacher
 ┃ ┃ ┣ 📂editor
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂mobile
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┣ 📂signup
 ┃ ┃ ┣ 📂test
 ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📂index
 ┃ ┃ ┃ ┣ 📂info
 ┃ ┃ ┃ ┗ 📂result
 ┃ ┃ ┣ 📂workbook
 ┃ ┃ ┗ 📂workbookDetail
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📂editor
 ┃ ┣ 📂lib
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂editor
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂mobile
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┣ 📂signup
 ┃ ┃ ┃ ┣ 📂more-info
 ┃ ┃ ┣ 📂student
 ┃ ┃ ┃ ┣ 📂class
 ┃ ┃ ┃ ┗ 📂dashboard
 ┃ ┃ ┣ 📂teacher
 ┃ ┃ ┃ ┣ 📂class
 ┃ ┃ ┃ ┃ ┣ 📂study
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┗ 📂dashboard
 ┃ ┃ ┣ 📂test
 ┃ ┃ ┃ ┗ 📂[studyId]
 ┃ ┃ ┣ 📂workbook
 ┃ ┣ 📂stores
 ┃ ┃ ┣ 📂class
 ┃ ┃ ┣ 📂editor
 ┃ ┃ ┣ 📂exam
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┣ 📂workbookDetail
 ┃ ┣ 📂styles
 ┃ ┣ 📂types
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂customAxios
 ┣ 📜.babelrc
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.json
 ┣ 📜Dockerfile
 ┣ 📜Jenkinsfile
 ┣ 📜next.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜server.js
 ┗ 📜tsconfig.json

```

# 🌳 협업 환경

- Gitlab
    - 원격 저장소
    - 코드 버전 관리
- Mattermost
    - Mattermost를 이용하여 error log관리
    - 팀원 모두가 편하게 에러 체크 가능
        
        ![Untitled__7_](/uploads/c8601cb3716f92b508a68a6d101069fc/Untitled__7_.png)
        

- JIRA
    - Epic, Story 지정해서 매주 Sprint 진행
- 회의
    - 매주 일요일 오후 9시 Discord 팀 회의 진행
    - 필요 시 프론트, 백엔드 회의 진행
    - 매일 아침 팀 전체 데일리스크럼 진행 (당일 목표 작업 브리핑)
    - 파트 별 코드 리뷰 진행 (플립 이용)
- Notion
    
    ![Untitled_3](/uploads/0fe83e17d6b1d57600b6e0e29e276c41/Untitled_3.png)
    

# 🌳 최적화

- 정적 코드 분석 Sonarqube를 이용한 코드 리팩토링

### BEFORE

![workbook-before](/uploads/df9441f54dad7db8c47e0191276264a9/workbook-before.png)

### AFTER

![study-after](/uploads/1fe36100d7bd9a4c69c4f785aec63625/study-after.png)

![Image_Pasted_at_2023-5-18_13-43](/uploads/8a2c9608eaebe693df13532d26fbf09e/Image_Pasted_at_2023-5-18_13-43.png)

# 🌳 팀 소개

![team](/uploads/ab62c44b6540a56fa59d6f20754039ad/team.png)

# 🌳 서비스 화면

### 대시보드

- 학생 대시보드
    
    ![대시보드_학생](/uploads/aeb21d28beb5d79877e2aee189fa116b/대시보드_학생.gif)
    
- 선생님 대시보드
    
    ![대시보드_선생님](/uploads/27204426bb73d1df4174c3093a6b1150/대시보드_선생님.gif)
    

### 클래스

- 선생님 클래스
    
    ![클래스_선생님_클래스전환](/uploads/9ed09195a1eea6cf5723bf182fec7169/클래스_선생님_클래스전환.gif)
    
- 클래스 생성 및 학생 초대
    
    ![클래스_선생님_클래스추가](/uploads/7b15a3acbf8a82124f5def8341b78ec6/클래스_선생님_클래스추가.gif)
    
- 학생 클래스
    
    ![클래스_학생](/uploads/ec56a833b13e3776523cfb159114137d/클래스_학생.gif)
    

### 탐색

- 탐색 페이지
    
    ![탐색](/uploads/5a6316f5b2a8bb31076ef27089b8ddc8/탐색.gif)
    

### 에디터

- 문제집 전환 및 추가
    
    ![에디터_문제집전환](/uploads/9b7d72f4a7b5b5bc635515160a74b5b0/에디터_문제집전환.gif)
    
- 객관식 생성
    
    ![에디터_객관식_추가_2_](/uploads/4417192ce09c5bb2a95b561b68f33654/에디터_객관식_추가_2_.gif)
    
- OX 선택 생성
    
    ![에디터_OX_추가](/uploads/efd84c3f6b9250ed01c41023fc5dd024/에디터_OX_추가.gif)
    
- 단답식 생성
    
    ![에디터_단답식_추가](/uploads/bc630a9bb1dfece617004f6f730eb35d/에디터_단답식_추가.gif)
    
- 서술형 생성
    
    ![에디터_서술형_추가](/uploads/febe893e453e8aea7bed187695bd09f8/에디터_서술형_추가.gif)
    
- 이미지 삽입
    
    ![에디터_이미지추가](/uploads/fca8ab15ef17df6f7e962369b07086df/에디터_이미지추가.gif)
    
- 지문 삽입
    
    ![에디터_지문_추가](/uploads/8304ea3960d50d1817dd199a0359d877/에디터_지문_추가.gif)
    

### 문제

- 문제 순서 수정, 삭제
    
    ![문제집상세_문항수정](/uploads/0e29ecc6aab1653e0b6352f58c73bee4/문제집상세_문항수정.gif)
    
- PDF 다운로드
    
    ![문제집상세_PDF다운](/uploads/f668623d474d6b97dfbf46b1afc49c31/문제집상세_PDF다운.gif)
    
- 문제집 출제
    
    ![문제집상세_출제](/uploads/a3b2e6d90b475c02a5e7faf8d79093ae/문제집상세_출제.gif)
    
- 문제집 배포
    
    ![문제집상세_배포](/uploads/0cea4c417d354939d81066aa596431d9/문제집상세_배포.gif)
    
- 문제집 사본 생성
    
    ![문제집상세_사본](/uploads/2df8f652d3cddcb935d97c7171de8f76/문제집상세_사본.gif)
    

### 분석

- 학생 문제 풀이 및 결과 확인
    
    ![문제풀이](/uploads/7b075536400d41a749989a036c124b6e/문제풀이.gif)
    
- 선생님 시험 종료 및 결과 확인
    
    ![클래스_선생님_결과](/uploads/81fb5b9a7ff361a2b2763be79af921f1/클래스_선생님_결과.gif)
