## 목차

<!-- toc -->

- [0. 프로젝트 소개](#0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%86%8C%EA%B0%9C)
- [1. 프로젝트 구현 동기](#1-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%ED%98%84-%EB%8F%99%EA%B8%B0)
- [2. 기술 스택](#2-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
- [3. 핵심 기능 구현 과정](#3-%ED%95%B5%EC%8B%AC-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84-%EA%B3%BC%EC%A0%95)
  - [3-1 상자에 효율적으로 물건을 포장하는 방법](#3-1-%EC%83%81%EC%9E%90%EC%97%90-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9C%BC%EB%A1%9C-%EB%AC%BC%EA%B1%B4%EC%9D%84-%ED%8F%AC%EC%9E%A5%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
  - [3-2 프로젝트에 적합한 알고리즘 선정](#3-2-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EC%A0%81%ED%95%A9%ED%95%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%84%A0%EC%A0%95)
  - [3-3 회전 타입 정의](#3-3-%ED%9A%8C%EC%A0%84-%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98)
  - [3-4 상자 크기 추천 알고리즘 구현](#3-4-%EC%83%81%EC%9E%90-%ED%81%AC%EA%B8%B0-%EC%B6%94%EC%B2%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84)
- [4. 개선 사항](#4-%EA%B0%9C%EC%84%A0-%EC%82%AC%ED%95%AD)
  - [4-1 내 아이템이 어디에 배치되었는지 알 수 있게 하기](#4-1-%EB%82%B4-%EC%95%84%EC%9D%B4%ED%85%9C%EC%9D%B4-%EC%96%B4%EB%94%94%EC%97%90-%EB%B0%B0%EC%B9%98%EB%90%98%EC%97%88%EB%8A%94%EC%A7%80-%EC%95%8C-%EC%88%98-%EC%9E%88%EA%B2%8C-%ED%95%98%EA%B8%B0)
  - [4-2 여러 상자에 물건 포장하기](#4-2-%EC%97%AC%EB%9F%AC-%EC%83%81%EC%9E%90%EC%97%90-%EB%AC%BC%EA%B1%B4-%ED%8F%AC%EC%9E%A5%ED%95%98%EA%B8%B0)
  - [4-3 서버 부하 테스트](#4-3-%EC%84%9C%EB%B2%84-%EB%B6%80%ED%95%98-%ED%85%8C%EC%8A%A4%ED%8A%B8)

<!-- tocstop -->

## 0. 프로젝트 소개

<div align="center">
  <img src="https://postfiles.pstatic.net/MjAyNDEwMDlfNjAg/MDAxNzI4NDc5NjEwOTgx.tEDha54I9_NueQAEzZGVyLQ_z5LSrQUuUq0ZiFcXGIwg.OGHa1P3i9DcBmfSkk5lY0aSK8BIh7oiAPd6PqcFV8Oog.PNG/logo.png?type=w966"/>

빈공간은 물건을 포장할 때 포장 상자의 크기와 최적의 배치 방법을 제안하는 상자 포장 시뮬레이터 입니다.

</div>

> 사용자가 포장해야 할 물건들을 선택하면 **상자 크기를 추천**해주고 최대한 **빈공간 없이 효율적으로 배치**되는 모습을 보여줍니다. 이를 통해 사용자는 실제로 물건을 포장할 때 최적의 배치 방법을 알 수 있습니다.

## 1. 프로젝트 구현 동기

## 2. 기술 스택

사용한 기술 스택은 다음과 같습니다.

- React
- Zustand
- Three.js
- fastAPI

## 3. 핵심 기능 구현 과정

> 이 프로젝트의 핵심 기능은 물건들을 **빈공간 없이 효율적으로 포장**하고 **포장 상자의 크기를 추천하는 것**입니다.

### 3-1 상자에 효율적으로 물건을 포장하는 방법

물건을 빈 공간 없이 효율적으로 포장하는 문제는 3D Bin Packing Problem (3D BPP)으로 불리며, 최적의 결과값을 찾는 것이 매우 복잡한 **NP-hard 문제**로 정의됩니다. 이 문제를 해결하기 위해 **3D bin packing 알고리즘**을 사용했습니다.

**3D bin packing 알고리즘**은 크기, 모양, 무게가 다른 물체를 제한된 수의 3차원 컨테이너(빈)에 포장할 때, 공간 활용을 극대화하고 빈 공간을 최소화하기 위한 최적화 알고리즘입니다. 앞서 설명드린것 처럼 3D BPP는 NP-hard 문제 이기 때문에 주로 물체들을 부피에 따라 정렬하고 하나씩 배치해보는 **휴리스틱 기법**을 통해 구현됩니다.

### 3-2 프로젝트에 적합한 알고리즘 선정

이 프로젝트는 다음과 같은 기준을 바탕으로 알고리즘을 선정하였습니다:

- **무게 가중치**: 무거운 물건을 바닥에 배치하는 것이 중요하기 때문에, 알고리즘이 물건의 무게를 고려할 수 있어야 합니다.
- **물건 회전**: 물건을 효율적으로 배치하기 위해 회전 가능 여부도 필수 조건입니다.

|             | jerry800416      | luisgarciar         | Online-3D-BPP-PCT    | skjolber           | 3d-bin-packing |
| ----------- | ---------------- | ------------------- | -------------------- | ------------------ | -------------- |
| 회전        | O                | X                   | O                    | X                  | X              |
| 무게 가중치 | O                | X                   | X                    | O                  | X              |
| 사용 언어   | 파이썬           | 파이썬              | 파이썬               | 자바               | 자바스크립트   |
| 비고        | 실린더 형태 가능 | OpenAI Gym API 사용 | 물건크기 입력 불가능 | three.js 예제 구현 | npm 라이브러리 |

이 기준을 바탕으로 몇 가지 알고리즘을 검토한 결과, **jerry800416** 알고리즘을 선택했습니다. jerry800416 알고리즘은 물건의 무게 가중치를 고려할 수 있을 뿐만 아니라, 물건의 **회전이 가능**하고, **실린더 형태의 물건도 처리**할 수 있습니다.

비교한 다른 알고리즘들은 각각의 장단점이 있었지만, 회전 기능이 없거나 무게 가중치를 고려하지 않는 등의 이유로 이 프로젝트의 요구사항을 충족하지 못했습니다.

### 3-3 회전 타입 적용하기

**jerry800416** 알고리즘은 OPTIMIZING THREE-DIMENSIONAL BIN PACKING THROUGH SIMULATION(2006) 논문을 토대로 구현되어 있습니다. 이 알고리즘을 사용하면 다음과 같은 데이터를 얻을 수 있습니다.

- 물건들의 포지션 [x축, y축, z축]
- 물건들의 회전 타입 (0~5)

물건을 정확하게 배치하기 위해 회전 타입에 대한 정의를 명확히 할 필요가 있었고, 해당 정의는 논문의 Fig.1에 명시되어 있었습니다.

<div align="center">
  <img src="https://postfiles.pstatic.net/MjAyNDEwMDlfMjU3/MDAxNzI4NDc5NjEwOTc4.5zy8wA3sh-hU6QytDw0E0IM_sRWhSCHL8bcifukeO4gg.vexFN_EtGZa8V7K8mxXhhkVHAvLmpQFh1g7G4JfGVQMg.PNG/%ED%9A%8C%EC%A0%84%ED%83%80%EC%9E%85_%EC%A0%95%EC%9D%98.png?type=w966" width="300rem"/>

_출처: OPTIMIZING THREE-DIMENSIONAL BIN PACKING THROUGH SIMULATION(2006)_

</div>

각 타입에 대한 설명은 다음과 같습니다.
|타입|회전|
|--|--|
|타입0|회전하지 않음|
|타입1|z축으로 90도 회전|
|타입2|y축으로 90도 회전|
|타입3|x축으로 90도 회전 후 y축으로 90도 회전|
|타입4|x축으로 90도 회전|
|타입5|x축으로 90도 회전 후 z축으로 90도 회전|

여기서 중요한점은 **물건을 회전시키면 포지션이 달라지기 때문에 포지션을 재조정**해야 한다는 것입니다.

예를들어 타입 1의 경우 z축으로 90도 회전하면 물건의 포지션이 변경되므로 x축 좌표에 물건의 높이(h)만큼 더해줘야 물건이 원점에 정확히 위치하게 됩니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/7a54d492-deba-45c3-8fef-a9dc2b913d6a" width="500rem"/>

_z축으로 90도 회전 시키고_

</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/ec8d61e3-3cfb-43e8-8f86-63a2bac189d3" width="500rem"/>

_x축 좌표에 물건의 높이(h)만큼 더합니다._

</div>

<br>
이처럼 각 회전 타입에 따라 물건의 포지션과 로테이션 값을 재조정하는 표를 작성하여 물건들을 정확하게 배치하였습니다.

| 회전 타입 | 포지션(x, y, z) | 로테이션(x, y, z) |
| --------- | --------------- | ----------------- |
| 0         | [0, 0, 0]       | [0, 0, 0]         |
| 1         | [h, 0, 0]       | [0, 0, 90]        |
| 2         | [0, d, w]       | [90, 0, -90]      |
| 3         | [0, 0, w]       | [0, 90, 0]        |
| 4         | [0, 0, 0]       | [0, 90, 90]       |
| 5         | [0, d, 0]       | [90, 0, 0]        |

### 3-4 상자 크기 추천 알고리즘 구현

상자 크기추천을 위해 **우체국 상자**의 크기를 참고하였습니다.

우체국 상자는 1호부터 6호까지 다양한 크기가 존재하며 크기 정보를 얻기 쉽기고, 물건을 포장할때 사람들이 가장 많이 사용하는 상자이기 때문에 프로젝트에 적합하다고 판단하였습니다.

## 4. 개선 사항

### 4-1 내 아이템이 어디에 배치되었는지 알 수 있게 하기

사용자가 시뮬레이터 결과를 보고 실제로 물건들을 포장하기 위해선 등록한 물건이 어디에 배치되었는지 알아야 합니다.

그러나 구현된 프로젝트에선 **내 아이템**이 **어디에 배치**되었는지 알 수 없었습니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/3fcf3a3b-0d17-48bb-975c-b657a80e0f4c" width="500rem"/>

_내 아이템이 어디에 배치되어 있는지 알 수 없다._

</div>

문제점을 개선하기 위해 **내 아이템을 누르면 3D 모델의 색이 변경** 되도록 하였는데요.

이 과정에서 한번 변경된 모델의 색이 다시 돌아오지 않는것을 방지하기 위해 모델을 불러올 때 기존 material을 userData에 저장시키고, 사용자가 클릭한 아이템과 모델의 index가 일치하면 material을 변경, 그렇지 않으면 기존 material을 불러오게 하여 구현하였습니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/54d9a7bc-488a-4afe-ac42-6382edfcbc3b" width="500rem"/>

_내 아이템을 클릭하면 3D모델의 색이 변경됩니다._

</div>

### 4-2 여러 상자에 물건 포장하기

프로젝트를 배포하고 가장 많이 받은 피드백은 **여러 상자에 물건을 포장할 수 없나요?** 였습니다.

기존의 상자 크기 추천 알고리즘은 물건들이 우체국 6호 상자에도 포장되지 않으면 **포장되지 않았습니다.** 라는 메세지를 반환하게 되어있습니다.

사용자 입장에서 포장해야 할 물건들을 열심히 담았는데 결과가 **포장되지 않았다** 는것은 UX관점에서 치명적인 문제였고, 이를 개선하기 위해 기존의 상자 크기 추천 알고리즘을 아래와 같이 변경하였습니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/0fa00e76-93f6-4876-a454-e1c04305e850" width="600rem"/>

</div>

알고리즘 변경 후 여러 상자에 물건을 포장할 수 있게 수정되었습니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/5ba1b292-1b36-479d-99b1-060f60b6fd62" width="500rem"/>

_여러 상자에 모든 물건들을 포장할 수 있게 되었습니다._

</div>

### 4-3 서버 부하 테스트
